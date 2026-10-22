---
status: accepted
---

# Distribute a versioned local FLUX 3 Skill Package through GitHub Releases

FOMOLOGY will maintain the Prompt Skill in a standalone public GitHub repository and distribute curated, versioned ZIP assets through GitHub Releases, while the static FOMOLOGY website remains the learner-facing entry point. A PowerShell generation helper is the primary Windows path and the Python helper is the cross-platform path. Generation, polling, and artifact download run locally after explicit approval; the BFL API key is entered through a masked session prompt and is never collected, persisted, or transmitted by the FOMOLOGY website. This preserves a complete First Win without introducing a backend that would handle visitor secrets or paid generation requests.

## Consequences

The Course links to a dedicated Skill resource page, which links to the latest GitHub Release and its immutable versioned asset rather than a branch archive. Release assets include checksums, a changelog, attribution, and the BFL verification date. Scripts and original code use the MIT License; instructional documentation and prompt examples use CC BY 4.0; linked FOMOLOGY videos remain outside the repository licenses. The distributed Skill must be updated and tested against the current official BFL schema before release, while advanced resolutions and modes remain outside the beginner path. Plugin packaging is deferred until the Skill ZIP and Course pass launch QA.
