# create-flux3-video

Local Codex Skill for directing, auditing, validating, and explicitly approved FLUX.3 video generation. Version `0.1.0-rc.1` is a local release candidate checked against official BFL and OpenAI documentation on 2026-09-28.

## Install

Verify the release checksum, then extract the ZIP so the installed file is:

```text
%USERPROFILE%\.agents\skills\create-flux3-video\SKILL.md
```

Restart Codex only if discovery does not refresh. Invoke with `$create-flux3-video`.

## Safe defaults

- Prompt-only and Dry Run never need a key.
- The website never receives keys, prompts, payloads, results, or caches.
- Paid submission is No by default and never auto-resubmits.
- The Windows helper supports Windows PowerShell 5.1+ without Python.
- The Python helper is the cross-platform alternative.

See [README_TH.md](README_TH.md) for the complete Thai setup and recovery guide.

## Dry run

```powershell
.\scripts\flux3_video.ps1 -Payload .\tests\fixtures\valid_t2v.json -DryRun
```

```bash
python3 scripts/flux3_video.py tests/fixtures/valid_t2v.json --dry-run
```

No automated test submits a generation or spends credits.

