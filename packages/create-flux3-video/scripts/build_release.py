#!/usr/bin/env python3
"""Build a deterministic, allowlisted release ZIP with one root directory."""

from __future__ import annotations

import argparse
import hashlib
import shutil
import stat
import zipfile
from pathlib import Path

ALLOWED_TOP_LEVEL_FILES = {
    "SKILL.md", "README.md", "README_TH.md", "VERSION", "CHANGELOG.md",
    "ATTRIBUTION.md", "LICENSE", "LICENSE-DOCS",
}
ALLOWED_TOP_LEVEL_DIRS = {"agents", "references", "scripts", "tests", ".github"}
EXCLUDED_PARTS = {"__pycache__", ".pytest_cache", ".git", "dist"}
EXCLUDED_SUFFIXES = {".pyc", ".pyo", ".mp4", ".mov", ".webm", ".bin", ".log"}
ZIP_TIME = (2026, 9, 28, 0, 0, 0)


def collect(source: Path) -> list[Path]:
    unexpected = [child.name for child in source.iterdir() if child.name not in ALLOWED_TOP_LEVEL_FILES | ALLOWED_TOP_LEVEL_DIRS and child.name not in EXCLUDED_PARTS]
    if unexpected:
        raise SystemExit("unexpected top-level package entries: " + ", ".join(sorted(unexpected)))
    files = []
    for path in source.rglob("*"):
        relative = path.relative_to(source)
        if not path.is_file() or any(part in EXCLUDED_PARTS for part in relative.parts):
            continue
        if path.suffix.lower() in EXCLUDED_SUFFIXES:
            raise SystemExit(f"forbidden release file: {relative}")
        files.append(path)
    return sorted(files, key=lambda path: path.relative_to(source).as_posix())


def build(source: Path, output: Path) -> str:
    files = collect(source)
    output.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output, "w", compression=zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
        for path in files:
            relative = path.relative_to(source).as_posix()
            info = zipfile.ZipInfo(f"create-flux3-video/{relative}", ZIP_TIME)
            info.compress_type = zipfile.ZIP_DEFLATED
            mode = 0o755 if relative.startswith("scripts/") and path.suffix in {".py", ".ps1"} else 0o644
            info.external_attr = (stat.S_IFREG | mode) << 16
            archive.writestr(info, path.read_bytes())
    digest = hashlib.sha256(output.read_bytes()).hexdigest()
    output.with_suffix(output.suffix + ".sha256").write_text(f"{digest}  {output.name}\n", encoding="utf-8")
    return digest


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=Path("."))
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--public-copy", type=Path)
    args = parser.parse_args()
    source = args.source.resolve()
    output = args.output.resolve()
    digest = build(source, output)
    if args.public_copy:
        public_copy = args.public_copy.resolve()
        public_copy.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(output, public_copy)
        shutil.copy2(output.with_suffix(output.suffix + ".sha256"), public_copy.with_suffix(public_copy.suffix + ".sha256"))
    print(f"{digest}  {output}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
