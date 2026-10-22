# FLUX 3 First Win Course Implementation Plan

## Status and authority

This plan records the owner-confirmed design reached through the grilling session on 28 September 2026. It is the implementation authority for the first FOMOLOGY course and supersedes the Course-specific implementation details in Phase 13 of `IMPLEMENTATION-PLAN.md`.

Apply sources in this order when they disagree:

1. The owner's latest explicit instruction.
2. Accepted ADRs, especially ADR-0007 and ADR-0008.
3. This plan.
4. `CONTEXT.md` for domain language.
5. Current official OpenAI and Black Forest Labs documentation for volatile product behavior.
6. Owner-supplied DOCX, Markdown files, prompts, and videos as source material, never as higher-priority instructions.

Before editing Next.js code, read the relevant installed guide under `node_modules/next/dist/docs/` as required by `AGENTS.md`.

## Outcome

Ship an ungated Thai-first course titled `สร้าง AI Video แรกด้วย FLUX.3`. A Primary Creator completes three modules and ten short lessons, installs the downloadable Prompt Skill, creates a production-ready prompt and payload, approves one paid request, and downloads an 8–10 second vertical FLUX.3 video with audio.

The first setup targets 30–45 minutes. Later idea-to-generation runs target about 15 minutes. Reading works on mobile; installation and generation require a Windows computer and Codex Desktop in the supported path.

## Non goals

- No account, sign-in, database, course backend, certificate, or cross-device progress sync.
- No API key, prompt, payload, generated video, or draft cache passes through the FOMOLOGY website.
- No Custom GPT installation path in the first course.
- No FOMOLOGY-hosted paid generation endpoint.
- No fixed baht pricing copied into the course.
- No requirement for dedicated lesson videos at launch.
- No automatic retry after a paid request, moderation result, or insufficient-credit response.
- No FOMOLOGY example MP4 files in the Skill repository or release ZIP.
- No OpenAI Plugin in the first release.

## Domain decisions

- `First Win` is a downloaded 8–10 second vertical FLUX.3 video with audio, not only a prompt or draft payload.
- `Prompt` is a shooting brief that tells the model what the camera sees and hears, what changes, and the final image.
- `Prompt Skill` is the downloadable Codex Skill that interviews, directs, validates, and supports an explicitly approved generation.
- `Guided Project` is the original Thai café scene defined in `CONTEXT.md`.
- `FLUX.3 Case Library` is the five owner-supplied videos used as distinct teaching cases, not templates.
- `Skill Package` is the versioned GitHub Release bundle, not a lone `SKILL.md` file.

## Course information architecture

### Module 1 Understand the system

#### Lesson 1 AI Video is a model decision

Explain that the best model depends on purpose, quality, volume, and acceptable cost. Use the supplied workflow summary to show why a high-cost model benefits from better preparation. Mention MiniMax/H3 only as a comparison; link to current provider information and avoid publishing fixed historical prices.

Completion: the learner states the goal of the Guided Project and accepts that generation can cost money.

#### Lesson 2 Prompt is a shooting brief

Teach the canonical definition of Prompt and the chain `Idea → Brief → Prompt → Payload → Result`. Contrast a vague request with a filmable prompt. Introduce subject, physical action, environment, camera, lighting, audio, continuity, and final image.

Completion: the learner can identify the action and final image in the café scene.

#### Lesson 3 Prompt Skill is a system, not a template

Explain Prompt Skill, Reference, documentation, interview questions, validation, and why examples are patterns rather than default creative direction. Contrast a static prompt template with a Skill that asks for missing decisions.

Completion: the learner understands that the Skill will ask questions before producing the final prompt.

#### Lesson 4 Choose the FLUX 3 mode

Explain `t2v`, `i2v`, `v2v`, and `draft_enhance`, plus the distinction between continuation and video editing. The Guided Project uses `t2v`. Put keyframes, Draft Enhance, Video Edit, QHD, UHD, and `9:21` in an optional deeper section.

Completion: the learner selects `t2v` for an idea with no source media.

### Module 2 Prepare the tools

#### Lesson 5 Prepare Codex and BFL safely

List the supported setup: Windows 10/11, Codex Desktop, PowerShell 5.1 or later, a BFL account, credits, and an API key. Link to the official dashboard and pricing. State that the website never receives the key and that the user must not paste it into chat, prompts, payloads, URLs, or files.

