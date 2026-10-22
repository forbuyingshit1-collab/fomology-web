# FLUX 3 and Codex skill package: official documentation check

- Checked: 2026-09-28 (Asia/Bangkok)
- Scope: FLUX 3 Video API behavior and the Codex skill-package conventions relevant to the Phase 14 local release candidate
- Source policy: Black Forest Labs and OpenAI first-party documentation only
- Network activity: documentation reads only; no BFL generation request or other paid API call was made

## Executive findings

The current BFL contract is an asynchronous `POST https://api.bfl.ai/v1/flux-3-video` API authenticated with the `x-key` header. It supports `t2v`, `i2v`, `v2v`, and `draft_enhance`. A successful submission returns an `id` and a `polling_url`; clients must poll that returned URL rather than construct a result URL. A ready video is exposed as `result.sample`, and a draft also exposes a downloadable `draft_cache` bundle.

The course's primary path is inside the verified contract: `mode: t2v`, `aspect_ratio: 9:16`, `duration: 8` to `10`, `resolution: hd`, `draft: true`, and `generate_audio: true`. Draft requests must use `hd`.

There are two material documentation inconsistencies to handle conservatively:

1. The FLUX 3 API reference includes `9:21`, but the narrative Video guide and its dimension table omit it. Because the explicit API enum is the request contract and the Phase 14 requirement names `9:21`, local validation should accept `9:21`, while documentation should not invent pixel dimensions for it.
2. The overview's mode-specific table limits `v2v` output to 5–15 seconds, while a generic Video parameter table says 5–20 seconds for `duration`. Local validation should use the narrower 5–15-second limit for `v2v` until BFL reconciles the pages.

For Codex, a standalone skill is a directory whose required entry point is `SKILL.md` with YAML frontmatter containing `name` and `description`, followed by non-empty instructions. `agents/openai.yaml` is optional UI/invocation/dependency metadata. `packages/create-flux3-video/` is a suitable release-candidate artifact location but is not a documented Codex auto-discovery location. Real local invocation testing requires installing or linking the skill into a documented `.agents/skills` location. A `plugin.json` is not required unless this artifact is deliberately converted into a plugin.

## Verified: FLUX 3 request contract

### Endpoint, authentication, and asynchronous flow

