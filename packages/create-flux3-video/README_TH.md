# คู่มือ create-flux3-video

Local Prompt Skill สำหรับสัมภาษณ์ กำกับ ตรวจ Prompt/Payload และช่วยเรียก FLUX.3 หลังผู้ใช้อนุมัติ Paid Submit ด้วยตัวเอง

## ติดตั้งบน Windows

1. ดาวน์โหลด ZIP และไฟล์ `.sha256` คู่กัน
2. รัน `Get-FileHash .\create-flux3-video-v0.1.0-rc.1.zip -Algorithm SHA256`
3. แตก ZIP ลง `$HOME\.agents\skills`
4. ตรวจว่าได้ `$HOME\.agents\skills\create-flux3-video\SKILL.md` เพียงหนึ่งระดับ
5. เปิด Workspace ใหม่หรือ Restart Codex เฉพาะเมื่อยังเรียก Skill ไม่ได้

เรียกใช้งาน:

```text
$create-flux3-video สัมภาษณ์ฉันทีละคำถามสำหรับวิดีโอ 9:16 8 วินาที และห้ามเรียก API
```

## API key

ห้ามใส่ Key ใน Chat, Prompt, Payload, URL, Log หรือไฟล์ Helper จะใช้ `$env:BFL_API_KEY` ของ Session ปัจจุบัน หรือถามแบบ Masked ด้วย `Read-Host -AsSecureString` ปิดหน้าต่าง PowerShell เมื่อจบงานเพื่อทิ้งค่าของ Session

## Dry Run และ Submit

```powershell
.\scripts\flux3_video.ps1 -Payload .\payload.json -DryRun
```

Dry Run ตรวจ Schema และแสดง Prompt/Settings โดยไม่อ่าน Key หรือใช้ Network เมื่อตัดสินใจ Generate จริง ให้ตัด `-DryRun` และเพิ่ม `-Wait`, `-Output`, `-SaveResult`, `-DraftCacheOutput` ตามต้องการ Helper จะแสดงค่าทั้งหมดแล้วถาม:

```text
Submit this paid generation? [y/N]
```

กด Enter = No ใช้เครดิตต่อเมื่อพิมพ์ `y` หรือ `yes` เท่านั้น

## การกู้ปัญหา

- **โฟลเดอร์ซ้อน:** แก้ให้ `SKILL.md` อยู่ใต้ `create-flux3-video` หนึ่งระดับ
- **หา Skill ไม่เจอ:** ตรวจ `.agents\skills`, เปิด Workspace ใหม่ และ Restart เมื่อจำเป็น
- **Execution Policy:** ใช้ `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`; ไม่เปลี่ยน Policy ถาวร
- **ไม่มี Python:** ใช้ PowerShell Helper ได้โดยตรง
- **Key หาย/ถูกปฏิเสธ:** กรอกใหม่แบบ Masked และตรวจ Dashboard; ห้ามบันทึกลง Payload
- **Validation fail:** แก้ Field/Mode ก่อน Network อย่าปิด Validation
- **402:** หยุดและเติมเครดิต ห้าม Submit ซ้ำอัตโนมัติ
- **429:** Helper จะเคารพ `Retry-After` เมื่อมี หรือใช้ Bounded Backoff กับ Polling เท่านั้น
- **Moderation:** หยุด อ่านเหตุผล และแก้เนื้อหาด้วยตัวเอง
- **Task not found / Polling error:** เก็บ Result และ `polling_url` ที่ได้จริง ห้ามสร้าง URL เอง
- **URL หมดอายุ:** ดาวน์โหลด MP4/Cache ทันทีเมื่อ Ready
- **ไม่มี Cache:** เก็บ Result JSON และตรวจว่า Request ใช้ `draft: true` กับ `hd`
- **Drift:** เก็บ Prompt/Payload/Result/Video/Cache ล่าสุด แล้วแก้ครั้งละหนึ่งตัวแปร
- **Stop:** หยุดเมื่อ 402, Moderation, Error ที่ยังไม่เข้าใจ หรือ Drift ซ้ำ

ตรวจ BFL ล่าสุด 2026-09-28 ข้อมูลราคา/Schema อาจเปลี่ยน โปรดตรวจเอกสารทางการก่อน Paid Run

