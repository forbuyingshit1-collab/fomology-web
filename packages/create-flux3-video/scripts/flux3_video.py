#!/usr/bin/env python3
"""Validate, dry-run, submit once, poll, and download a FLUX.3 result safely."""

from __future__ import annotations

import argparse
import base64
import getpass
import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path
from typing import Any, Callable

ENDPOINT = "https://api.bfl.ai/v1/flux-3-video"
MODES = {"t2v", "i2v", "v2v", "draft_enhance"}
RATIOS = {"auto", "21:9", "2:1", "16:9", "4:3", "1:1", "3:4", "9:16", "9:21"}
RESOLUTIONS = {"hd", "fhd", "qhd", "uhd"}
IN_PROGRESS = {"Pending", "Reasoning", "Generating"}
TERMINAL = {"Ready", "Task not found", "Request Moderated", "Content Moderated", "Error"}
GENERATION_FIELDS = {
    "mode", "prompt", "aspect_ratio", "duration", "resolution", "version",
    "generate_audio", "safety_tolerance", "draft", "user",
}


def fail(message: str) -> None:
    raise ValueError(message)


def _is_int(value: Any) -> bool:
    return isinstance(value, int) and not isinstance(value, bool)


def validate(payload: dict[str, Any]) -> None:
    mode = payload.get("mode")
    if mode not in MODES:
        fail("mode must be t2v, i2v, v2v, or draft_enhance")

    if mode == "draft_enhance":
        allowed = {"mode", "draft_cache", "resolution", "safety_tolerance"}
        if not payload.get("draft_cache"):
            fail("draft_enhance requires draft_cache")
    else:
        allowed = set(GENERATION_FIELDS)
        prompt = payload.get("prompt")
        if not isinstance(prompt, str) or not prompt.strip():
            fail(f"{mode} requires a non-empty prompt")
        if mode == "i2v":
            allowed.add("keyframes")
            validate_keyframes(payload.get("keyframes"), payload.get("duration", "auto"))
        elif mode == "v2v":
            allowed.add("start_video")
            if not payload.get("start_video"):
                fail("v2v requires start_video")

    unknown = sorted(set(payload) - allowed)
    if unknown:
        fail("fields not allowed for this mode: " + ", ".join(unknown))

    resolution = payload.get("resolution", "fhd" if mode == "draft_enhance" else "hd")
    if resolution not in RESOLUTIONS:
        fail("resolution must be hd, fhd, qhd, or uhd")
    if mode != "draft_enhance" and payload.get("draft", False) is True and resolution != "hd":
        fail("draft requests must use resolution hd")

    safety = payload.get("safety_tolerance", 2)
    if not _is_int(safety) or not 0 <= safety <= 4:
        fail("safety_tolerance must be an integer from 0 to 4")

    if mode != "draft_enhance":
        ratio = payload.get("aspect_ratio", "auto")
        if ratio not in RATIOS:
            fail(f"invalid aspect_ratio: {ratio}")
        duration = payload.get("duration", "auto")
        if mode == "v2v":
            if not _is_int(duration) or not 5 <= duration <= 15:
                fail("v2v duration must be a whole number from 5 to 15")
        elif duration != "auto" and (not _is_int(duration) or not 5 <= duration <= 20):
            fail("duration must be auto or a whole number from 5 to 20")
        if "version" in payload and payload["version"] != "latest":
            fail("version must be latest")
        if "generate_audio" in payload and not isinstance(payload["generate_audio"], bool):
            fail("generate_audio must be true or false")
        if "draft" in payload and not isinstance(payload["draft"], bool):
            fail("draft must be true or false")
        if "user" in payload and (not isinstance(payload["user"], str) or not 1 <= len(payload["user"]) <= 256):
            fail("user must be a string from 1 to 256 characters")


def validate_keyframes(value: Any, duration: Any) -> None:
    if not isinstance(value, list) or not 1 <= len(value) <= 10:
        fail("i2v keyframes must contain one to ten images or [seconds, image] pairs")
    timed_flags = [isinstance(frame, list) for frame in value]
    if any(timed_flags) and not all(timed_flags):
        fail("keyframes cannot mix timed pairs and untimed images")
    if all(timed_flags):
        previous = -1.0
        for frame in value:
            if len(frame) != 2 or isinstance(frame[0], bool) or not isinstance(frame[0], (int, float)) or not isinstance(frame[1], str) or not frame[1]:
                fail("timed keyframes must be [seconds, image] pairs")
            timestamp = float(frame[0])
            if timestamp < 0 or timestamp <= previous:
                fail("keyframe timestamps must be non-negative and strictly increasing")
            if isinstance(duration, int) and timestamp > duration:
                fail("keyframe timestamp cannot exceed duration")
            previous = timestamp
    else:
        if not all(isinstance(frame, str) and frame for frame in value):
            fail("untimed keyframes must be non-empty image strings")
        if len(value) >= 3 and duration == "auto":
            fail("three or more untimed keyframes require an explicit duration")


