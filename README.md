# FOMOLOGY

เว็บไซต์ FOMOLOGY สำหรับเรียน AI และดูผลงานรับจ้าง โดยให้สองเส้นทางสำคัญเท่ากัน: เรียนบนเว็บ และจ้างงานผ่าน [Fastwork](https://fastwork.com/user/anan)

## เริ่มทำงาน

ใช้ Node.js 20.9 ขึ้นไปและ npm ติดตั้งตาม lockfile ที่ commit ไว้:

```sh
npm ci
npm run dev
```

เปิด `http://localhost:3000` พารามิเตอร์ `?design=work-and-learn` ใช้ระบุพรีวิวที่แชร์กัน หน้าแรกมีดีไซน์เดียวและไม่ได้สลับตามพารามิเตอร์นี้

เว็บไซต์รันในเครื่องได้โดยไม่ต้องตั้ง environment variable ถ้าต้องการกำหนด URL หรือ Cloudflare Web Analytics ให้คัดลอก `.env.example` เป็น `.env.local` แล้วกรอกค่าของเครื่องตัวเอง

## Build และตรวจงาน

```sh
npm run typecheck
npm run test:course
npm run check:links
npm run build
npm run preview -- --listen 3000
```

`npm run build` สร้าง static export ใน `out/` ส่วน `check:links` ตรวจรูปแบบ URL และข้อมูลเคส ใช้ `npm run check:links -- --live` เมื่อต้องการตรวจ HTTP เพิ่มเติม

แพ็กเกจ FLUX.3 มีชุดทดสอบแยกต่างหาก: `npm run test:powershell` สำหรับ Windows ส่วน `test:skill`, `test:package` และคำสั่งรวม `check` ใช้ syntax ตั้ง environment variable แบบ POSIX บน Windows สามารถเรียก Python โดยตรงได้:

```sh
python -m unittest discover -s packages/create-flux3-video/tests -p "test_*.py" -v
python packages/create-flux3-video/tests/test_release_package.py
```

## จุดที่เพื่อนร่วมทีมควรรู้

- หน้าแรก: `src/app/page.tsx` และ `src/app/work-motion.css`
- Hero Carousel: `src/components/learning-hero.tsx` และข้อมูลเคสใน `src/data/featured-work.ts`
- Scroll และหมวดผลงาน: `src/components/practice-explorer.tsx`
- หลักฐานผลลัพธ์: `src/components/outcome-evidence.tsx` และ `src/data/media.ts`
- เนื้อหาคอร์สและบทความ: `src/content/course/` และ `src/content/blog/`
- URL ติดต่อ: `src/data/site.ts`
- แพ็กเกจคอร์สที่ดาวน์โหลดได้: `packages/create-flux3-video/` และ `public/downloads/`

อ่าน `CONTEXT.md` ก่อนเปลี่ยนแนวทาง และใช้ `scrollcraft/builds/fomology-work-and-learn/BRIEF.md` เป็น brief หน้าแรกล่าสุด เอกสารดีไซน์รุ่นเก่ายังเก็บไว้เพื่ออ้างอิง จึงอาจมีลำดับความสำคัญต่างจากรุ่นปัจจุบัน ผลการตรวจหน้าเว็บอยู่ใน `scrollcraft/builds/fomology-work-and-learn/VERIFICATION.md`

## พฤติกรรมที่ตกลงไว้

- สีขาว ตัวอักษรดำ แต้มสีแดง FOMOLOGY
- Carousel ใช้เคสจริง พรีวิวไม่มีเสียง 8 วินาที เริ่มจากวินาที 0 และเริ่มใหม่เมื่อเลือกการ์ดกลับมา
- คลิปคงสัดส่วนต้นฉบับในกรอบ 16:9 ไม่ยืดหรือครอปเนื้อหา
- Desktop เปลี่ยนหมวดผลงานตาม scroll; มือถือใช้การปัด และโหมดลดการเคลื่อนไหวใช้ภาพนิ่งกับหน้าปกติ
- เคลมของคลิปแฟนตาซีคือ 1.23 ล้านวิวใน 30 ชั่วโมง พร้อมภาพหลักฐาน แยกจากสถิติรวม 3M ใน 7 วัน
- คอร์สปัจจุบันเปิดเรียนฟรี ไม่มีระบบจ่ายเงิน บัญชีผู้ใช้ หรือฐานข้อมูล

วิดีโอต้นฉบับอยู่บน Cloudinary และอ้างอิงผ่าน URL ไม่เก็บ MP4 ใน repository ภาพปกที่เว็บใช้จริงอยู่ใน `public/` ไฟล์ `output/` เป็นภาพทดสอบและงานชั่วคราวเฉพาะเครื่อง จึงไม่รวมใน Git; path ภาพ QA ในเอกสารเก่าอาจไม่มีหลัง clone

โปรเจกต์ใช้ Next.js 16.3.5 ก่อนแก้โค้ดให้อ่าน `AGENTS.md` และเอกสารที่เกี่ยวข้องใน `node_modules/next/dist/docs/` เว็บไซต์ตั้งค่าเป็น static export การ push source เป็นการส่งต่องาน ไม่ได้ยืนยันว่าได้ deploy production แล้ว
