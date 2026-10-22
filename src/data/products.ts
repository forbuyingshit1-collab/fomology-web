export type Work = {
  slug: string;
  title: string;
  maturity: string;
  summary: string;
  scope: string;
  detail?: string[];
  cover?: string;
  href?: string;
};

export const messengerUrl = "https://m.me/61592333219846";

export const services = [
  {
    number: "01",
    title: "Websites & Landing Pages",
    image: "/editorial/cards/service-websites.webp",
    description: "เปลี่ยนข้อมูลที่กระจัดกระจายให้เป็นเว็บไซต์ที่เล่าเรื่องชัด ใช้งานง่าย และพร้อมพาคนไปยังขั้นตอนถัดไป",
    deliverables: ["Content structure", "Responsive UI", "Development & launch"],
    scope: "เหมาะกับ Landing page · Portfolio · เว็บไซต์บริการหรือผลิตภัณฑ์",
  },
  {
    number: "02",
    title: "Custom Systems",
    image: "/editorial/cards/service-systems.webp",
    description: "ออกแบบและพัฒนาระบบตามวิธีทำงานจริงของทีม เพื่อรวมข้อมูล ลดขั้นตอนกระจัดกระจาย และตรวจสอบงานได้ง่ายขึ้น",
    deliverables: ["Dashboard", "Internal tools", "Database & admin flow"],
    scope: "เหมาะกับระบบหลังบ้าน · เครื่องมือเฉพาะทีม · Workflow ที่ซอฟต์แวร์สำเร็จรูปตอบไม่ได้",
  },
  {
    number: "03",
    title: "Automation & Integrations",
    image: "/editorial/cards/service-automation.webp",
    description: "เชื่อมแชท ชีต API และเครื่องมือที่ใช้อยู่ ให้ขั้นตอนซ้ำ ๆ ทำงานต่อกันโดยยังมีจุดให้คนตรวจและรับช่วงต่อ",
    deliverables: ["n8n workflows", "API & messaging", "AI-assisted operations"],
    scope: "เหมาะกับงานตอบลูกค้า · อัปเดตข้อมูล · สรุปรายงาน · ส่งต่องานระหว่างทีม",
  },
  {
    number: "04",
    title: "AI Video Production",
    image: "/editorial/cards/service-video.webp",
    description: "เปลี่ยนไอเดียหรือข้อมูลของแบรนด์ให้เป็นวิดีโอ ตั้งแต่วางมุมเล่า สร้างภาพ ไปจนถึงชิ้นงานพร้อมเผยแพร่",
    deliverables: ["Creative direction", "AI visual workflow", "Edit & final delivery"],
    scope: "เหมาะกับวิดีโอสั้น · Social content · งานทดลองรูปแบบใหม่",
  },
] as const;

