## บทนี้คุณจะได้อะไร

คุณจะสร้าง Payload, Validate และ Dry Run โดยไม่ใช้ Network จากนั้นเข้าใจจุดที่ Paid Submit ต้องขออนุมัติแบบ Default No

## เข้าใจใน 1 นาที

**Dry Run** ตรวจ Schema และแสดง Prompt/Settings แต่ไม่อ่าน API key และไม่เรียก Network ส่วน **Submit** คือ Paid Generation จริง Helper จะแสดง Prompt และ Settings อีกครั้ง แล้วถาม `Submit this paid generation? [y/N]` การกด Enter หรือพิมพ์อย่างอื่นนอกจาก `y/yes` ต้องยกเลิก

Helper ห้ามสร้าง Polling URL เอง ต้องใช้ `polling_url` จาก API เท่านั้น ดาวน์โหลด MP4, Result JSON และ Draft Cache ทันทีเมื่อ `Ready`; หยุดที่ 402, Moderation หรือ Error; 429 ใช้ Retry-After เมื่อมีหรือ Bounded Backoff และห้าม Auto-resubmit POST

## ทำตามทีละขั้น

1. บันทึก Payload นี้เป็น `guided-cafe.json` นอกโฟลเดอร์ที่ Sync/Share อัตโนมัติหากมีข้อมูลส่วนตัว
2. รัน PowerShell ด้วย `-DryRun`
3. ตรวจ Mode, Duration, Ratio, Resolution, Draft และ Audio เทียบกับ Prompt
4. แก้ Validation Error ก่อนดำเนินการ
5. เมื่อพร้อมจ่ายจริง ค่อยรันคำสั่ง Submit ด้านล่างและอ่าน Summary อีกครั้ง
6. ตอบ `y` เพียงครั้งเดียวเมื่อยอมรับ Settings ตรงหน้า
7. เก็บ `.mp4`, `.result.json` และ `.draft-cache.bin` เมื่อ API คืนมา

```json
{
  "mode": "t2v",
  "prompt": "Create an 8-second vertical 9:16 scene at a small wooden Thai street café just after sunrise. Exactly one middle-aged Thai café owner opens the wooden shutters once, then places exactly one iced coffee on the counter. Begin one slow push-in only as the glass moves toward the counter. Audio: shutters, ice, birds, and quiet street ambience; no dialogue or music. Final image: the drink is sharp in the foreground and the same owner is stable behind it, held for 0.5 seconds.",
  "aspect_ratio": "9:16",
  "duration": 8,
  "resolution": "hd",
  "generate_audio": true,
  "safety_tolerance": 2,
  "draft": true
}
```

```powershell
.\scripts\flux3_video.ps1 -Payload .\guided-cafe.json -DryRun
```

```powershell
.\scripts\flux3_video.ps1 -Payload .\guided-cafe.json -Wait `
  -Output .\guided-cafe.mp4 `
  -SaveResult .\guided-cafe.result.json `
  -DraftCacheOutput .\guided-cafe.draft-cache.bin
```

:::warning
คำสั่งที่สองใช้เครดิตหลังคุณตอบ `y` เท่านั้น คอร์สและ Automated Tests จะไม่รันคำสั่งนี้แทนคุณ
:::

## ตัวอย่างไม่ดี / ดีขึ้นอย่างไร

**ไม่ดี:** ใส่ `resolution: "fhd"` พร้อม `draft: true`, กด Submit ซ้ำเมื่อหน้าจอเงียบ หรือสร้าง URL `/get_result?id=...` เอง

**ดีขึ้น:** Draft ใช้ `hd`, Save Result ก่อนวิเคราะห์ Error, Poll เฉพาะ URL ที่คืนมา และหยุดเพื่อเช็ก Dashboard ถ้าสถานะ Submit ไม่แน่นอน

## ลองทำ

รันเฉพาะ `-DryRun` แล้วหาให้ครบหกค่า: `t2v`, `9:16`, `8`, `hd`, `draft=true`, `generate_audio=true` ไม่มี API key ใน Output

## เช็กก่อนผ่าน

- Dry Run ผ่านโดยไม่ใช้ Network หรือเครดิต
- Prompt และ Settings ตรงกับ Direction Lock
- เข้าใจว่า Enter = No ใน Paid Confirmation
- รู้ชื่อ Artifact ทั้งสามและไม่กด Submit ซ้ำอัตโนมัติ

## ลิงก์และอ่านเพิ่ม

- [BFL FLUX.3 API Reference](https://docs.bfl.ai/api-reference/utility/generate-a-video-with-flux-3)
- [หน้า Resource: Error recovery และ Helper options](/resources/create-flux3-video/)

:::details อ่านเพิ่ม: i2v, v2v และ draft_enhance
`i2v` ต้องมี `keyframes`; `v2v` ต้องมี `start_video` และ Local Validator จำกัด 5–15 วินาทีตามตาราง Mode ปัจจุบัน; `draft_enhance` ต้องมี `draft_cache` และรองรับ `hd/fhd/qhd/uhd` โดยไม่ใส่ Prompt ใหม่ สำหรับ `9:21` API รับค่าแต่ยังไม่มีตาราง Dimension ทางการ
:::

