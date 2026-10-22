from __future__ import annotations

import importlib.util
import io
import json
import os
import subprocess
import sys
import unittest
import urllib.error
from pathlib import Path
from unittest import mock

ROOT = Path(__file__).resolve().parents[1]
FIXTURES = ROOT / "tests" / "fixtures"
SCRIPT = ROOT / "scripts" / "flux3_video.py"
SPEC = importlib.util.spec_from_file_location("flux3_video", SCRIPT)
assert SPEC and SPEC.loader
flux3 = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(flux3)


def fixture(name: str) -> dict:
    return json.loads((FIXTURES / name).read_text(encoding="utf-8"))


class FakeResponse:
    def __init__(self, value: dict):
        self.value = value

    def __enter__(self):
        return self

    def __exit__(self, *_args):
        return False

    def read(self):
        return json.dumps(self.value).encode()


class ValidationTests(unittest.TestCase):
    def test_all_valid_modes(self):
        for name in ("valid_t2v.json", "valid_i2v.json", "valid_v2v.json", "valid_draft_enhance.json"):
            with self.subTest(name=name):
                flux3.validate(fixture(name))

    def test_invalid_fixtures(self):
        for name in ("invalid_draft_resolution.json", "invalid_unknown_field.json", "invalid_v2v_duration.json", "invalid_mode_field.json"):
            with self.subTest(name=name), self.assertRaises(ValueError):
                flux3.validate(fixture(name))

    def test_accepts_all_resolution_classes_when_not_draft(self):
        base = fixture("valid_t2v.json")
        base["draft"] = False
        for value in ("hd", "fhd", "qhd", "uhd"):
            with self.subTest(value=value):
                flux3.validate({**base, "resolution": value})

    def test_accepts_9_21_without_inventing_dimensions(self):
        payload = fixture("valid_t2v.json")
        payload["aspect_ratio"] = "9:21"
        flux3.validate(payload)

    def test_rejects_seed_and_keyframe_times(self):
        payload = fixture("valid_i2v.json")
        payload["seed"] = 4
        payload["keyframe_times"] = [0, 8]
        with self.assertRaisesRegex(ValueError, "keyframe_times, seed"):
            flux3.validate(payload)


class SafetyTests(unittest.TestCase):
    def test_dry_run_never_prints_or_reads_environment_key(self):
        sentinel = "BFL_SECRET_MUST_NOT_LEAK"
        env = {**os.environ, "BFL_API_KEY": sentinel}
        completed = subprocess.run(
            [sys.executable, str(SCRIPT), str(FIXTURES / "valid_t2v.json"), "--dry-run"],
            text=True, capture_output=True, env=env, check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stderr)
        self.assertIn("no API key read", completed.stdout)
        self.assertNotIn(sentinel, completed.stdout + completed.stderr)

    def test_default_no_cancels_before_key_or_network(self):
        with mock.patch.object(flux3, "request_json") as request:
            result = flux3.main(
                [str(FIXTURES / "valid_t2v.json")],
                input_fn=lambda _prompt: "",
                getpass_fn=lambda _prompt: self.fail("masked key prompt must not run after default No"),
            )
        self.assertEqual(result, 0)
        request.assert_not_called()

    def test_paid_post_is_never_retried_on_429(self):
        error = urllib.error.HTTPError(
            flux3.ENDPOINT, 429, "Too Many Requests", {"Retry-After": "1"}, io.BytesIO(b"rate limited")
        )
        with mock.patch("urllib.request.urlopen", side_effect=error) as urlopen:
            with self.assertRaisesRegex(RuntimeError, "429"):
                flux3.request_json(flux3.ENDPOINT, api_key="secret", payload=fixture("valid_t2v.json"), retry_reads=False)
        self.assertEqual(urlopen.call_count, 1)

    def test_poll_read_uses_retry_after_and_bounded_retry(self):
        error = urllib.error.HTTPError(
            "https://poll.example/id", 429, "Too Many Requests", {"Retry-After": "2"}, io.BytesIO(b"rate limited")
        )
        sleeps: list[float] = []
        with mock.patch("urllib.request.urlopen", side_effect=[error, FakeResponse({"status": "Ready"})]) as urlopen:
            result = flux3.request_json(
                "https://poll.example/id", api_key="secret", retry_reads=True, sleeper=sleeps.append
            )
        self.assertEqual(result["status"], "Ready")
        self.assertEqual(urlopen.call_count, 2)
        self.assertEqual(sleeps, [2.0])

    def test_official_result_urls_are_selected(self):
        result = fixture("mock_ready.json")
        self.assertEqual(flux3.choose_download_url(result), "https://example.com/result.mp4")
        self.assertEqual(flux3.choose_download_url(result, cache=True), "https://example.com/draft-cache.bin")


if __name__ == "__main__":
    unittest.main()

