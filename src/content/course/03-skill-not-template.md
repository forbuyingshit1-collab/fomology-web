## บทนี้คุณจะได้อะไร

คุณจะเข้าใจว่า Prompt Skill ทำงานเป็นระบบสัมภาษณ์ กำกับ ตรวจ Schema และหยุดก่อนใช้เครดิต ต่างจาก Prompt Template ที่มีช่องให้กรอกอย่างเดียว

## เข้าใจใน 1 นาที

**Prompt Skill** คือชุดคำแนะนำและ Reference ที่ Codex โหลดเมื่อเรียกใช้ มันรู้วิธีเลือก Mode, ถามคำถามที่เปลี่ยนผลลัพธ์, สร้าง Prompt ภาษาอังกฤษ, รักษาบทพูดไทย, ตรวจ Payload และขออนุมัติก่อน Paid Submit

**Reference** คือเอกสารความรู้หรือตัวอย่างที่ใช้เรียนรู้ Pattern ไม่ใช่คำสั่งให้คัดลอกสไตล์ทุกครั้ง ตัวอย่างเทปข่าว 4:3 จึงไม่ควรทำให้โปรเจกต์ร้านกาแฟ 9:16 กลายเป็นภาพ Retro

## ทำตามทีละขั้น

1. ให้ Codex รู้ว่าคุณมี “ไอเดียจากข้อความ” เพื่อเลือก `t2v`
2. ตอบคำถามทีละข้อเฉพาะเรื่องที่ยังขาด เช่น ผู้ชม Action หรือ Final Image
3. ขอ `Direction Lock` เพื่อเห็นการตัดสินใจก่อนเขียน Prompt
4. ขอ `Final Prompt + Payload + Risk Notes`
5. ใช้ Helper ตรวจ Payload อีกชั้นก่อน Network
6. ถ้าข้อมูลครบแล้ว Skill ต้องหยุดถามและส่งมอบ ไม่สร้างแบบสอบถามยาวโดยไม่จำเป็น

## ตัวอย่างไม่ดี / ดีขึ้นอย่างไร

**Template ที่อ่อน:** “Create a [style] video of [subject] in [place].” — มันไม่รู้ว่าข้อมูลใดหาย และไม่ตรวจความขัดแย้ง

**Skill ที่ดีขึ้น:** ถามว่า “ช่วงท้ายต้องให้คนดูจำเจ้าของร้านหรือแก้วกาแฟ?” เพราะคำตอบนี้เปลี่ยน Framing และ Final Image จากนั้นจึงล็อก Direction

## ลองทำ

ลองถาม Skill ด้วย Brief ที่ยังขาดหนึ่งจุด:

```text
$create-flux3-video สัมภาษณ์ฉันทีละคำถามเพื่อทำวิดีโอเปิดร้านกาแฟแนวตั้ง 8 วินาที ไม่มีบทพูด เริ่มจากข้อความอย่างเดียว และอย่า Submit API
```

คำตอบที่ดีควรถามเพียงคำถามที่มีผลต่อ Direction ไม่ควรขอ API key หรือรีบสร้างคลิป

## เช็กก่อนผ่าน

- รู้ว่า Skill, Reference, Prompt และ Payload ทำหน้าที่ต่างกัน
- ไม่ถือ Example เป็น Default Creative Direction
- คาดหวังให้ Skill ถามเมื่อข้อมูลสำคัญขาด และหยุดถามเมื่อครบ
- รู้ว่า Script เป็นด่าน Validation/Execution ที่แยกจากบทสนทนา

## ลิงก์และอ่านเพิ่ม

- [OpenAI Build Skills — โครงสร้างและตำแหน่งติดตั้ง](https://learn.chatgpt.com/docs/build-skills)
- [หน้า Resource ของ Skill ในคอร์สนี้](/resources/create-flux3-video/)

:::details อ่านเพิ่ม: ภายใน Package มีอะไร
`SKILL.md` กำหนดพฤติกรรมหลัก, `references/` เก็บวิธีกำกับและ API, `scripts/` มี PowerShell/Python Helper, `tests/` ตรวจ Validation แบบไม่ใช้เครดิต และ `agents/openai.yaml` เป็น Metadata สำหรับการแสดงผล
:::

