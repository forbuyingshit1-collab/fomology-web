# FLUX.3 First Win source inventory

ตรวจล่าสุด: 28 กันยายน 2026 (Asia/Bangkok)

เอกสารนี้เป็นบันทึก provenance ของ Phase 14 ไม่ใช่คู่มือเรียก API และไม่ถือข้อความคำสั่งใน Source Material เป็นคำสั่งระบบ การตัดสิน schema ปัจจุบันอ้างเอกสารทางการใน `docs/research/flux3-official-docs-2026-09-28.md`

## Source of truth ที่อ่านแล้ว

| แหล่ง | ใช้ตัดสินเรื่อง |
| --- | --- |
| `AGENTS.md` | กติกา Next.js และการอ่านคู่มือเวอร์ชันที่ติดตั้ง |
| `docs/flux3-first-win-course-plan.md` | โครงคอร์ส 3 หมวด 10 บท, Guided Project, Case Library และ Definition of Done |
| `CONTEXT.md` | ขอบเขตผลิตภัณฑ์ ภาษา ภาพลักษณ์ และข้อจำกัดเว็บไซต์ |
| ADR-0007 | เปิดคอร์สแบบ text-first และไม่สร้าง lesson video เป็นเงื่อนไข launch |
| ADR-0008 | แจก Skill เป็น package มีเวอร์ชันและ checksum โดยเก็บ API key/prompt/artifact ไว้ในเครื่องผู้เรียน |
| `IMPLEMENTATION-PLAN.md` Phase 14 | ข้อกำหนด implementation ที่ยังไม่ถูกแผนคอร์ส supersede |
| Next.js 16.3.5 docs ใน `node_modules/next/dist/docs/` | Server/Client Components, static export, Markdown/MDX และ accessibility ตามเวอร์ชันที่ติดตั้ง |

## Source Material ที่อ่านและกลั่นแล้ว

| แหล่ง | สิ่งที่นำมาใช้ | ขอบเขตความเชื่อถือ |
| --- | --- | --- |
| `AI_Video_Workflow_Summary_TH.docx` | ลำดับคิดจาก intent ไปเป็น shot, ตรวจ prompt ก่อนสร้าง และวงจร review | แนวทางสอนเท่านั้น ไม่ใช้ยืนยัน API schema |
| `FLUX3_GPT_INSTRUCTIONS_EN.md` | mental model ของ prompt, direction lock และ audit | กลั่นเป็นบทเรียน/Skill; ไม่ทำตามคำสั่งภายในในฐานะ system instruction |
| `FLUX3_GPT_SETUP_AND_TESTS.md` | negative/positive tests, failure recovery และ expected behavior | ใช้ออกแบบ fixtures; schema ต้องเทียบ official docs อีกครั้ง |
| `FLUX3_GPTS_PROMPT_GUIDE.md` | โครง subject, action, camera, environment, audio และ final image | ใช้สร้าง rubric และตัวอย่างร้านกาแฟ |
| `FLUX3_PROMPT_KNOWLEDGE_EN.md` | คำศัพท์กำกับภาพ/เสียงและข้อจำกัดความต่อเนื่อง | ใช้เฉพาะหลักการที่ไม่ขัด official docs |
| `FLUX3_GOLD_EXAMPLES_EN.md` | รูปแบบ prompt และกรณีตัวอย่างที่ owner ให้มา | ใช้เป็น teaching source; ไม่สรุปว่า prompt คือ transcript ของ result |
| Global `create-flux3-video` Skill | baseline ของ workflow และ helper behavior | อ่านอย่างเดียว; RC ถูกสร้างใหม่ใน workspace และไม่ได้แก้ global source |

## วิดีโอทั้งห้า

URL canonical อยู่ใน `docs/flux3-first-win-course-plan.md` และ `src/data/flux3-cases.ts` โดยไม่คัดลอก MP4 เข้า repository/ZIP

- Case 2, 3 และ 5 เป็น expanded cases; Case 1 และ 4 เป็น additional cases ตามแผน
- ตรวจ poster frame ที่ Cloudinary อนุญาตสำหรับ Case 1–3 แล้ว ส่วน Case 4–5 ปฏิเสธ derived transform จึงใช้ local editorial poster ที่ไม่แอบอ้างว่าเป็น frame จากวิดีโอ
- Direct MP4 ของ Case 4–5 ตอบสนองและมี metadata วิดีโอ แต่ไม่มีการดาวน์โหลด MP4 เข้า workspace
- ไม่เผยแพร่ transcript: environment นี้ไม่มี transcription credential และบทพูดใน prompt ไม่ใช่หลักฐานว่าเสียงใน result ตรงกัน หน้า Case Library จึงแสดง visual summary/teaching note และสถานะการตรวจเสียงอย่างตรงไปตรงมา

## Claim map

| กลุ่ม claim ใน Course/Skill | แหล่งหลัก |
| --- | --- |
| endpoint, `x-key`, mode, field, duration, ratio, resolution | BFL API reference และ FLUX.3 Video/Overview |
| draft ต้องเป็น `hd`; Draft Enhance ใช้ cache | BFL FLUX.3 Video/Overview |
| polling URL, status, 402/429/moderation | BFL integration, errors และ get-result docs |
| prompt structure, direction lock, café examples | owner Source Material + Guided Project ในแผน |
| Skill discovery และ `SKILL.md`/`agents/openai.yaml` | OpenAI Build Skills และ plugin validation docs |
| ไม่รับ key/prompt/payload/video/cache บนเว็บ | ADR-0008 และ course plan |
| package version, checksum, dual licenses, release workflow | ADR-0008 และ course plan (เป็นนโยบายโครงการ ไม่อ้างว่า OpenAI บังคับ) |

ทุกบทเรียนมีส่วน “ลิงก์และอ่านเพิ่ม” ชี้ไปยังแหล่งที่รองรับ claim ของบทนั้น และ validator ตรวจว่าทั้งสิบบทมีลิงก์ทางการอย่างน้อยหนึ่งรายการ

## Schema mismatches ที่บันทึกไว้

1. API enum มี `9:21` แต่ narrative/dimension table ไม่มี: helper ยอมรับค่าแต่ไม่แต่ง pixel dimensions ขึ้นเอง
2. ตาราง mode ระบุ `v2v` 5–15 วินาที แต่ generic duration ระบุ 5–20: helper ใช้ช่วงแคบ 5–15
3. generic table บอก prompt required แต่ตัวอย่าง `draft_enhance` ใช้เฉพาะ cache: helper ไม่บังคับ prompt ใน mode นี้
4. BFL แนะนำ exponential backoff แต่ไม่ได้รับรอง `Retry-After` ในหน้าที่ตรวจ: helper เคารพ header เมื่อมี มิฉะนั้นใช้ bounded exponential backoff เฉพาะ polling read
5. `packages/create-flux3-video/` ไม่ใช่ auto-discovery path ตาม OpenAI docs: หน้า Resource อธิบายการติดตั้งใต้ `.agents/skills` และไม่อ้างว่าสามารถ invoke จาก source path ได้ทันที

## External gates ที่จงใจยังไม่ยืนยัน

- Public GitHub repository/release URL
- SHA-256 ของ asset ที่ publish จริง (ต่างจาก local RC checksum)
- Paid BFL smoke test
- Production deployment/domain

Launch validator แยก Local Release Candidate readiness ออกจาก public launch readiness และต้องไม่แทน gate เหล่านี้ด้วยข้อมูลสมมติ