- Submit to `POST https://api.bfl.ai/v1/flux-3-video` with `Content-Type: application/json` and the API key in the `x-key` header. The submit response contains at least `id` and `polling_url`; it can also contain cost/megapixel fields. [BFL FLUX 3 API reference](https://docs.bfl.ai/api-reference/utility/generate-a-video-with-flux-3)
- The global endpoint is `api.bfl.ai`; `api.eu.bfl.ai` and `api.us.bfl.ai` are documented regional alternatives. For all of these, BFL explicitly requires polling the URL returned by the submit response. Do not synthesize `/v1/get_result?id=...` or assume a polling host. [BFL integration guide](https://docs.bfl.ai/api_integration/integration_guidelines)
- Polling requests in BFL's FLUX 3 quickstart include the same `x-key` header. A `Ready` result exposes `result.sample`, described as a signed MP4 URL. [BFL FLUX 3 Video guide](https://docs.bfl.ai/flux_3/flux3_video)
- FLUX 3 result URLs are signed and expire about two hours after completion, so the MP4 and draft cache should be downloaded promptly. [BFL FLUX 3 overview](https://docs.bfl.ai/flux_3/flux3_overview)

### Modes and mode-specific media

| Mode | Required starting material | Verified constraints |
| --- | --- | --- |
| `t2v` | `prompt` | Text-to-video; no source media field. |
| `i2v` | `prompt` and `keyframes` | One image pins the opening frame; two can pin start/end; timestamp-image pairs can pin exact times; up to ten images can form a storyboard. URL and base64 forms are documented. |
| `v2v` | `prompt` and `start_video` | Continues from the source clip's final frames. BFL's launch documentation says source video/audio can be up to four seconds. Output length is documented as 5–15 seconds in the overview's mode table. |
| `draft_enhance` | Prior draft's `draft_cache` bundle | Reproduces the selected draft at full quality rather than reinterpreting it as a new generation. |

Sources: [BFL FLUX 3 overview](https://docs.bfl.ai/flux_3/flux3_overview), [BFL FLUX 3 Video guide](https://docs.bfl.ai/flux_3/flux3_video), and [BFL FLUX 3 launch post](https://bfl.ai/blog/flux-3-video).

The API reference also documents spelled-out aliases (`text-to-video`, `image-continuation`, `video-continuation`, and `draft-enhance`). The short mode keys are the least ambiguous values for the local helpers. [BFL FLUX 3 API reference](https://docs.bfl.ai/api-reference/utility/generate-a-video-with-flux-3)

### Shared generation fields

| Field | Current verified contract |
| --- | --- |
| `prompt` | Free-form video prompt. Required for generation modes. See the draft-enhance ambiguity below. |
| `aspect_ratio` | `auto`, `21:9`, `2:1`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`, and `9:21` in the API reference enum. Default: `auto`. |
| `duration` | Whole seconds, normally 5–20, or `auto` (default). Use 5–15 for `v2v` because the mode-specific overview is narrower. |
| `resolution` | `hd` (default), `fhd`, `qhd`, or `uhd`. The latter three finish the same generation with BFL's video upsampler. |
| `generate_audio` | Boolean, default `true`; produces synchronized audio with the video. |
| `safety_tolerance` | Integer 0–4, default 2; 0 is strictest. BFL notes additional hard caps for some harm categories. |
| `draft` | Boolean, default `false`. When true, produces a fast HD preview and a downloadable draft cache. |
| `version` | Only `latest` is currently listed; it tracks the current release. |
| `user` | Optional opaque caller-supplied identifier, 1–256 characters when present. It is not needed for the local helper. |

Source: [BFL FLUX 3 API reference](https://docs.bfl.ai/api-reference/utility/generate-a-video-with-flux-3).

### Draft and enhancement rules

- `draft: true` is a property of a fresh `t2v`, `i2v`, or `v2v` generation. It returns a preview plus a `draft_cache` download URL in the ready result. [BFL FLUX 3 overview](https://docs.bfl.ai/flux_3/flux3_overview)
- Drafts always render at `hd`. BFL says a request combining `draft: true` with another resolution is rejected. [BFL FLUX 3 Video guide](https://docs.bfl.ai/flux_3/flux3_video)
- `mode: draft_enhance` takes the downloaded draft bundle encoded back into the `draft_cache` field. It accepts `hd`, `fhd`, `qhd`, or `uhd` and defaults to `fhd`; the delivery resolution is chosen during enhancement, not during preview generation. [BFL FLUX 3 overview](https://docs.bfl.ai/flux_3/flux3_overview) and [BFL FLUX 3 Video guide](https://docs.bfl.ai/flux_3/flux3_video)
- Enhancing a cache is the continuity-preserving path. Submitting the original prompt as a new full render is a new generation and may choose a different shot. [BFL FLUX 3 overview](https://docs.bfl.ai/flux_3/flux3_overview)
- A helper should download both `result.sample` and `result.draft_cache` when the latter exists. Saving the full polling response as a result JSON file is a useful local-package behavior, but it is an RC design decision rather than an API requirement.

### Output resolution classes

BFL documents exact dimensions for seven aspect ratios. The important semantic point is that `fhd`, `qhd`, and `uhd` are upsampled deliveries of the same generation, and dimensions are multiples of 32. For example, `16:9` is `1280×704` (`hd`), `1920×1088` (`fhd`), `2560×1440` (`qhd`), and `3840×2176` (`uhd`), rather than every class landing on a conventional broadcast dimension. [BFL FLUX 3 Video guide](https://docs.bfl.ai/flux_3/flux3_video)

Do not hard-code a pixel-dimension claim for `9:21`: the current API enum accepts it, but the dimension table has no `9:21` row.

## Verified: polling, failure, and retry behavior

The general result endpoint documents these statuses:

- in progress: `Pending`, `Reasoning`, `Generating`
- successful terminal: `Ready`
- failure terminal: `Task not found`, `Request Moderated`, `Content Moderated`, `Error`

For moderation statuses, `result` is `null`; `details["Moderation Reasons"]` can contain the categories that triggered the filter. A client must stop rather than keep polling or auto-resubmit. [BFL Get Result reference](https://docs.bfl.ai/api-reference/utility/get-result) and [BFL Errors](https://docs.bfl.ai/api_integration/errors)

BFL's documented HTTP handling is:

- `402 Payment Required`: insufficient credits or payment issue. Stop and ask the user to add credits; do not retry or auto-resubmit.
- `422 Unprocessable Entity`: invalid body or parameters. Fix locally; do not retry unchanged input.
- `429 Too Many Requests`: rate limit exceeded. BFL recommends exponential backoff.
- `500`/`503`: server failure or temporary unavailability.

Sources: [BFL Errors](https://docs.bfl.ai/api_integration/errors) and [BFL integration guide](https://docs.bfl.ai/api_integration/integration_guidelines).

The BFL integration example uses a finite retry count and exponential waits, so bounded backoff is consistent with the official guidance. It never endorses automatic paid-generation resubmission after an ambiguous submit result. For a credit-bearing local helper, the safe policy is: retry polling reads when appropriate, but never repeat the submit POST automatically.

## Verified: Codex local skill structure

- A standalone skill is a directory with required `SKILL.md`; `scripts/`, `references/`, `assets/`, and `agents/openai.yaml` are optional. `SKILL.md` must contain YAML frontmatter with `name` and `description`, then Markdown instructions. [OpenAI Build skills](https://learn.chatgpt.com/docs/build-skills)
- Skill discovery uses progressive disclosure: Codex first sees the name, description, and path, then loads the full instructions when the skill is selected. The description should therefore say both what the skill does and when to invoke it. [OpenAI Build skills](https://learn.chatgpt.com/docs/build-skills)
- Documented Codex discovery paths are `.agents/skills` from the current working directory upward to the repository root, `$HOME/.agents/skills`, `/etc/codex/skills`, and OpenAI-bundled system skills. Codex follows symlinked skill directories. An arbitrary `packages/create-flux3-video/` directory is not documented as auto-discovered. [OpenAI Build skills](https://learn.chatgpt.com/docs/build-skills)
- `agents/openai.yaml` is optional. It can contain `interface` metadata (`display_name`, `short_description`, optional icons, `brand_color`, `default_prompt`), `policy.allow_implicit_invocation`, and MCP tool dependencies. Implicit invocation defaults to true; setting it false preserves explicit `$skill-name` invocation. [OpenAI Build skills](https://learn.chatgpt.com/docs/build-skills)
- For packaged/plugin validation, if `agents/openai.yaml` is present, OpenAI requires valid UTF-8 YAML with an `interface` mapping and non-empty `display_name` and `short_description`. Optional icon paths must be safe relative paths, and `brand_color` must be a six-digit hex value. These are plugin-submission validation rules, not proof that every field is required for a standalone local skill. [OpenAI plugin submission errors](https://developers.openai.com/plugins/deploy/submission-errors)
- OpenAI recommends focused skills, instructions before scripts unless deterministic behavior or external tooling is needed, explicit inputs/outputs, and trigger tests including explicit, implicit, contextual, and negative-control prompts. [OpenAI Build skills](https://learn.chatgpt.com/docs/build-skills) and [Testing Agent Skills Systematically with Evals](https://developers.openai.com/blog/eval-skills)

### RC packaging implication

The Phase 14 files `README.md`, `README_TH.md`, `VERSION`, `CHANGELOG.md`, licenses, attribution, tests, checksum, workflow, and helper scripts are product/release requirements from this repository. They are not claimed as OpenAI's minimum standalone-skill schema.

Keep `packages/create-flux3-video/` as the immutable local release-candidate source/artifact. For an invocation test without modifying the global source skill, copy or symlink the RC into a temporary/repository `.agents/skills/create-flux3-video` location, or test its deterministic scripts directly. Do not claim that Codex discovers it in `packages/` by itself.

A root `plugin.json` is required only if the artifact is intentionally packaged as an installable plugin. The current Phase 14 requirement describes a versioned local skill package, so adding plugin metadata would change distribution scope and is not necessary for this RC. [OpenAI Package your plugin](https://developers.openai.com/plugins/build/plugins)

## Uncertain, inconsistent, or not established

| Topic | Current evidence | Conservative implementation decision |
| --- | --- | --- |
| `9:21` dimensions | API reference enum includes `9:21`; narrative guide, overview list, and dimension table omit it. | Accept the value; do not publish invented dimensions. Add a fixture that checks acceptance, not output size. |
| `v2v` duration | Mode overview says 5–15 seconds; generic Video table says 5–20. | Validate `v2v` at 5–15 until BFL reconciles docs. `t2v`/`i2v` remain 5–20. |
| `draft_enhance` prompt | Generic Video table says `prompt` is always required, but BFL's specific enhancement example submits only `mode` and `draft_cache`, and the mode promises exact reproduction without reinterpretation. | Do not require a prompt for `draft_enhance`. Treat `draft_cache` as required; allow resolution selection. |
| `Retry-After` on 429 | BFL says exponential backoff but does not state in the checked pages that 429 includes a `Retry-After` header. | Honor a valid `Retry-After` header if present, otherwise use bounded exponential backoff. Document this as defensive HTTP behavior, not a verified BFL guarantee. |
| Result URL lifetime outside FLUX 3 | General image integration guidance says image URLs expire after 10 minutes; the FLUX 3 overview says video result URLs expire about two hours. | Use the FLUX 3-specific two-hour statement for video, and download immediately in all cases. |
| Result JSON file | BFL returns JSON while polling but does not require clients to persist it. | Save it locally because Phase 14 requires it; do not imply BFL mandates persistence. |
| Package semantic version/checksum/release files | OpenAI standalone-skill docs do not prescribe them. | Keep them as ADR/project release policy and validate them locally. |
| API-upload compatibility | OpenAI's Responses API has separate uploaded-skill limits (one `SKILL.md`, single top-level ZIP folder, 50 MB ZIP, 500 files, 25 MB per uncompressed file). | Do not claim API-upload compatibility unless the RC is checked against that distinct distribution mechanism. [OpenAI Skills API guide](https://developers.openai.com/api/docs/guides/tools-skills) |

## Implementation checklist derived from verified facts

- Validate mode-specific fields and ranges before reading a key or making a network request.
- Require `prompt` for `t2v`, `i2v`, and `v2v`; require `keyframes` for `i2v`; require `start_video` for `v2v`; require `draft_cache` for `draft_enhance`.
- Permit `9:21`; permit all four resolution classes; reject `draft: true` unless resolution is `hd`.
- Use 5–20 seconds for `t2v`/`i2v`, 5–15 for `v2v`, and whole seconds only; the course default 8–10 seconds is valid.
- Default audio on, but allow an explicit silent render.
- Show prompt/settings and obtain affirmative user confirmation immediately before the paid submit POST.
- Put the key only in the `x-key` request header; never in URLs, payload dumps, command arguments, or persisted logs.
- Poll only the returned `polling_url` and stop on all terminal statuses.
- Download `result.sample` promptly, download `result.draft_cache` when present, and optionally persist the final result JSON beside them.
- On 402 or moderation, stop. On 429, honor a valid `Retry-After` when present or use bounded exponential backoff; never auto-resubmit the generation POST.
- Test all behavior with fixtures/mocks/dry-run paths so automated tests spend no BFL credits.
- Validate `SKILL.md` frontmatter/body and `agents/openai.yaml`; explain that the RC must be installed or linked into `.agents/skills` for Codex discovery.

## Primary sources

### Black Forest Labs

- [FLUX 3 overview](https://docs.bfl.ai/flux_3/flux3_overview)
- [FLUX 3 Video guide](https://docs.bfl.ai/flux_3/flux3_video)
- [FLUX 3 API reference](https://docs.bfl.ai/api-reference/utility/generate-a-video-with-flux-3)
- [Get Result API reference](https://docs.bfl.ai/api-reference/utility/get-result)
- [API integration guide](https://docs.bfl.ai/api_integration/integration_guidelines)
- [Errors](https://docs.bfl.ai/api_integration/errors)
- [FLUX 3 Video launch post](https://bfl.ai/blog/flux-3-video)

### OpenAI

- [Build skills](https://learn.chatgpt.com/docs/build-skills)
- [Skills API guide](https://developers.openai.com/api/docs/guides/tools-skills)
- [Skills in plugins](https://developers.openai.com/plugins/concepts/skills)
- [Package your plugin](https://developers.openai.com/plugins/build/plugins)
- [Plugin submission errors](https://developers.openai.com/plugins/deploy/submission-errors)
- [Testing Agent Skills Systematically with Evals](https://developers.openai.com/blog/eval-skills)