Completion: the learner has the required accounts and understands the secret boundary.

#### Lesson 6 Download and install the Prompt Skill

Link to the FOMOLOGY resource page and the exact GitHub Release asset. Show how to verify the SHA-256 value, extract one folder level, place it under the current official Codex user-skill location, restart Codex only if detection fails, and invoke `$create-flux3-video`. Include a copyable starter prompt and a visible troubleshooting link.

Completion: Codex lists and invokes the Skill successfully.

### Module 3 Create the First Win

#### Lesson 7 Lock the direction

Introduce the Guided Project: a middle-aged Thai café owner opens wooden shutters and places one iced coffee in morning light; the camera slowly moves closer; birds and quiet street ambience are audible; there is no dialogue; the final image holds the drink in front and the owner behind it.

Use the Skill interview to lock viewer, platform, duration, aspect ratio, action, camera, environment, sound, and final image.

Completion: the learner has a complete Direction Lock.

#### Lesson 8 Build and audit the final prompt

Show the evolution from short idea to final English generation prompt while preserving any Thai dialogue in Thai when present. Teach one action per beat, motivated camera movement, concrete audio sources, targeted continuity locks, and a named final image. Show a short bad/better comparison before the complete prompt.

Completion: the Skill's quality gate passes and unresolved risks are visible.

#### Lesson 9 Dry run and generate

Generate a payload using `t2v`, `9:16`, 8–10 seconds, `hd`, audio enabled, and draft mode. Run validation and Dry Run first. Immediately before submission, display the prompt, settings, and credit-bearing action, then require `Submit this paid generation? [y/N]` with `N` as the default. Poll only the returned URL and download the MP4 and draft cache promptly.

Completion: the learner downloads the generated MP4 and, when returned, the draft cache.

#### Lesson 10 Review and learn

Evaluate action, identity, camera, continuity, audio, text artifacts, and final image. Teach one-change-at-a-time iteration and the stop conditions for errors, moderation, insufficient credits, and repeated drift. Introduce the Case Library and show how different prompts solve different directing problems.

Completion: the learner records one successful choice, one defect, and one change for the next attempt.

## Standard lesson anatomy

Every lesson contains these sections in this order:

1. `บทนี้คุณจะได้อะไร`
2. `เข้าใจใน 1 นาที`
3. `ทำตามทีละขั้น`
4. `ตัวอย่างไม่ดี / ดีขึ้นอย่างไร`
5. `ลองทำ`
6. `เช็กก่อนผ่าน`
7. `ลิงก์และอ่านเพิ่ม`

Keep the beginner path concise. Place API schema details, advanced resolutions, keyframes, camera vocabulary, and long prompts inside optional `อ่านเพิ่ม` disclosures. Code, commands, prompts, URLs, and payloads that a learner must reuse receive a Copy button.

## Page experience

### Course page

The `/course/` page contains:

1. Hero with title, first-time and repeat-time expectations, output, cost warning, and device requirement.
2. Preflight checklist for Windows, Codex, BFL account, API key, credits, and time.
3. Three-module progress summary and ten-lesson navigation.
4. Sticky desktop table of contents and a collapsible mobile table of contents.
5. Server-rendered lesson content with small client islands for progress, copy actions, and dialogs.
6. Three module milestones and a final First Win checklist.
7. FLUX.3 Case Library.
8. Skill Resource call to action, official sources, attribution, and last-reviewed dates.

Mobile users can read, watch examples, copy the current URL, and track local progress. A visible notice states that installation and generation require the supported desktop setup. Progress remains device-local and does not sync.

### Skill resource page

Create `/resources/create-flux3-video/` with:

- Current version and BFL verification date.
- Primary Download button for the exact GitHub Release ZIP.
- Latest Release and source repository links.
- SHA-256 verification instructions.
- Package contents.
- Quick Install for Windows.
- Invocation test.
- Safe API-key handling.
- Dry Run and paid-submit distinction.
- Full troubleshooting matrix.
- Changelog, licenses, attribution, and official references.

The website must not use the GitHub branch archive as the package download.

## Content storage and rendering

Use one source of truth per concern:

