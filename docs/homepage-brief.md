# FOMOLOGY Course-Ready Homepage Brief

## Purpose

The homepage is a story-first path for a Creator who has an idea but no clear way to turn it into a video. It builds belief through possibility and proof, then gives the Creator a usable Free Course as the primary next step. Production inquiries stay secondary.

## Page order

1. **Hero** — `MADE WITH FOMOLOGY` and `เริ่มจากไอเดีย แล้วให้ AI ต่อยอด`.
2. **Possibility** — three supplied Showcase Clips as large editorial chapters.
3. **Proof** — three supplied TikTok analytics screenshots, preserved as raw evidence.
4. **Creator Path bridge** — a compact transition from raw Proof to the Course action. It summarizes the accepted six-stage journey without replaying every earlier section at full length.
5. **Free Course** — the emotional peak and primary CTA to `/course`.
6. **Lab Preview** — a non-interactive future path for a new project: New Idea → Draft → Final → optional 4K Enhance.
7. **Read / Explore More** — a short, curated entry to Blog and Products near the end of the story, never a second visual peak or an automatic latest-post feed.
8. **Production Contact** — a secondary Messenger route.

## Course

- The public `/course` route is ungated and requires no account.
- The course has three short stages designed for one sitting.
- The main Course title is Thai-first: `ทำวิดีโอแรกให้พร้อมโพสต์`. `AI VIDEO FIRST WIN` becomes a small label, not the display headline.
- Each complete lesson must have a Cloudinary video, written summary, and checklist.
- Completion state is stored locally under `fomology-course-progress-v1`.
- Until real material is supplied, show one honest, restrained pending state instead of repeating three technical `CONTENT_PENDING` panels. Do not imply that unfinished lessons can be completed.
- `npm run validate:launch` must pass before deployment. It fails on pending content or any missing video, summary, or checklist.
- First Win means a post-ready 15–30 second video within 15 minutes, not a Lab Draft.

## Media behavior

- Showcase uses the three supplied Cloudinary clips and muted 8-second previews.
- Each chapter opens the full source video in an accessible dialog.
- A poster remains visible until a real moving frame is available, preventing empty media fields on slow connections.
- Results use `3.jpg`, `1.jpg`, and `2.jpg` without cropping or redesigned metric cards.
- Keep the two generated editorial artworks as decoration in Hero and Lab. Do not draw the Hero labels or Creator Trace line across the artwork, and never let decoration replace the real Showcase or Proof media.

## External destinations

- Messenger: `https://m.me/61592333219846`
- Facebook: `https://www.facebook.com/profile.php?id=61592333219846`
- TikTok: `https://www.tiktok.com/@anantapadchiya`

## Technical boundary

- Next.js App Router, TypeScript, Tailwind, static export.
- Cloudinary for supplied media.
- No login, database, API, payment, Supabase, Workers, Queues, or R2.
- Lab remains a preview and has no interactive route.
- Do not deploy until the owner supplies all course content and explicitly asks to deploy.

## Metadata

- Title: `FOMOLOGY — เริ่มจากไอเดีย แล้วให้ AI ต่อยอด`
- Description: `ดูวิดีโอและผลลัพธ์จากโพสต์จริง แล้วลองทำวิดีโอแรกของคุณด้วย AI`
- No canonical or assumed production domain until a domain is confirmed.

## Design artifact

The accepted six-stage journey is documented at `docs/landing-creator-journey.html`. The production page translates this model into responsive semantic HTML rather than embedding the artifact.
