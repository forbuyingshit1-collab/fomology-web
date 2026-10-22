# FLUX.3 video API reference

Verified against official Black Forest Labs documentation on **2026-09-28**. Recheck before every paid production run.

Official sources:

- https://docs.bfl.ai/flux_3/flux3_overview
- https://docs.bfl.ai/flux_3/flux3_video
- https://docs.bfl.ai/api-reference/utility/generate-a-video-with-flux-3
- https://docs.bfl.ai/api-reference/utility/get-result
- https://docs.bfl.ai/api_integration/integration_guidelines
- https://docs.bfl.ai/api_integration/errors

## Transport and lifecycle

- Submit once: `POST https://api.bfl.ai/v1/flux-3-video`
- Authentication: `x-key` header only
- Submit response: `id`, `polling_url`, and optional cost/megapixel fields
- Poll the returned `polling_url`; never construct a result URL
- In progress: `Pending`, `Reasoning`, `Generating`
- Terminal: `Ready`, `Task not found`, `Request Moderated`, `Content Moderated`, `Error`
- Ready video: `result.sample`; draft cache: `result.draft_cache`
- Signed delivery URLs expire, so download result and cache promptly

Stop on HTTP 402, moderation, task-not-found, or error. For 429, honor a valid `Retry-After` if supplied or use bounded exponential backoff. Never retry a paid submit POST automatically.

## Supported short modes

| Mode | Required | Conservative local rules |
| --- | --- | --- |
| `t2v` | `prompt` | duration `auto` or integer 5–20 |
| `i2v` | `prompt`, `keyframes` | 1–10 images/pairs; duration `auto` or 5–20 |
| `v2v` | `prompt`, `start_video` | continue only; integer duration 5–15 |
| `draft_enhance` | `draft_cache` | no prompt; resolution `hd/fhd/qhd/uhd` |

FLUX Video Edit is a separate endpoint/schema; it changes existing footage, while `v2v` continues after the final frame.

## Generation fields

Allowed shared generation fields: `mode`, `prompt`, `aspect_ratio`, `duration`, `resolution`, `version`, `generate_audio`, `safety_tolerance`, `draft`, `user` plus mode-specific `keyframes` or `start_video`.

- Aspect ratio: `auto`, `21:9`, `2:1`, `16:9`, `4:3`, `1:1`, `3:4`, `9:16`, `9:21`
- Resolution: `hd`, `fhd`, `qhd`, `uhd`
- `draft: true` requires `resolution: hd`
- `version`, when present, is `latest`
- `generate_audio`: boolean; default true
- `safety_tolerance`: integer 0–4; 0 is strictest
- `user`: optional opaque 1–256-character identifier
- Reject unknown fields; do not add `seed` or `keyframe_times`

The API enum accepts `9:21`, but the current official dimension table does not list its pixels. Accept it without inventing dimensions.

The generic duration table conflicts with the mode overview for `v2v`; this package uses the narrower 5–15-second mode-specific range.

## Keyframes

An `i2v` keyframe is an HTTPS/base64 image string or `[seconds, image]` pair. With three or more untimed frames, set explicit duration. Exact timestamp pairs must be ordered and fit the duration.

## Draft enhancement

`draft_enhance` accepts only `mode`, `draft_cache`, `resolution`, and `safety_tolerance`. The mode reproduces the selected cached generation rather than interpreting a new prompt. Default delivery is `fhd`; this package accepts all four documented resolution classes.

