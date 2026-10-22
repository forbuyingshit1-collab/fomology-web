## บทนี้คุณจะได้อะไร

คุณจะดาวน์โหลด Local Release Candidate, ตรวจ SHA-256, แตกไฟล์ในระดับโฟลเดอร์ที่ถูกต้อง และเรียก `$create-flux3-video` ใน Codex ได้

## เข้าใจใน 1 นาที

Skill Package ไม่ใช่ไฟล์ `SKILL.md` เดี่ยว แต่เป็น ZIP แบบมี Root เดียวชื่อ `create-flux3-video/` ภายในมี Instructions, References, PowerShell/Python Helpers, Tests, Version, Changelog, Licenses และ Attribution

Codex ค้น Skill จาก `.agents/skills` ที่รองรับ ไม่ได้ค้นทุกโฟลเดอร์ชื่อ `packages` อัตโนมัติ หน้า Resource จึงแยก “Source ของ Local RC” ออกจาก “ตำแหน่งติดตั้ง” ชัดเจน

## ทำตามทีละขั้น

1. เปิด [หน้า Download และคู่มือติดตั้ง](/resources/create-flux3-video/)
2. ดาวน์โหลด `create-flux3-video-v0.1.0-rc.1.zip` และไฟล์ `.sha256` จาก Local RC
3. ตรวจค่า SHA-256 ก่อนแตกไฟล์
4. แตก ZIP ลง `%USERPROFILE%\.agents\skills` ให้ได้ Path `%USERPROFILE%\.agents\skills\create-flux3-video\SKILL.md`
5. อย่าให้เกิดโฟลเดอร์ซ้อน `create-flux3-video\create-flux3-video\SKILL.md`
6. เปิด Workspace ใหม่หรือ Restart Codex เฉพาะเมื่อ Skill ยังไม่ถูกค้นพบ
7. เรียก Skill ด้วย Starter ด้านล่างโดยยังไม่ Submit

```powershell
$zip = ".\create-flux3-video-v0.1.0-rc.1.zip"
Get-FileHash $zip -Algorithm SHA256
$skills = Join-Path $HOME ".agents\skills"
New-Item -ItemType Directory -Force -Path $skills | Out-Null
Expand-Archive -Path $zip -DestinationPath $skills -Force
Test-Path (Join-Path $skills "create-flux3-video\SKILL.md")
```

```text
$create-flux3-video ใช้โหมด prompt-only สัมภาษณ์ฉันทีละคำถามสำหรับคลิปร้านกาแฟ 9:16 ความยาว 8 วินาที มีเสียง ไม่มีบทพูด และห้ามเรียก API
```

## ตัวอย่างไม่ดี / ดีขึ้นอย่างไร

**ไม่ดี:** แตก ZIP ลง Desktop แล้วเรียก Skill โดยหวังว่า Codex จะค้นทุกโฟลเดอร์ หรือเอาเฉพาะ `SKILL.md` ไปวางจน Reference/Scripts หาย

**ดีขึ้น:** ตรวจ Hash, แตกหนึ่งระดับลง `.agents\skills`, ตรวจ Path ของ `SKILL.md` แล้วทดสอบ Prompt-only ก่อน

## ลองทำ

เรียก Starter Prompt และตรวจว่าคำตอบมี `Direction Lock`, Final Prompt ภาษาอังกฤษ, Recommended Parameters และ Risk Notes โดยไม่มีการขอ Key หรือใช้ Network

## เช็กก่อนผ่าน

- Hash ที่คำนวณตรงกับไฟล์ `.sha256`
- มี `create-flux3-video\SKILL.md` เพียงหนึ่งระดับ
- Codex เรียก `$create-flux3-video` ได้
- Prompt-only ไม่ Submit API และไม่ขอ API key ใน Chat

## ลิงก์และอ่านเพิ่ม

- [หน้า Resource: Download, SHA-256 และ Troubleshooting](/resources/create-flux3-video/)
- [OpenAI Build Skills](https://learn.chatgpt.com/docs/build-skills)

:::details อ่านเพิ่ม: ถ้า Execution Policy บล็อก Script
เริ่มจากรันเฉพาะ Process นี้ ไม่แก้นโยบายทั้งเครื่อง: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` จากนั้นเรียก Helper ด้วย Path ที่ชัดเจน หากองค์กรควบคุม Policy ให้หยุดและถามผู้ดูแลระบบ อย่าปิดระบบความปลอดภัยถาวร
:::

