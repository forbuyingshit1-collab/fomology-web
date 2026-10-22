# Work & Learn verification

Verified on 2026-10-21 against the final Next.js static export at `http://localhost:3000/?design=work-and-learn`. This is a local preview; no public deployment was requested or performed.

## Build and content checks

- `npm run typecheck` and ESLint for the changed TypeScript files passed.
- `npm run test:course` passed: 3 modules, 10 complete lessons, 5 cases.
- `npm run check:links` passed: 26 external URLs and 5 case videos checked by the existing validation script.
- `npm run build` passed and exported 22 static pages.
- Export smoke checks passed for 12 internal destinations/anchors, 6 Fastwork links, and all 3 featured poster files.

## Browser checks

The owned Chrome test session used the existing Playwright runtime. The final production report is `output/carousel-qa/production-results.json`; the reproducible test script is `output/carousel-qa/verify.mjs`.

| View | Verified behavior |
| --- | --- |
| Desktop, 1440 × 1000 | Carousel arrows and keyboard controls; exactly one mounted, muted preview; pause control; offscreen pause; full video and evidence dialogs; Escape and focus restoration |
| Desktop practice chapters | Scrolling selects Websites and Automation; manual selection remains usable; learning and commissioning destinations have equal card widths |
| Mobile, 390 × 844 | Actual CDP touch swipes change the hero and practice; menu closes with Escape; course entry works |
| Narrow, 320 × 800 | No horizontal overflow; readable headline; natural practice flow |
| Tablet, 1024 × 768 | No horizontal overflow; natural practice flow |
| Reduced motion, 1440 × 1000 | Preview stays paused on its poster; practice stage is static and does not require extended scroll |

No page errors were recorded. Desktop, narrow, mobile, swipe, chapter, proof, and equal-path screenshots were inspected. Final captures live under `output/carousel-qa/production-*.png`.

The bundled Next.js 16 upgrade guide's `data-scroll-behavior="smooth"` opt-in is applied to the root HTML element. A final rebuild and focused browser check confirmed that the course entry works and route navigation returns to the top while in-page links retain smooth scrolling.

Playback revision, 2026-10-22: production rebuild and targeted ESLint passed. Browser playback events recorded `currentTime: 0` with `so_0` source URLs for Fantasy, Chat Bot, RealSun, and Fantasy selected again, confirming that each center-card preview starts from the original beginning and remounts from zero on reselection.

## Source binding and framing

- The user confirmed that `final_พิฆาตอีสาน.mp4` is the work represented by [1.jpg](https://res.cloudinary.com/lx5v2ghk/image/upload/v1789979786/1.jpg). Its tooltip records 1,238,143 views at 1 day 6 hours. The headline is “ทะลุ 1.23 ล้านวิวใน 30 ชั่วโมง”; no platform or shorter time is asserted.
- [3.jpg](https://res.cloudinary.com/lx5v2ghk/image/upload/v1789979784/3.jpg) supports aggregate TikTok Studio post views of 3M over 7 days. It remains a separate record, not a single-clip result.
- [2.jpg](https://res.cloudinary.com/lx5v2ghk/image/upload/v1789979786/2.jpg) shows three pinned clips above one million views. Neither a time window nor an association with the three current featured cases is asserted.
- Chat Bot capacity is presented as the existing case-specific client report: the workload previously handled by 2–3 administrators. It is not a general service guarantee.
- Fantasy video is 1450 × 1080; Chat Bot is 1610 × 1080; RealSun is 1774 × 1180. The 16:9 display stage preserves their complete frame with `object-fit: contain`.
- Selected original poster times: Fantasy 24s, Chat Bot 12s, RealSun 12s. Per the user's 2026-10-22 revision, all muted 8-second center-card previews start at 0s of their original clip. Original full videos remain available in the player.
- No new clip or resized master is needed for this version. Posters and excerpts come from the user's existing Cloudinary originals.

## Final visual assessment

The hero uses a prominent central case and angled neighboring work, matching the supplied coverflow idea with actual project imagery. White space, black type, and FOMOLOGY red remain consistent. Learning and hiring receive equal prominence in the hero, path section, and close. Desktop scroll changes useful practice content; touch and reduced-motion layouts use natural page flow. Source disclosures make the strongest outcome inspectable.

Fingerprint gate: 6/6 differences against the first two registered builds; 5/6 against `fomology-learn-and-make`, retaining the floating-pill navigation family.