- `src/data/course.ts`: typed module and lesson manifest, status, ordering, estimated time, completion labels, and source-review dates.
- `src/content/course/*.md`: one Markdown file per lesson.
- `src/lib/course-content.ts`: build-time loading and validation.
- `src/lib/render-course-content.tsx`: course Markdown rendering for headings, lists, tables, external links, code fences, callouts, and deeper-reading disclosures.
- Client components: progress storage, lesson completion, Copy buttons, and media dialog only.

Do not keep the long lesson body in JSON. Replace `src/data/course-content.json` after the new manifest is authoritative. Reuse the existing build-time Markdown pattern from Blog, while adding the rendering features the course requires.

Store progress under a new versioned key so the old three-lesson state cannot mark new lessons complete. A migration is unnecessary because the previous content was never launch-ready.

## FLUX 3 Case Library

Use these canonical external videos:

1. `https://res.cloudinary.com/lx5v2ghk/video/upload/v1789977375/final_%E0%B8%9E%E0%B8%B4%E0%B8%86%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%B5%E0%B8%B1%E0%B8%AA%E0%B8%B2%E0%B8%99.mp4`
2. `https://res.cloudinary.com/lx5v2ghk/video/upload/v1789978451/create-a-20-second-thai-3145048883.mp4`
3. `https://res.cloudinary.com/lx5v2ghk/video/upload/v1789977714/%E0%B9%80%E0%B8%97%E0%B9%88.mp4`
4. `https://res.cloudinary.com/lx5v2ghk/video/upload/v1789979128/OP2.mp4`
5. `https://res.cloudinary.com/lx5v2ghk/video/upload/v1789979778/%E0%B8%AA%E0%B8%B8%E0%B8%A3%E0%B8%B2%E0%B8%A9%E0%B8%A9%E0%B8%A9%E0%B8%A9.mp4`

The fifth source excludes the accidental trailing quotation mark from the supplied text.

Use videos 2, 3, and 5 as the three expanded teaching cases. Present videos 1 and 4 as additional cases. Each item includes a poster, descriptive title, visual summary, verified dialogue summary when applicable, the directing problem it demonstrates, a reusable pattern, and the direct Cloudinary viewing link.

Load a poster first. Load or navigate to the full video only after a user action. Audio never starts automatically. Do not place the MP4 files in the website repository, Skill repository, or release ZIP.

## Skill repository and Release Package

Create a standalone public repository after the owner supplies or selects the GitHub owner. Recommended name: `create-flux3-video`.

Target structure:

```text
create-flux3-video/
├── SKILL.md
├── README.md
├── README_TH.md
├── VERSION
├── CHANGELOG.md
├── ATTRIBUTION.md
├── LICENSE
├── LICENSE-DOCS
├── agents/
│   └── openai.yaml
├── references/
│   ├── direction.md
│   ├── flux3-api.md
│   └── flux3-course-examples.md
├── scripts/
│   ├── flux3_video.ps1
│   └── flux3_video.py
├── tests/
│   ├── fixtures/
│   └── test_release_package.py
└── .github/
    └── workflows/
        └── release.yml
```

The Release workflow builds an allowlisted ZIP whose root contains exactly one `create-flux3-video/` directory, runs non-credit tests, calculates SHA-256, and attaches the ZIP and checksum to a version tag. The website links to the Release asset and release notes.

Scripts and original code use MIT. Documentation and prompt examples use CC BY 4.0. `ATTRIBUTION.md` preserves the Visual Skills and interview-pattern credits. Linked FOMOLOGY videos remain copyrighted external works and outside both repository licenses.

Creating the public repository, pushing code, or publishing a Release is an external write and requires an explicit implementation request. Do not infer that authority from this plan.

## Skill update requirements

Before release, update the current local Skill against official BFL documentation:

- Add current resolution classes `hd`, `fhd`, `qhd`, and `uhd` where supported.
- Add current aspect ratio `9:21`.
- Preserve `hd` for draft requests.
- Preserve modes `t2v`, `i2v`, `v2v`, and `draft_enhance`.
- Keep FLUX Video Edit separate from continuation.
- Reject unknown fields and incompatible mode fields.
- Do not add unsupported `seed` or `keyframe_times` fields.
- Poll the returned `polling_url` rather than constructing one.
- Stop on insufficient credits and moderation.
- Respect `Retry-After` and bounded backoff for throttling.
- Download result and draft-cache artifacts promptly.
- Require explicit approval immediately before every paid submission.