export const works: Work[] = [
  {
    slug: "cloud-assistant",
    title: "Cloud Assistant",
    maturity: "Production System",
    summary: "แดชบอร์ดจัดงาน AI ส่วนตัวที่แปลงคำขอเป็นงานมีโครงสร้าง ส่งต่อ agent และเก็บผลลัพธ์ให้อ่านย้อนหลังได้",
    scope: "Product design · Agent orchestration · Full-stack",
    detail: [
      "โจทย์เริ่มจากงาน AI ส่วนตัวที่กระจัดกระจายอยู่หลายแชท จึงออกแบบ task model และการส่งงานให้ agent เฉพาะทาง",
      "ต้นแบบระบบทำงานต่อกันระหว่างคิวงานบนคลาวด์ ฐานข้อมูล และ local execution bridge โดยไม่ต้องเก็บ credential สำคัญไว้ในโครงสร้างออนไลน์",
      "สถานะในแหล่งงานเดิมระบุ Production System แต่ยังมีงาน authentication และ stale-run recovery ก่อนนำไปใช้กับข้อมูลอ่อนไหว",
    ],
    cover: "/editorial/work/cloud-assistant-editorial.webp",
  },
  {
    slug: "tracking-sender",
    title: "Tracking Sender Dashboard",
    maturity: "Working Prototype",
    summary: "ระบบต้นแบบสำหรับจับคู่ออเดอร์กับแชทลูกค้า พรีวิวข้อความแจ้งเลขพัสดุ และตรวจทานก่อนส่ง",
    scope: "Workflow design · Integration architecture · Operations UI",
    detail: [
      "แยกการจับคู่ ตรวจข้อมูล พรีวิว และยืนยันการส่งออกจากกัน เพื่อลดความเสี่ยงจากการส่งข้อความผิดคน",
      "มี order logic ที่ทดสอบแล้ว และ adapter สำหรับ Google Sheets กับ messaging API ตามเอกสารต้นฉบับ",
      "ยังเป็น prototype; การเชื่อมบัญชีและข้อมูลลูกค้าจริงต้องทดสอบในสภาพแวดล้อมเฉพาะและไม่แสดงในหน้านี้",
    ],
    cover: "/editorial/work/tracking-sender-editorial.webp",
  },
  {
    slug: "ai-news-curation",
    title: "AI News Curation",
    maturity: "Working Prototype",
    summary: "บอร์ดบรรณาธิการภาษาไทยสำหรับคัดข่าว AI พร้อมสถานะการประมวลผล ข่าวที่ถูกคัดออก และผลลัพธ์บางส่วนเมื่อแหล่งข่าวล้มเหลว",
    scope: "Editorial workflow · State design · Product UI",
    detail: [
      "ออกแบบ daily board และประวัติการประมวลผลให้บรรณาธิการรู้ว่าข่าวไหนถูกเลือกหรือคัดออกเพราะอะไร",
      "รองรับ partial failure ในโมเดล UI เพื่อให้ยังตรวจงานต่อได้เมื่อบางแหล่งข้อมูลไม่สำเร็จ",
      "ข้อมูลข่าวใน prototype เป็นข้อมูลจำลอง; การเชื่อมแหล่งข่าวจริงเป็นขั้นตอนถัดไป",
    ],
    cover: "/editorial/work/ai-news-curation-editorial.webp",
  },
  {
    slug: "syncsocial",
    title: "SyncSocial",
    maturity: "UI Concept",
    summary: "แนวคิดหน้าจอสำหรับเขียนโพสต์ครั้งเดียว พรีวิวแยกแพลตฟอร์ม และดูผลการเผยแพร่จำลอง",
    scope: "Product UI · Cross-platform preview · Concept",
    detail: [
      "จัด flow การเลือกช่องทาง เขียน caption พรีวิว และตั้งเวลาให้อยู่ในเรื่องเดียวกัน",
      "ตัวเลข analytics และผลการโพสต์ทั้งหมดเป็นข้อมูลจำลอง ไม่ใช่ผลลัพธ์จากบัญชีที่เชื่อมต่อจริง",
      "ยังไม่มี OAuth หรือ live publishing ใน concept นี้",
    ],
    cover: "/editorial/work/syncsocial-editorial.webp",
  },
  {
    slug: "personal-portfolio",
    title: "Personal Portfolio Website",
    maturity: "Built Website",
    summary: "เว็บไซต์ส่วนตัวเดิมที่รวม resume, blog, showcase, interactive demo และคู่มือไว้ในประสบการณ์เดียว",
    scope: "React · TypeScript · Content architecture",
    detail: [
      "แหล่งงานเดิมเป็นเว็บ React/TypeScript ที่มีหน้า portfolio, resume, blog, showcase และ guide พร้อมโครงสร้าง SEO และการ deploy",
      "หน้า resume รองรับการพิมพ์และ export PDF; เนื้อหา Blog เดิมเป็นแหล่งสำหรับการย้ายมาที่ FOMOLOGY",
      "เว็บไซต์เดิมยังคงอยู่โดยไม่แก้ไขหรือ redirect ในช่วง preview นี้",
    ],
    cover: "/editorial/work/personal-portfolio-editorial.webp",
  },
  {
    slug: "openclaw-guide",
    title: "OpenClaw Guide",
    maturity: "Published Guide",
    summary: "คู่มือเริ่มติดตั้ง OpenClaw ที่อธิบาย installer, onboarding, สิทธิ์ของ agent และวิธีตรวจระบบก่อนใช้งาน",
    scope: "Technical writing · AI safety · Documentation",
    cover: "/editorial/work/openclaw-guide-editorial.webp",
    href: "/blog/openclaw-install-guide",
  },
  {
    slug: "blog-knowledge-content",
    title: "Blog & Knowledge Content",
    maturity: "Editorial Archive",
    summary: "ชุดบทความและบันทึกจากการเรียนรู้ ทดลอง workflow และทำโปรเจกต์ AI, Automation และ Web3",
    scope: "Writing · Knowledge sharing · Content platform",
    cover: "/editorial/work/blog-knowledge-content-editorial.webp",
    href: "/blog",
  },
  {
    slug: "speednano-web3",
    title: "Speednano Web3 Landing",
    maturity: "Built Archive / Review Pending",
    summary: "งานแปลง deck Web3 จากภาพนิ่งให้เป็นหน้าเว็บที่จัดหมวด portfolio, product, roadmap และเนื้อหานักลงทุนแบบแก้ไขได้",
    scope: "Next.js · Content modeling · Landing page",
    detail: [
      "ไฟล์ archive แสดงหน้าเว็บ Next.js ที่ใช้ข้อมูลแบบมีโครงสร้างแทนการวางสไลด์เป็นภาพทั้งหน้า",
      "มีหมวด solution, portfolio, products, roadmap และ investor CTA แต่ตัวเลขและชื่อใน deck ไม่ได้ใช้เป็นผลลัพธ์ของ FOMOLOGY",
      "สถานะ public-use ของชื่อ ลูกค้า และตัวเลขยังต้องทบทวนก่อนเผยแพร่ภาพหรือรายละเอียดลึกกว่านี้",
    ],
    cover: "/editorial/work/speednano-web3-editorial.webp",
  },
  {
    slug: "mintel-airline-analysis",
    title: "Airline Booking System Analysis",
    maturity: "System Analysis Exercise",
    summary: "ชุดวิเคราะห์ระบบจองตั๋วเครื่องบิน ครอบคลุม booking, seat hold, payment, promotion, event tracking และข้อมูลหลังบ้าน",
    scope: "Business rules · Flowchart · ERD",
    detail: [
      "เอกสาร archive มี high-level architecture, booking flow, schema/ERD, event taxonomy และความเสี่ยงช่วง traffic สูง",
      "แสดงทักษะการแตกโจทย์ธุรกิจเป็นกฎและ flow ระบบ ไม่ใช่ระบบ airline ที่เปิดใช้งานจริง",
      "ยังไม่ยืนยันบริบทของ exercise จึงไม่นำเสนอเป็น client delivery หรือ production case study",
    ],
    cover: "/editorial/work/mintel-airline-analysis-editorial.webp",
  },
  {
    slug: "rwa-ecosystem",
    title: "RWA Ecosystem",
    maturity: "Concept / In Development",
    summary: "แนวคิด blockchain สำหรับธุรกิจ hospitality จากรายการงานเดิม ขณะนี้ยังไม่มีเอกสารพอสำหรับ case study หรือข้ออ้างผลลัพธ์",
    scope: "Blockchain · Hospitality concept",
    cover: "/editorial/work/rwa-ecosystem-editorial.webp",
  },
];

export function getWork(slug: string) {
  return works.find((work) => work.slug === slug);
}
