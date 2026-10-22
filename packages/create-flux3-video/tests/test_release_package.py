from __future__ import annotations

import hashlib
import re
import sys
import unittest
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VERSION = (ROOT / "VERSION").read_text(encoding="utf-8").strip()
if ROOT.parent.name == "packages":
    ZIP = ROOT.parents[1] / "public" / "downloads" / f"create-flux3-video-v{VERSION}.zip"
else:
    ZIP = ROOT / "dist" / f"create-flux3-video-v{VERSION}.zip"
CHECKSUM = ZIP.with_suffix(ZIP.suffix + ".sha256")

REQUIRED = {
    "SKILL.md", "README.md", "README_TH.md", "VERSION", "CHANGELOG.md",
    "ATTRIBUTION.md", "LICENSE", "LICENSE-DOCS", "agents/openai.yaml",
    "references/direction.md", "references/flux3-api.md",
    "references/flux3-course-examples.md", "scripts/flux3_video.ps1",
    "scripts/flux3_video.py", "tests/test_flux3_video.py",
    "tests/test_flux3_video.ps1", "tests/test_release_package.py",
    ".github/workflows/release.yml",
}


class SourcePackageTests(unittest.TestCase):
    def test_required_files_exist(self):
        missing = sorted(path for path in REQUIRED if not (ROOT / path).is_file())
        self.assertEqual(missing, [])

    def test_skill_frontmatter_and_openai_metadata(self):
        skill = (ROOT / "SKILL.md").read_text(encoding="utf-8")
        self.assertRegex(skill, r"(?s)^---\s+name: create-flux3-video\s+description: .+?\s+---\s+\S")
        metadata = (ROOT / "agents" / "openai.yaml").read_text(encoding="utf-8")
        self.assertIn("interface:", metadata)
        self.assertRegex(metadata, r"(?m)^\s+display_name:\s+.+$")
        self.assertRegex(metadata, r"(?m)^\s+short_description:\s+.+$")

    def test_no_media_secrets_or_development_outputs(self):
        banned_suffixes = {".mp4", ".mov", ".webm", ".bin", ".pyc", ".log"}
        forbidden_local_path = "/mnt/c/Users/" + "anant"
        files = [path for path in ROOT.rglob("*") if path.is_file() and "__pycache__" not in path.parts]
        self.assertFalse([str(path.relative_to(ROOT)) for path in files if path.suffix.lower() in banned_suffixes])
        for path in files:
            if path.suffix.lower() in {".md", ".py", ".ps1", ".json", ".yaml", ".yml", ""}:
                text = path.read_text(encoding="utf-8", errors="ignore")
                self.assertNotRegex(text, r"(?i)(?:x-key|BFL_API_KEY)\s*[:=]\s*['\"]?[A-Za-z0-9_-]{20,}", str(path))
                self.assertNotIn(forbidden_local_path, text, str(path))

    def test_version_is_semver_release_candidate(self):
        self.assertRegex(VERSION, r"^\d+\.\d+\.\d+-rc\.\d+$")


class BuiltArchiveTests(unittest.TestCase):
    @unittest.skipUnless(ZIP.exists(), "run build:skill to validate the archive")
    def test_archive_root_contents_and_checksum(self):
        digest = hashlib.sha256(ZIP.read_bytes()).hexdigest()
        self.assertTrue(CHECKSUM.is_file())
        self.assertEqual(CHECKSUM.read_text(encoding="utf-8").split()[0], digest)
        with zipfile.ZipFile(ZIP) as archive:
            names = archive.namelist()
            self.assertTrue(names)
            self.assertEqual({name.split("/", 1)[0] for name in names}, {"create-flux3-video"})
            archived = {name.removeprefix("create-flux3-video/") for name in names if not name.endswith("/")}
            self.assertTrue(REQUIRED.issubset(archived))
            self.assertFalse([name for name in names if name.lower().endswith((".mp4", ".mov", ".webm", ".bin", ".pyc", ".log"))])


if __name__ == "__main__":
    suite = unittest.defaultTestLoader.loadTestsFromModule(sys.modules[__name__])
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    raise SystemExit(0 if result.wasSuccessful() else 1)