def encode_media(value: Any, base_dir: Path) -> Any:
    if isinstance(value, list):
        return [encode_media(item, base_dir) for item in value]
    if not isinstance(value, str) or value.startswith(("https://", "http://")):
        return value
    candidate = Path(value)
    if not candidate.is_absolute():
        candidate = base_dir / candidate
    if candidate.is_file():
        return base64.b64encode(candidate.read_bytes()).decode("ascii")
    return value


def prepare_media(payload: dict[str, Any], base_dir: Path) -> dict[str, Any]:
    prepared = dict(payload)
    for field in ("keyframes", "start_video", "draft_cache"):
        if field in prepared:
            prepared[field] = encode_media(prepared[field], base_dir)
    return prepared


def printable_payload(payload: dict[str, Any], prepared: dict[str, Any]) -> dict[str, Any]:
    printable = dict(payload)
    for field in ("keyframes", "start_video", "draft_cache"):
        if field in payload and prepared[field] != payload[field]:
            printable[field] = "<local media encoded as base64 at submission>"
    return printable


def display_summary(payload: dict[str, Any]) -> None:
    print("\nFLUX.3 request summary")
    print("-" * 24)
    if payload.get("mode") != "draft_enhance":
        print("Prompt:\n" + payload["prompt"])
    else:
        print("Prompt: (preserved by draft cache; no new prompt)")
    print("Settings:")
    for key in ("mode", "duration", "aspect_ratio", "resolution", "generate_audio", "draft", "safety_tolerance"):
        if key in payload or key in {"mode", "resolution"}:
            default = "fhd" if key == "resolution" and payload.get("mode") == "draft_enhance" else None
            print(f"  {key}: {payload.get(key, default)}")


def parse_retry_after(headers: Any) -> float | None:
    raw = headers.get("Retry-After") if headers else None
    if raw is None:
        return None
    try:
        value = float(raw)
        return value if 0 <= value <= 60 else None
    except (TypeError, ValueError):
        return None


def request_json(url: str, *, api_key: str, payload: dict[str, Any] | None = None,
                 retry_reads: bool = False, max_attempts: int = 5,
                 sleeper: Callable[[float], None] = time.sleep) -> dict[str, Any]:
    body = json.dumps(payload).encode("utf-8") if payload is not None else None
    headers = {"Accept": "application/json", "x-key": api_key}
    if body is not None:
        headers["Content-Type"] = "application/json"
    attempts = max_attempts if retry_reads and body is None else 1

    for attempt in range(attempts):
        request = urllib.request.Request(url, data=body, headers=headers, method="POST" if body is not None else "GET")
        try:
            with urllib.request.urlopen(request, timeout=120) as response:
                decoded = json.loads(response.read().decode("utf-8"))
                if not isinstance(decoded, dict):
                    raise RuntimeError("BFL returned a non-object JSON response")
                return decoded
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            if exc.code == 402:
                raise RuntimeError("เครดิต BFL ไม่เพียงพอ (HTTP 402) — หยุดและเติมเครดิต; จะไม่ส่งซ้ำอัตโนมัติ") from exc
            if exc.code == 429 and attempt + 1 < attempts:
                delay = parse_retry_after(exc.headers) or min(2 ** attempt, 30)
                sleeper(delay)
                continue
            if exc.code == 429:
                raise RuntimeError("BFL จำกัดอัตราคำขอ (HTTP 429) — หยุด; จะไม่ส่ง Paid POST ซ้ำอัตโนมัติ") from exc
            raise RuntimeError(f"BFL API HTTP {exc.code}: {detail}") from exc
        except urllib.error.URLError as exc:
            raise RuntimeError(f"Network error: {exc.reason}; จะไม่ส่ง Paid POST ซ้ำอัตโนมัติ") from exc
    raise RuntimeError("request failed after bounded retries")


def nested_value(value: Any, path: tuple[str, ...]) -> Any:
    current = value
    for part in path:
        if not isinstance(current, dict):
            return None
        current = current.get(part)
    return current


def find_urls(value: Any, key_path: str = "") -> list[tuple[str, str]]:
    found: list[tuple[str, str]] = []
    if isinstance(value, dict):
        for key, child in value.items():
            found.extend(find_urls(child, f"{key_path}.{key}" if key_path else key))
    elif isinstance(value, list):
        for index, child in enumerate(value):
            found.extend(find_urls(child, f"{key_path}[{index}]"))
    elif isinstance(value, str) and value.startswith(("https://", "http://")):
        found.append((key_path, value))
    return found


