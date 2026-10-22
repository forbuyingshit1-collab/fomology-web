# ANAN Work & Blog Source Inventory

Status: source review for the proposed FOMOLOGY Products and Blog pages. On 2026-09-22 the owner confirmed that all listed work and writing are theirs and authorized use under the FOMOLOGY name. No source material has yet been copied into the website or published.

## Source locations

- Personal portfolio root: `C:\Users\anant\Downloads\Web ส่วนตัว` (WSL: `/mnt/c/Users/anant/Downloads/Web ส่วนตัว`). This is the **ANAN Personal Brand** project, not the current FOMOLOGY site.
- Full Word blog manuscripts: `C:\Users\anant\Downloads\my blog`, referenced by `Web ส่วนตัว/app/scripts/build_blog_posts.py`.
- Main work data: `app/src/data/work.ts`; supporting project evidence and visibility labels: `portfolio-knowledge-base/projects/project-index.md`, `portfolio-knowledge-base/source-register.md`, and `portfolio-knowledge-base/private-information-review.md`.
- Main local blog sources: `app/src/blog/*.mdx`, `app/blog-posts.json`, and `app/src/data/notes.ts`. The current personal site's Notes routes can also fetch Sanity content, so local fallback metadata is not always the full article body.

## Work already represented in the personal site

| Work | Source label | Safe initial reading for FOMOLOGY planning |
|---|---|---|
| Cloud Assistant | Production System | Personal AI-operations dashboard; source label and exact usage/ownership need confirmation before making a FOMOLOGY claim. |
| Tracking Sender Dashboard | Working Prototype | E-commerce operations and messaging workflow; related knowledge-base entry is marked **private-review**. Use only sanitized, approved facts or imagery. |
| AI Commerce Chatbot | Working Prototype | Interactive, sanitized commerce/chatbot and automation demo; do not imply every simulated integration is live or quote unverified impact. |
| AI News Curation | Working Prototype | Editorial workflow prototype; source says live-source integration remains future work. |
| SyncSocial | UI Concept | Mock social-publishing experience; analytics and publishing are simulated, not real performance results. |

The separate knowledge base also indexes a personal portfolio site, an OpenClaw guide, a thinly evidenced RWA concept, a Speednano Web3 landing-page build, and a Mintel airline-system analysis exercise. Speednano and Mintel need public-use/role review; RWA lacks enough evidence for a full case study. Baan Ruam Talay and AI Commerce Chatbot may refer to the same demo, not two distinct delivered projects.

The five current-site `public/media/work/*-cover.webp` files are abstract illustrations, not product screenshots. Sample `public/media/objects/*-object.jpg` mockups visibly contain fictional UI brands or metrics. They may decorate a project story if labeled as visualizations, but must not be used as evidence of a live interface or measured result.

## Blog material found

- **Two full MDX articles:** “Turning Knowledge into Action” (personal tech-learning story) and “Blockchain สำหรับคนทั่วไป” (blockchain explainer), in `app/src/blog/`.
- **Four full Word manuscripts:** “Clone Experts with NotebookLM”, “การใช้ Chat Bot แอดมินใน SME”, “ผมทำแอพ รายรับ-รายจ่าย ที่ทำมาแค่เพื่อผม”, and “The Strategic Navigator … ด้วย n8n”, in `Downloads/my blog/`. Together they contain 19 embedded media files; none have been extracted or copied.
- `app/blog-posts.json` holds excerpts and word counts for those same four Word manuscripts, **not** full bodies.
- `app/src/data/notes.ts` holds six fallback Notes entries: four overlap the Word manuscripts, plus a Cloud Assistant build note and an OpenClaw guide. The Cloud Assistant full body is not present in that local metadata file and will not be listed as a Blog article yet. The OpenClaw guide has its own page source and will be brought into FOMOLOGY **Blog as an article**, subject to instruction/link review.
- Topics span AI/automation, SME chatbot design, NotebookLM, personal tools, crypto analysis, blockchain, and a personal career story. Not all are automatically on-topic for FOMOLOGY's creator-first Blog.

## Publication cautions

- The owner has authorized changing the public ANAN label/byline to **FOMOLOGY** for this site. Preserve factual project history and maturity; brand renaming alone must not imply that a demo was a deployed client system.
- Keep maturity labels distinct: production system, working prototype, UI concept, guide, and exercise are not interchangeable. Do not present mock analytics or unverified savings, usage, costs, or impact as measured outcomes.
- The private-information review flags customer data, workflow exports, credentials, and some project/client names for review. Do not import `.env` files, raw n8n exports, client identifiers, or personal contact details.
- Several Word manuscripts contain time-sensitive tool/pricing claims or financial/crypto examples. Review facts and links before publication; preserve the owner's voice without silently turning opinion or illustrative data into verified claims.
- Blog dates in local registries are metadata and should be checked against the owner's intended publication dates before reuse.

## Decisions still needed

1. Products will show four service lines followed by a full work archive with maturity labels; detail pages are reserved for sufficiently evidenced items.
2. The old personal site remains unchanged during preview. Redirect and duplicate-content decisions wait until FOMOLOGY's public domain is ready.
3. Public-facing ANAN names/bylines become FOMOLOGY, while first-person text, historical URLs, quotations, and factual context stay intact.
4. Use only confirmed original article dates; leave undated manuscripts without a fabricated date.
5. Sanitize raw customer material, credentials, or third-party identifiers before using any private-review/needs-review assets; ownership of the work does not make those values safe to publish.
6. FOMOLOGY Blog will use local static article content, not depend on the personal site's Sanity source. Abstract covers are illustrations only, and mock-device art is not project evidence.
7. Existing full articles may be imported after review; metadata-only Notes are not publishable articles. Time-sensitive instructions, tool prices, and financial examples need fact-checking and owner review before substantive edits.
