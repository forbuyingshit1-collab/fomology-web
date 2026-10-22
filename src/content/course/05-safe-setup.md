## บทนี้คุณจะได้อะไร

คุณจะเตรียม Windows, Codex, บัญชี BFL และ API key โดยรู้ว่า Secret อยู่ตรงไหน และเว็บไซต์นี้ไม่รับข้อมูลใดจากการสร้างวิดีโอ

## เข้าใจใน 1 นาที

เส้นทางที่รองรับคือ Windows 10/11, Codex Desktop, Windows PowerShell 5.1 ขึ้นไป, บัญชี BFL, เครดิต และ API key เว็บไซต์ FOMOLOGY เก็บใน Local Storage เฉพาะรหัสบทเรียนที่เรียนจบ ไม่รับ API key, Prompt, Payload, Video, Result JSON หรือ Draft Cache

API key เป็นเหมือนรหัสผ่าน: อย่าวางใน Chat, Prompt, JSON, URL, Command History, Screenshot หรือไฟล์ Log Helper จะอ่านจาก Environment ของ Session หรือถามแบบ Masked Input และเก็บใน Process Memory ชั่วคราว

## ทำตามทีละขั้น

1. เปิด BFL Dashboard สร้างบัญชี และตรวจเครดิต
2. สร้าง API key แต่ยังไม่คัดลอกลงไฟล์ใด
3. ตรวจ PowerShell ด้วย `$PSVersionTable.PSVersion`
4. ติดตั้ง Codex Desktop และเปิด Workspace ที่คุณควบคุม
5. เมื่อต้อง Submit จริง ปล่อยให้ Helper ถาม Key แบบ Masked หรือกำหนด `$env:BFL_API_KEY` ใน Session ปัจจุบันเท่านั้น
6. ปิดหน้าต่าง PowerShell เมื่อเสร็จเพื่อทิ้ง Environment Variable ของ Session

```powershell
$PSVersionTable.PSVersion
# ทางเลือกเฉพาะ Session; อย่าใส่ค่าจริงในไฟล์หรือ History ที่แชร์
$env:BFL_API_KEY = Read-Host "BFL API key" -MaskInput
```

:::note
PowerShell 5.1 ไม่มี `-MaskInput` ในทุกสภาพแวดล้อม Helper จึงใช้ `Read-Host -AsSecureString` และแปลงค่าในหน่วยความจำเฉพาะเวลาส่ง Header
:::

## ตัวอย่างไม่ดี / ดีขึ้นอย่างไร

**ไม่ดี:** `https://api.bfl.ai/v1/flux-3-video?key=...` หรือเก็บ Key ใน `payload.json` — URL และไฟล์อาจถูกบันทึกหรือแชร์

**ดีขึ้น:** Payload มีเฉพาะ Prompt/Settings และ Helper ใส่ Key ใน Header `x-key` จาก Session Memory

## ลองทำ

ตรวจรายการนี้โดยยังไม่ต้องสร้างคลิป: Windows พร้อม, Codex เปิดได้, PowerShell ≥ 5.1, เข้า Dashboard ได้, เห็นสถานะเครดิต และรู้ว่าจะเก็บ API key เฉพาะ Session ใด

## เช็กก่อนผ่าน

- ไม่ได้วาง API key ใน Chat หรือไฟล์
- เข้าใจว่าเว็บไซต์ไม่รับหรือส่งข้อมูล Generation
- พร้อมใช้ Masked Input ของ Helper
- รู้ว่า 402 ให้หยุดและเติมเครดิต ไม่ Retry

## ลิงก์และอ่านเพิ่ม

- [BFL Dashboard](https://dashboard.bfl.ai/)
- [BFL Pricing](https://bfl.ai/pricing)
- [BFL API Integration Guide](https://docs.bfl.ai/api_integration/integration_guidelines)

:::details อ่านเพิ่ม: ขอบเขตความเป็นส่วนตัว
Local Storage ของคอร์สใช้ Key `fomology-flux3-first-win-v2` และค่าภายในเป็น Array ของ Lesson IDs เท่านั้น Analytics ของเว็บไซต์ไม่ส่ง Prompt Content และ Helper ทำงานนอกเว็บไซต์ในเครื่องของคุณ
:::