Keep the beginner course default at draft HD, 9:16, 8–10 seconds, and audio enabled. Advanced values remain available in the Skill and optional documentation.

## PowerShell helper requirements

The Windows helper must:

- Work on PowerShell 5.1 and later.
- Accept a payload path and support `-DryRun`, submit, wait, output, saved result, and draft-cache output.
- Prompt for `BFL_API_KEY` with masked input when the session variable is absent.
- Keep the key in process memory only and exclude it from commands, files, payloads, and logs.
- Validate mode-specific fields before network access.
- Display the exact prompt and settings before submission.
- Default the paid confirmation to No.
- Never auto-resubmit an error or moderated request.
- Return non-zero exit codes with plain Thai-facing recovery guidance where practical.

The Python helper remains the cross-platform path and must pass the same fixtures. Put shared schema fixtures in one place to reduce drift between implementations.

## Troubleshooting contract

The resource page and Thai README cover:

- Skill folder extracted at the wrong depth.
- Skill stored outside the current official Codex discovery path.
- Codex needs a restart after installation.
- PowerShell execution policy blocks the helper.
- Python path fallback is unavailable.
- API key is missing or rejected.
- Payload validation fails.
- `402` insufficient credits.
- `429` throttling and `Retry-After`.
- Input or result moderation.
- Polling error or task not found.
- Result URL expires before download.
- Draft cache is unavailable for later enhancement.
- Character, action, audio, or text drift in the result.
- The safe point to stop instead of spending another request.

Recovery steps must preserve the user's last good prompt, payload, result JSON, video, and draft cache.

## External links

Every external link opens in a new tab with `rel="noopener noreferrer"`. Use clear labels and identify the destination:

- OpenAI Skills: `https://learn.chatgpt.com/docs/build-skills`
- BFL Dashboard: `https://dashboard.bfl.ai/`
- BFL Pricing: `https://bfl.ai/pricing`
- FLUX.3 API: `https://docs.bfl.ai/api-reference/utility/generate-a-video-with-flux-3`
- Video prompting overview: `https://docs.bfl.ai/guides/prompting_video_overview`
- Text to Video: `https://docs.bfl.ai/guides/prompting_video_text_to_video`
- Image to Video: `https://docs.bfl.ai/guides/prompting_video_image_to_video`
- Audio: `https://docs.bfl.ai/guides/prompting_video_audio`
- Camera vocabulary: `https://docs.bfl.ai/guides/prompting_video_camera_terms`

Show `ตรวจล่าสุดเมื่อ` for volatile BFL and OpenAI instructions. Verify these links before every release and at least monthly while the course is public.

## Accessibility and privacy

- Preserve visible keyboard focus and logical heading order.
- Provide skip navigation, a labelled course table of contents, and anchor targets that remain visible below the header.
- Use native buttons for Copy, completion, reset, and dialogs.
- Announce Copy success and progress changes without moving focus.
- Keep tap targets at least 48 by 48 pixels.
- Respect reduced motion.
- Provide descriptive poster alt text and visible text summaries for every case.
- Verify spoken dialogue from the actual audio before publishing it as a transcript.
- Store only lesson identifiers in local storage.
- Do not add email capture, analytics events containing prompt content, or secret-handling fields.

## Implementation phases

### Phase 0 Reconcile sources

Inventory the supplied DOCX, five Markdown sources, five videos, current local Skill, official OpenAI documentation, and official BFL documentation. Record the verification dates and every current schema mismatch.

Complete when every course claim has one named source and volatile claims point to official documentation.

### Phase 1 Replace the course content model

Create the typed manifest and ten Markdown lesson files. Replace the three-placeholder JSON contract and update the launch validator to require ten complete lessons, working internal identifiers, required checklists, Skill version, BFL verification date, resource URL, and Case Library entries.

Complete when incomplete text, missing links, or missing release metadata makes `npm run validate:launch` fail for a precise reason.

### Phase 2 Build the course reading experience

Split the current monolithic client component into server-rendered content and focused client components. Implement desktop and mobile navigation, module progress, lesson completion, Copy actions, deeper-reading disclosures, reset, and device notices.

Complete when all ten lessons render in the static export with JavaScript disabled except for the explicitly interactive enhancements.

### Phase 3 Author and editorially review the course

