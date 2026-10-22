export type Post = {
  slug: string;
  title: string;
  image: string;
  description: string;
  category: string;
  date?: string;
  reviewNote?: string;
};

export const posts: Post[] = [
  {
    slug: "openclaw-install-guide",
    title: "ติดตั้ง OpenClaw โดยเริ่มจากวิธีทางการ",
    image: "/editorial/cards/blog-openclaw.webp",
    description: "สิ่งที่ควรรู้เรื่อง installer, model, permissions และการตรวจระบบก่อนเริ่มใช้ agent",
    category: "GUIDE / AI TOOLS",
    reviewNote: "ตรวจขั้นตอนกับเอกสารทางการเมื่อ 22 ก.ย. 2026; ตรวจอีกครั้งก่อนใช้งานจริง",
  },
  {
    slug: "sme-chatbot",
    title: "การใช้ Chat Bot แอดมินใน SME ขนาดเล็ก",
    image: "/editorial/cards/blog-chatbot.webp",
    description: "จากคำถามเรื่องต้นทุน AI สู่การออกแบบ workflow ตอบแชท อัปเดตราคา และส่งต่อออเดอร์",
    category: "BUILD NOTES / AUTOMATION",
    reviewNote: "ตัวเลขราคาและต้นทุนในต้นฉบับเป็นประสบการณ์ ณ เวลาที่เขียน ไม่ใช่ราคาเสนอหรือการรับประกันผลลัพธ์ปัจจุบัน; รอเจ้าของทบทวนก่อนเผยแพร่",
  },
  {
    slug: "personal-expense-app",
    title: "ผมทำแอปรายรับ–รายจ่ายที่ทำมาแค่เพื่อผม",
    image: "/editorial/cards/blog-expense.webp",
    description: "บันทึกค่าใช้จ่ายจากแชทและสลิปด้วย LINE, n8n, AI และ Google Sheets",
    category: "BUILD NOTES / AUTOMATION",
    reviewNote: "ขั้นตอนเชื่อมบริการและรุ่น model จากต้นฉบับอาจเปลี่ยนได้; ตรวจเอกสารปัจจุบันก่อนนำไปทำตาม",
  },
  {
    slug: "notebooklm-expert-notes",
    title: "ถอดวิชา YouTuber 300 คลิปด้วย NotebookLM",
    image: "/editorial/cards/blog-notebooklm.webp",
    description: "วิธีจัดแหล่งข้อมูล สร้าง outline และสกัดแนวคิดเพื่อนำไปต่อยอดเป็น knowledge base",
    category: "WORKFLOW / LEARNING",
    reviewNote: "จำนวน source, ส่วนขยาย Chrome และข้อจำกัดผลิตภัณฑ์จากต้นฉบับอาจเปลี่ยนได้; รอเจ้าของทบทวนก่อนเผยแพร่",
  },
  {
    slug: "strategic-navigator",
    title: "The Strategic Navigator: ผู้ช่วย AI วิเคราะห์คริปโตส่วนตัวด้วย n8n",
    image: "/editorial/cards/blog-navigator.webp",
    description: "เบื้องหลัง morning briefing จาก API, TradingView, Google Sheets และ Telegram พร้อมการแยกข้อมูลจำลอง",
    category: "BUILD NOTES / EXPERIMENT",
    reviewNote: "บทความเป็นบันทึกการทดลอง ไม่ใช่คำแนะนำลงทุน; โค้ด export และข้อมูลจำลองถูกพักไว้เพื่อตรวจความปลอดภัยก่อนเผยแพร่",
  },
  {
    slug: "turning-knowledge-into-action",
    title: "Turning Knowledge into Action: บทเรียนจาก 3 ปีในวงการ Tech",
    image: "/editorial/cards/blog-learning.webp",
    description: "เรื่องเล่าการเปลี่ยนสายและแนวคิดเรียนรู้ด้วยการลงมือแก้ปัญหาจริง",
    category: "PERSPECTIVE / LEARNING",
    date: "2026-03-04",
  },
  {
    slug: "blockchain-beginner-guide",
    title: "Blockchain สำหรับคนทั่วไป: เข้าใจในแบบที่ไม่ต้องเป็น Developer",
    image: "/editorial/cards/blog-blockchain.webp",
    description: "อธิบาย Blockchain, Smart Contract และ Web3 ด้วยภาพจำที่เข้าใจง่าย พร้อมข้อจำกัดที่ควรรู้",
    category: "EXPLAINER / WEB3",
    date: "2026-02-15",
    reviewNote: "ตัวอย่าง Smart Contract เป็นภาพอธิบายแนวคิด ไม่ได้หมายความว่าการโอนกรรมสิทธิ์หรือจ่ายประกันทำงานได้อัตโนมัติทุกกรณี",
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