def choose_download_url(result: dict[str, Any], cache: bool = False) -> str | None:
    exact = nested_value(result, ("result", "draft_cache" if cache else "sample"))
    if isinstance(exact, str) and exact.startswith(("https://", "http://")):
        return exact
    urls = find_urls(result)
    if cache:
        matches = [(path, url) for path, url in urls if "draft_cache" in path.lower() or url.lower().split("?", 1)[0].endswith(".bin")]
    else:
        matches = [(path, url) for path, url in urls if url.lower().split("?", 1)[0].endswith((".mp4", ".mov", ".webm"))]
    return matches[0][1] if matches else None


def download(url: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with urllib.request.urlopen(url, timeout=180) as response, destination.open("wb") as output:
        while True:
            chunk = response.read(1024 * 1024)
            if not chunk:
                break
            output.write(chunk)


def save_json(value: dict[str, Any], destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def parse_args(argv: list[str] | None = None) -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("payload", type=Path, help="JSON request body")
    parser.add_argument("--dry-run", action="store_true", help="validate and display without key/network")
    parser.add_argument("--wait", action="store_true", help="poll the returned polling_url")
    parser.add_argument("--poll-seconds", type=float, default=5.0)
    parser.add_argument("--max-polls", type=int, default=180)
    parser.add_argument("--output", type=Path, help="download generated video after Ready")
    parser.add_argument("--draft-cache-output", type=Path, help="download returned draft cache")
    parser.add_argument("--save-result", type=Path, help="save final API response JSON")
    return parser.parse_args(argv)


def main(argv: list[str] | None = None, *, input_fn: Callable[[str], str] = input,
         getpass_fn: Callable[[str], str] = getpass.getpass) -> int:
    args = parse_args(argv)
    source = args.payload.resolve()
    payload = json.loads(source.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        fail("payload root must be a JSON object")
    validate(payload)
    prepared = prepare_media(payload, source.parent)
    display_summary(payload)

    if args.dry_run:
        print("\nDRY RUN — no API key read; no network request made")
        print(json.dumps(printable_payload(payload, prepared), ensure_ascii=False, indent=2))
        return 0

    approval = input_fn("\nSubmit this paid generation? [y/N] ").strip().lower()
    if approval not in {"y", "yes"}:
        print("Cancelled — no network request made.")
        return 0

    api_key = os.environ.get("BFL_API_KEY") or getpass_fn("BFL API key (masked, session only): ")
    if not api_key:
        fail("BFL_API_KEY is missing; no request was sent")

    result = request_json(ENDPOINT, api_key=api_key, payload=prepared, retry_reads=False)
    polling_url = result.get("polling_url")
    print(f"Submitted once. id={result.get('id', 'unknown')}")

    if args.wait:
        if not isinstance(polling_url, str) or not polling_url.startswith("https://"):
            fail("submission response did not include a valid polling_url")
        for _ in range(args.max_polls):
            time.sleep(max(args.poll_seconds, 0.5))
            result = request_json(polling_url, api_key=api_key, retry_reads=True)
            status = result.get("status", "Unknown")
            print(f"status={status}", file=sys.stderr)
            if status in TERMINAL:
                break
            if status not in IN_PROGRESS:
                raise RuntimeError(f"unknown BFL status: {status}")
        else:
            raise RuntimeError("polling stopped after the configured maximum; no resubmission was made")

    if args.save_result:
        save_json(result, args.save_result)

    status = result.get("status")
    if status in {"Request Moderated", "Content Moderated"}:
        raise RuntimeError(f"{status} — หยุดและตรวจเหตุผล; จะไม่ส่งซ้ำอัตโนมัติ")
    if status in {"Error", "Task not found"}:
        raise RuntimeError(f"{status} — เก็บ Result JSON และหยุด; จะไม่ส่งซ้ำอัตโนมัติ")

    if args.output or args.draft_cache_output:
        if status != "Ready":
            fail(f"cannot download from non-Ready status: {status or 'Unknown'}")
        if args.output:
            video_url = choose_download_url(result)
            if not video_url:
                fail("Ready response contains no recognizable result.sample video URL")
            download(video_url, args.output)
        if args.draft_cache_output:
            cache_url = choose_download_url(result, cache=True)
            if not cache_url:
                fail("Ready response contains no draft_cache URL")
            download(cache_url, args.draft_cache_output)
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, ValueError, RuntimeError, json.JSONDecodeError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(2)
