## บทนี้คุณจะได้อะไร

คุณจะเปลี่ยนไอเดียร้านกาแฟเป็น Direction Lock ที่ตัดสินใจครบก่อนเริ่มเขียน Prompt ยาว

## เข้าใจใน 1 นาที

Guided Project คือฉากแนวตั้ง 8 วินาที: เจ้าของร้านกาแฟชาวไทยวัยกลางคนเปิดบานไม้ แล้ววางกาแฟเย็นหนึ่งแก้วในแสงเช้า กล้องค่อย ๆ เข้าใกล้ ได้ยินนก ถนนเงียบ บานไม้ และน้ำแข็ง ไม่มีบทพูด จบที่แก้วด้านหน้า เจ้าของร้านด้านหลัง

Direction Lock คือรายการตัดสินใจ ไม่ใช่ Prompt Final หน้าที่ของมันคือทำให้ผู้ใช้กับ Skill เห็นภาพเดียวกันและพบช่องว่างก่อนเสียเครดิต

## ทำตามทีละขั้น

1. Viewer: คนที่กำลังเลื่อนดูวิดีโอสั้นและต้องเข้าใจภาพในไม่กี่วินาที
2. Platform: วิดีโอแนวตั้ง 9:16
3. Duration: 8 วินาที
4. Mode: `t2v` เพราะไม่มี Source Media
5. Action: เปิดบานไม้ครั้งเดียว → เดินถึงเคาน์เตอร์ → วางแก้วหนึ่งใบ
6. Camera: Wide ระดับสายตา แล้ว Slow Push-in เริ่มเมื่อมือพาแก้วเข้าหาเคาน์เตอร์
7. Environment/Light: ร้านไม้เล็ก ถนนเงียบ แสงเช้าจากด้านข้าง
8. Sound: ไม้เลื่อน น้ำแข็งกระทบแก้ว นก และถนนเบา ๆ ไม่มี Dialogue/Music
9. Final Image: กาแฟเย็นคมชัดด้านหน้า เจ้าของร้านนิ่งอยู่ด้านหลัง ค้างภาพครึ่งวินาที

```text
Direction Lock
- Mode: t2v
- Viewer / platform: short-form viewer / vertical 9:16
- Duration: 8 seconds
- Subject: exactly one middle-aged Thai café owner
- Action: opens wooden shutters once, then places exactly one iced coffee
- Camera: eye-level wide, then one slow push-in motivated by the glass placement
- Environment: small wooden street café at quiet sunrise
- Audio: shutters, ice in glass, birds, light street ambience; no dialogue, no music
- Final image: drink foreground, owner behind, hold 0.5 seconds
```

## ตัวอย่างไม่ดี / ดีขึ้นอย่างไร

**ไม่ดี:** “เจ้าของร้านเปิดร้าน ทำกาแฟ ยิ้มให้กล้อง ลูกค้าเข้ามา กล้องบินรอบร้าน จบด้วย Logo” — 8 วินาทีมีหลายเหตุการณ์เกินไปและ Logo เพิ่มความเสี่ยงข้อความเพี้ยน

**ดีขึ้น:** ลดเหลือการเปลี่ยนเดียวจาก “ร้านปิด” เป็น “กาแฟแก้วแรกพร้อมเสิร์ฟ” และใช้แก้วเป็น Anchor Object

## ลองทำ

ปรับ Direction Lock ได้หนึ่งจุดโดยไม่เพิ่ม Beat เช่น เปลี่ยนเสื้อเจ้าของร้าน สีแก้ว หรือสภาพอากาศ แล้วตรวจว่า Final Image ยังชัดเหมือนเดิม

## เช็กก่อนผ่าน

- Viewer, Platform, Mode, Duration และ Success Criterion ชัด
- มี Exactly one owner และ one iced coffee
- กล้องมี Movement หลักหนึ่งอย่างและเริ่มเพราะ Action
- ไม่มี Dialogue และ Final Image ระบุองค์ประกอบหน้า–หลัง

## ลิงก์และอ่านเพิ่ม

- [BFL Text to Video Prompting](https://docs.bfl.ai/guides/prompting_video_text_to_video)
- [BFL Camera Vocabulary](https://docs.bfl.ai/guides/prompting_video_camera_terms)

:::details อ่านเพิ่ม: Five Anchors ของฉากนี้
Governing emotion: การเริ่มวันอย่างสงบ; Repeated motif: เสียงยามเช้า; Anchor object: แก้วกาแฟเย็น; Irreversible change: บานไม้เปิดและแก้วถูกวาง; Final image: แก้วหน้าเฟรม เจ้าของร้านหลังเฟรม การล็อกห้าจุดนี้ช่วยตัดรายละเอียดที่ไม่สนับสนุนแก่นออก
:::

