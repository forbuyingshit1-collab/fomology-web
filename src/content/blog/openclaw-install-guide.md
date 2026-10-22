# ติดตั้ง OpenClaw โดยเริ่มจากวิธีทางการ

คู่มือสำหรับคนที่อยากทดลอง OpenClaw โดยเข้าใจสิทธิ์ที่ให้กับ agent ค่าใช้จ่ายของ model และสิ่งที่เกิดขึ้นในเครื่องก่อนเริ่มติดตั้ง

## ก่อนติดตั้ง: รู้ว่าคุณกำลังอนุญาตอะไร

OpenClaw เป็น agent ที่อาจเข้าถึงไฟล์ เครื่องมือ และบริการที่คุณเชื่อมต่อ อย่าทดลองครั้งแรกด้วยข้อมูลสำคัญหรือสิทธิ์ production และตรวจทุก approval ก่อนยืนยัน

เตรียมระบบ macOS, Linux, Windows หรือ WSL2 ที่คุณควบคุมได้ เตรียมบัญชีหรือ API สำหรับ model ซึ่งอาจมีค่าใช้จ่ายและ limit แยกจากตัว OpenClaw และเริ่มจากโฟลเดอร์ทดลองกับบริการที่ยกเลิกสิทธิ์ได้

## ใช้ installer ที่รองรับระบบของคุณ

เอกสารทางการระบุว่า installer จะตรวจระบบ ติดตั้ง Node หากจำเป็น ติดตั้ง OpenClaw และเริ่ม onboarding ให้ Windows ยังมีตัวเลือก native Hub app ด้วย

macOS / Linux / WSL2:

`curl -fsSL https://openclaw.ai/install.sh | bash`

Windows PowerShell:

`iwr -useb https://openclaw.ai/install.ps1 | iex`

อย่ารันคำสั่งจากหน้าเว็บโดยไม่ตรวจ domain และเนื้อหาก่อน [เอกสารติดตั้งทางการ](https://docs.openclaw.ai/install) เป็นจุดอ้างอิงหลัก และควรตรวจคำสั่งปัจจุบันที่นั่นทุกครั้ง

## ตั้งค่าแบบสิทธิ์น้อยก่อน

เลือก model provider และตรวจค่าใช้จ่าย สร้าง workspace ทดลองที่ไม่มีไฟล์ส่วนตัว ยังไม่เชื่อม messaging channel หรือ account สำคัญ และอ่าน approval ทุกครั้งก่อนอนุญาต tool หรือ command

ถ้าใช้ CLI สามารถเริ่ม onboarding ด้วย `openclaw onboard` ตาม [คู่มือ onboarding ทางการ](https://docs.openclaw.ai/start/wizard)

## ตรวจ install ก่อนเพิ่มความสามารถ

ใช้ `openclaw --version` เพื่อดูว่า CLI พร้อม ใช้ `openclaw doctor` เพื่อตรวจ config และ `openclaw gateway status` เพื่อดูสถานะ Gateway

## เริ่มจาก error จริง ไม่ใช่เดาสุ่ม

หา command `openclaw` ไม่เจอ: ตรวจ Node และ global package path ตามหัวข้อ PATH troubleshooting ในเอกสารทางการ

Gateway ไม่ทำงาน: เริ่มด้วย `openclaw doctor` และ `openclaw gateway status` ก่อนแก้ config

ต้องการ Docker: ใช้คู่มือ Docker แยก เพราะ container flow ไม่เหมือน local installer

คำสั่งและขั้นตอนติดตั้งเปลี่ยนได้ คู่มือนี้ย้ายจากงานเขียนเดิมและตรวจเทียบกับ [เอกสาร OpenClaw](https://docs.openclaw.ai/install) เมื่อ 22 กันยายน 2026 ก่อนใช้งานจริงให้ตรวจเวอร์ชันล่าสุดอีกครั้ง