Write the ten Thai lessons from the approved outline. Use the standard lesson anatomy, the Prompt mental model, the Guided Project, and beginner-first language. Add official links, warnings, exercises, and checks.

Complete when a first-time reader can follow the entire path without opening the advanced sections and every technical term is defined before use.

### Phase 4 Update and test the Skill

Update `SKILL.md`, API reference, validation, modes, ratios, resolutions, and safety language. Add the Thai README, course examples, version files, licenses, attribution, and cross-platform tests.

Complete when prompt-only, audit, all mode dry runs, invalid payload tests, secret-leak checks, and failure fixtures pass without network credit use.

### Phase 5 Build the Windows helper

Implement the PowerShell helper with parity fixtures against Python. Test on PowerShell 5.1 and the current PowerShell release. Verify masked key entry, No-by-default confirmation, polling, bounded backoff, error exits, result download, and draft-cache download.

Complete when a clean Windows setup can run the Guided Project Dry Run without Python.

### Phase 6 Prepare GitHub distribution

After explicit authorization, create or select the public repository, add the release workflow, tag the release candidate, build the allowlisted ZIP, publish checksums, and draft release notes. Do not publish the final Release until website links and QA are ready.

Complete when the release candidate asset installs correctly from a fresh download and contains no local paths, secrets, output media, caches, or development-only files.

### Phase 7 Build the resource page and Case Library

Create the resource route, download card, verification instructions, troubleshooting, version data, and five linked cases. Use poster-first media and existing dialog behavior where appropriate.

Complete when every link and media item works at mobile and desktop sizes without eager-loading full videos.

### Phase 8 Run automated and browser QA

Run typecheck, lint, build, launch validation, Skill tests, PowerShell tests, link checks, static-export checks, accessibility checks, keyboard checks, reduced-motion checks, and responsive visual QA at 320×568, 390×844, 768×1024, and 1440×900.

Complete when all automated checks exit zero, all required static routes exist, no secret appears in output, and no browser error or missing asset remains.

### Phase 9 Run the paid smoke test

Present the final release-candidate prompt, payload, settings, and reported cost. Obtain explicit approval immediately before one paid request. Generate the Guided Project once, poll, download the MP4 and draft cache, and verify the complete learner path. Do not retry automatically.

Complete when the artifact opens, audio is present when requested, result metadata is saved, and the Release Package used in the test is identical to the candidate being published.

### Phase 10 Publish only on request

Publish the GitHub Release and update the website to the immutable asset URL and checksum. Re-run the full checks, then deploy only after a separate explicit deployment instruction.

Complete when the production Course and Resource pages point to the published release, the download verifies, and the owner confirms the public flow.

## Required checks

```powershell
npm run typecheck
npm run lint
npm run build
npm run validate:launch
```

Add repository scripts for course link validation and Skill package verification. Automated tests must never submit a paid generation.

## Launch acceptance criteria

- Ten complete lessons render under three modules.
- The first-time and repeat-time expectations are visible and accurate.
- The Guided Project remains consistent across all lessons.
- The course defines Prompt, Skill, Reference, Payload, Draft, and Result before requiring them.
- The primary Windows path reaches a validated Dry Run without Python.
- The website never receives or stores an API key, prompt, payload, result, or draft cache.
- The paid action is No by default and requires explicit approval.
- The GitHub Release ZIP installs at one folder depth and matches its SHA-256.
- The current Skill accepts the official BFL schema used by the course.
- Five Case Library links work; three have expanded teaching analysis.
- Video dialogue summaries are verified against actual audio before being labelled transcripts.
- Mobile readers can navigate and understand the device handoff.
- Progress is local, versioned, resettable, and does not imply cross-device sync.
- External links are labelled, current, and safe.
- Accessibility, reduced motion, keyboard, responsive, and static-export checks pass.
- One explicitly approved paid smoke test completes without automatic retry.
- Deployment and public GitHub publication occur only after explicit user requests.

## Definition of done

The work is done when a Primary Creator on a clean supported Windows setup can discover the course, understand Prompt and Prompt Skill, download the exact public Release, install and invoke it, complete the Guided Project, inspect a Dry Run, explicitly approve one paid draft, download the resulting video, review it with the course checklist, and recover from documented failures without exposing an API key or requiring FOMOLOGY Lab.
