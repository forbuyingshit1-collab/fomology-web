## บทนี้คุณจะได้อะไร

คุณจะขยาย Direction Lock เป็น Final FLUX.3 Prompt ภาษาอังกฤษ ตรวจความเป็นไปได้ และเห็น Risk Notes ก่อนสร้าง Payload

## เข้าใจใน 1 นาที

Prompt ที่ดีไม่จำเป็นต้องยาวที่สุด ใช้หนึ่ง Action หลักต่อ Beat, กล้องเคลื่อนเมื่อเกิดเหตุ, เสียงมีแหล่งกำเนิด, ล็อกเฉพาะรายละเอียดที่เสี่ยง Drift และตั้งชื่อ Final Image ถ้ามีบทพูดภาษาไทย ให้เขียนคำพูดจริงเป็นอักษรไทยแม้ Prompt ส่วนอื่นเป็นอังกฤษ

Quality Gate ถามว่า Mode ถูกไหม, Action มีปลายทางไหม, เวลาเพียงพอไหม, กล้องขัดกันหรือไม่, Continuity ชัดไหม, Audio มาจากไหน และเฟรมสุดท้ายคืออะไร

## ทำตามทีละขั้น

1. เปิดด้วย Subject + Place + Change ของฉาก
2. แบ่ง 8 วินาทีเป็น 3 Beat ที่ทำได้จริง
3. เขียน Camera Motivation แค่ครั้งเดียว
4. ล็อกจำนวนคน แก้ว ชุด และมือที่วางแก้วเท่าที่จำเป็น
5. แยก Audio ออกจากภาพ และตัดเสียงที่ไม่ต้องใช้
6. เพิ่ม Negative Constraints เฉพาะความเสี่ยง: คน/แก้วซ้ำ, ข้อความ, Logo, Camera Move เพิ่ม, เสียงพูด
7. จบด้วย Final Image และ Hold

```text
Create an 8-second vertical 9:16 text-to-video scene at a small wooden Thai street café just after sunrise. Exactly one middle-aged Thai café owner, wearing the same simple indigo apron throughout, begins inside the closed shop and opens the two wooden shutters once.

0.0–2.5s — Eye-level wide shot from the quiet pavement. The owner slides both shutters fully open. Soft morning side light enters the shop. Audio: wooden runners, two small birds, and distant light street ambience.

2.5–6.5s — Without a cut, the owner takes exactly one clear iced coffee in the right hand, steps to the counter, and places it once at the front edge. Begin one slow, steady push-in only as the glass moves toward the counter. The ice shifts audibly when the glass makes contact.

6.5–8.0s — The owner releases the glass and remains naturally behind it. Hold the composition for the final half-second: the iced coffee is sharp in the foreground, catching warm morning light, while the owner is stable and softly visible behind it.

Audio: natural wooden shutter movement, ice in one glass, birds, and quiet street ambience. No dialogue, narration, music, extra people, extra cups, logos, readable text, subtitles, abrupt cuts, orbiting camera, identity change, duplicated hands, or object morphing.

Final image: exactly one iced coffee in the foreground and the same owner behind it in the open café, held steady for 0.5 seconds.
```

## ตัวอย่างไม่ดี / ดีขึ้นอย่างไร

**ไม่ดี:** “Fast drone orbit, handheld push-in and crash zoom while the owner opens, brews, pours, serves and talks to customers.” — กล้องสามแบบ Action ห้าอย่าง และคนเพิ่มโดยไม่พอเวลา

**ดีขึ้น:** Continuous Take เดียว, Slow Push-in เดียว, การเปลี่ยนจากร้านปิดเป็นแก้วพร้อมเสิร์ฟ และไม่มี Dialogue

## ลองทำ

อ่าน Prompt ออกเสียงแล้วชี้ทุกคำที่กล้องมองไม่เห็นหรือไมค์ไม่ได้ยิน ถ้าคำนั้นไม่ช่วย Direction ให้ตัดออก จากนั้นให้ Skill ทำ Audit และขอ Risk Notes โดยไม่ Submit

## เช็กก่อนผ่าน

- ทุก Beat ทำได้ในช่วงเวลาที่กำหนด
- Action มี Preparation, Contact/Change และ Result
- Camera Move เดียวและมีเหตุเริ่ม
- Audio ทุกชั้นมี Source
- Final Image ชัด และ Risk Notes ไม่ถูกซ่อนไว้

## ลิงก์และอ่านเพิ่ม

- [BFL Video Prompting Overview](https://docs.bfl.ai/guides/prompting_video_overview)
- [BFL Audio Prompting](https://docs.bfl.ai/guides/prompting_video_audio)
- [FLUX.3 Case Library ในหน้านี้](#case-library)

:::details อ่านเพิ่ม: Prompt ที่มีบทพูดไทย
เขียนคำกำกับเป็นอังกฤษ แต่คงคำพูดจริงเป็นไทย เช่น `The visible owner says softly in natural Thai: “กาแฟแก้วแรกพร้อมแล้วครับ”` ระบุผู้พูด น้ำเสียง คนที่พูดด้วย และเว้นเวลาให้ประโยคจบ อย่าให้เสียงคนพื้นหลังแข่งกับบทหลัก
:::

