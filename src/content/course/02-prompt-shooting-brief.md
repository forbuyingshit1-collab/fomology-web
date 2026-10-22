## บทนี้คุณจะได้อะไร

คุณจะมอง Prompt เป็นงานกำกับที่ถ่ายได้จริง และแยกเส้นทาง `Idea → Brief → Prompt → Payload → Result` ออกจากกัน

## เข้าใจใน 1 นาที

> Prompt ไม่ใช่คาถาหรือคำสวย ๆ แต่คือใบกำกับฉากที่บอก AI ว่า กล้องควรเห็นอะไร ได้ยินอะไร อะไรต้องเปลี่ยน และคลิปต้องจบที่ภาพไหน

**Idea** คือความคิดสั้น ๆ, **Brief** คือการตัดสินใจของงาน, **Prompt** คือคำกำกับภาษาอังกฤษ, **Payload** คือข้อมูล JSON ที่ส่งให้ API และ **Result** คือไฟล์กับ Metadata ที่ได้กลับมา สิ่งเหล่านี้เกี่ยวข้องกันแต่ไม่ใช่สิ่งเดียวกัน

Prompt ที่ถ่ายได้ควรบอก Subject, Physical Action, Environment, Camera, Lighting, Audio, Continuity และ Final Image เท่าที่มีผลกับคลิปจริง

## ทำตามทีละขั้น

1. Subject: เจ้าของร้านกาแฟชาวไทยวัยกลางคนหนึ่งคน
2. Action: เปิดบานไม้ แล้ววางกาแฟเย็นหนึ่งแก้ว
3. Environment: หน้าร้านเล็กยามเช้า ถนนยังเงียบ
4. Camera: เริ่มภาพกว้างระดับสายตา แล้วเคลื่อนเข้าใกล้เมื่อวางแก้ว
5. Lighting: แสงอาทิตย์เช้าเข้าจากด้านข้าง
6. Audio: บานไม้ เสียงน้ำแข็ง นก และถนนเบา ๆ ไม่มีบทพูด
7. Continuity: คนหนึ่งคน แก้วหนึ่งใบ บานไม้เปิดครั้งเดียว
8. Final Image: แก้วอยู่ด้านหน้า เจ้าของร้านอยู่ด้านหลัง และภาพนิ่งค้างสั้น ๆ

## ตัวอย่างไม่ดี / ดีขึ้นอย่างไร

**ไม่ดี:** “A cinematic beautiful Thai coffee shop, viral, amazing light.”

คำนี้เต็มไปด้วยคุณศัพท์ แต่ไม่รู้ว่าใครทำอะไร กล้องเคลื่อนเพราะอะไร หรือจบตรงไหน

**ดีขึ้น:** “A middle-aged Thai café owner opens the wooden shutters once, then places exactly one iced coffee on the counter. The camera slowly moves closer only as the glass touches the counter. Morning side light catches the ice. End with the drink in the foreground and the owner behind it.”

## ลองทำ

ตอบสองบรรทัดโดยไม่ใช้คำว่า “สวย” หรือ “cinematic”:

```text
Action ที่เปลี่ยนสถานะของฉาก: __________________________________
Final Image ที่พิสูจน์ว่าคลิปจบแล้ว: _____________________________
```

## เช็กก่อนผ่าน

- ระบุได้ว่า Action เริ่มและสิ้นสุดเมื่อไร
- กล้องมี Movement หลักอย่างเดียวและมีเหตุให้เริ่ม
- เสียงทุกเสียงมีแหล่งกำเนิดในหรือใกล้ฉาก
- Final Image เป็นองค์ประกอบภาพ ไม่ใช่อารมณ์ลอย ๆ

## ลิงก์และอ่านเพิ่ม

- [BFL Video Prompting Overview](https://docs.bfl.ai/guides/prompting_video_overview)
- [BFL Text to Video Guide](https://docs.bfl.ai/guides/prompting_video_text_to_video)

:::details อ่านเพิ่ม: คำศัพท์กล้องที่พอใช้ในบทแรก
ใช้ `wide shot` เมื่อต้องเห็นพื้นที่, `medium shot` เมื่อดูคนและ Action พร้อมกัน, `close-up` เมื่อวัตถุหรือสีหน้าเป็นหัวใจ ใช้ `push in` เมื่อกล้องเคลื่อนเข้าใกล้ และ `locked shot` เมื่อกล้องไม่ขยับ หนึ่ง Beat เริ่มจากหนึ่ง Framing + หนึ่ง Movement + หนึ่ง Action ก็เพียงพอ
:::

