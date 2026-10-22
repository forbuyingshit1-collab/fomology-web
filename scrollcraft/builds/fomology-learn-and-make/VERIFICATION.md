# Verification: FOMOLOGY Learn & Make

Completed locally on Windows on 2026-10-21.

## Result

The course-led homepage and shared learning navigation are implemented. The existing free course and article routes remain available. Hiring links point to https://fastwork.com/user/anan, including the retained service routes.

## Checks

- TypeScript: `npm run typecheck` passed.
- ESLint on all changed TSX components and routes: passed.
- `npm run test:course`: passed, three modules, ten complete lessons, five cases, original skill version.
- `npm run check:links`: passed, 26 external URLs parsed and five course case videos present.
- `npm run build`: final production static export passed, 22 pages.
- Exported-homepage smoke check: ten unique internal destinations exist, referenced anchors resolve, and three rendered Fastwork links point to the exact supplied URL.
- REA browser scenarios ran against the exported `out/` files served at http://localhost:3000, not only the development renderer.
- Desktop 1440x1000: opening, practice switching, alternate work selection, loaded video with native controls, course route, and blog route inspected. No page errors recorded.
- Mobile 390x844: opening, menu, Escape close, practice selection, syllabus expansion, and entering the course tested. No page errors recorded.
- Reduced motion: mobile opening remains static and complete; work selector, course disclosure, and course navigation work.
- Keyboard: arrow-key selection changes the active practice and associated learning link; Escape closes the native video dialog.
- Video metadata loaded and a 28-second StoryUp clip rendered with controls. Playback and audio remain user initiated.

## Corrections from visual QA

1. Legacy mobile CSS hid the brand wordmark. Restored it explicitly and rechecked the narrow header.
2. The old body overflow container prevented the sticky header from following scroll. Switched horizontal overflow containment to `clip`; the header stays visible at the course and showcase anchors.
3. A new work title could appear briefly above the previous decoded image. Keyed the main poster by work identity; the rechecked Automation view shows its actual system preview.
4. The course preflight inherited white text after its background became white. Restated its foreground and supporting text colors, rebuilt, and checked the actual reading section.
5. Raised supporting course and explorer type sizes after the initial screenshot pass.

## Design assessment

Grammar: custom learning gallery. It supports a separate invitation, available-course conversion, and direct object selection; the eight built-in grammars each impose a constraint that conflicts with this brief. See BRIEF.md.

Fingerprint: 6/6 differing dimensions against both existing rows. The original media and FOMOLOGY identity intentionally remain shared.

Signature: choosing a practice changes the original-work selection and relevant learning destination together. AI Video links to the available course; other practices link to substantive existing writing, without inventing unavailable courses.

Intended curve: curiosity -> agency -> confidence -> familiarity -> resolve. The final screenshots preserve the calm opening, give the work explorer the greatest interactive depth, make the one available course specific, and end with a clear learning/hiring choice. QA corrected navigation, image identity, readability, and contrast; it did not add scroll length or cinematic effects.

New generated media: none. Existing original posters, video clips, and local illustrations were reused.

## Environment and limits

The existing node_modules came from Linux and lacked Windows command shims and native CSS packages. Installed the existing lockfile's platform-appropriate dependencies; package versions remain unchanged and the original lockfile was restored byte-for-byte. A cached Turbopack transform still reported the old missing native module. Archived that development cache inside the workspace, then verified the ordinary `npm run dev -- --port 3001` with HTTP 200 and stopped the temporary development server. The configured webpack production build passed. The user preview on port 3000 serves the actual static build and has no development overlay.

The in-app browser control bridge was unavailable. The connected REA skill's owned Chrome scenarios supplied the browser verification; their sessions were cleaned up by REA. Scrollcraft's video-generation preflight lacked ffmpeg and a KIE key; neither is used by this simple original-asset design.

This is a local design preview. Public deployment, payment checkout, new paid course offers, and changes to the Fastwork profile are outside the completed design implementation. Existing course generation prerequisites and paid BFL credits remain as documented.

## Evidence

Full REA evidence: `output/redesign-2026-10-21/evidence.json`. Selected PNGs were extracted from that evidence and SHA-256 verified. Files: `desktop.png`, `showcase.png`, `showcase-websites.png`, `mobile.png`, `mobile-showcase.png`, `video-dialog.png`, `destinations.png`, and `course-reading.png`.

Previous page/layout/header/footer and other edited baseline files are preserved under `output/before-course-redesign-2026-10-21/`.
