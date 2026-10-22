#!/usr/bin/env python3
"""Build the local FLUX.3 Skill RC into packages/dist and public/downloads."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / "packages" / "create-flux3-video"
VERSION = (PACKAGE / "VERSION").read_text(encoding="utf-8").strip()
NAME = f"create-flux3-video-v{VERSION}.zip"

raise SystemExit(subprocess.call([
    sys.executable,
    str(PACKAGE / "scripts" / "build_release.py"),
    "--source", str(PACKAGE),
    "--output", str(ROOT / "packages" / "dist" / NAME),
    "--public-copy", str(ROOT / "public" / "downloads" / NAME),
]))

