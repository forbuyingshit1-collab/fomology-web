import {
  getCloudinaryVideoPosterUrl,
  getCloudinaryVideoPreviewUrl,
} from "@/lib/cloudinary";

export type ClientWork = {
  id: string;
  title: string;
  product: string;
  responsibilityLabel: string;
  problem: string;
  responsibility: string;
  delivery: string;
  scope: readonly string[];
  fullUrl: string;
  previewUrl: string;
  posterUrl: string;
  outcomes?: readonly {
    value: string;
    label: string;
  }[];
};

const chatbotUrl =
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1790155792/Chat_bot.mp4";
const storyupUrl =
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1790155797/Storyup.mp4";
const smfiUrl =
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1790155789/SMFI.mp4";
const realSunUrl =
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1790155788/RS.mp4";

export const clientWorks: readonly ClientWork[] = [
  {
    id: "chatbot",
    title: "บ้านรวมทะเล Chat Bot",
    product: "AI COMMERCE SYSTEM",
    responsibilityLabel: "AI WORKFLOW · SYSTEM DESIGN · DELIVERY",
    problem: "งานขายผ่านแชตต้องสลับระหว่างบทสนทนา แคตตาล็อกสินค้า และข้อมูลหลังบ้านหลายจุด",
    responsibility: "ออกแบบ workflow ของ Chatbot, Automation และหน้าจอแอดมินให้ทำงานต่อกัน",
    delivery: "ระบบขายผ่านแชตที่เชื่อมบทสนทนา แคตตาล็อก และงานหลังบ้านไว้ใน flow เดียว",
    scope: ["Chatbot", "Automation", "Admin dashboard"],
    fullUrl: chatbotUrl,
    previewUrl: getCloudinaryVideoPreviewUrl(chatbotUrl),
    posterUrl: getCloudinaryVideoPosterUrl(chatbotUrl),
    outcomes: [
      { value: "2–3 คน", label: "รองรับภาระงานแอดมินเดิม" },
      { value: "≈ 2×", label: "รายได้สูงสุดภายใน 3 เดือน" },
    ],
  },
  {
    id: "storyup",
    title: "StoryUp",
    product: "AI BRAND BUILDER",
    responsibilityLabel: "PRODUCT DESIGN · AI WORKFLOW · WEB APP",
    problem: "เรื่องจริงของธุรกิจขนาดเล็กยังไม่ถูกจัดให้พร้อมใช้เป็นเรื่องราวและเนื้อหาแบรนด์",
    responsibility: "ออกแบบผลิตภัณฑ์ ประสบการณ์ใช้งาน และ AI workflow สำหรับการต่อยอดเนื้อหา",
    delivery: "Web application ที่สร้าง Brand story, Landing page, Blog และ Social content จากข้อมูลธุรกิจ",
    scope: ["Product design", "AI workflow", "Web application"],
    fullUrl: storyupUrl,
    previewUrl: getCloudinaryVideoPreviewUrl(storyupUrl),
    posterUrl: getCloudinaryVideoPosterUrl(storyupUrl),
  },
  {
    id: "smfi",
    title: "SMFI",
    product: "SOCIAL MUSIC FI",
    responsibilityLabel: "PRODUCT WEBSITE · WEB3 UX · MULTILINGUAL",
    problem: "ประสบการณ์ของศิลปิน แฟนเพลง และ Wallet ต้องเชื่อมกันในผลิตภัณฑ์เดียวโดยไม่ทำให้ผู้ใช้หลงทาง",
    responsibility: "ออกแบบ Product website, Web3 UX และโครงสร้างหน้าจอหลายภาษา",
    delivery: "Social Music Fi product สำหรับค้นพบผลงาน เข้าถึงศิลปิน และใช้งาน Wallet",
    scope: ["Product website", "Web3 UX", "Multilingual interface"],
    fullUrl: smfiUrl,
    previewUrl: getCloudinaryVideoPreviewUrl(smfiUrl),
    posterUrl: getCloudinaryVideoPosterUrl(smfiUrl),
  },
  {
    id: "realsun",
    title: "RealSun",
    product: "SOLAR DATA & WEB3 PLATFORM",
    responsibilityLabel: "PLATFORM DESIGN · DATA EXPERIENCE · WEB3",
    problem: "ข้อมูลการดำเนินงานด้านพลังงานและประสบการณ์ Wallet อยู่คนละบริบท ทำให้ภาพรวมไม่ชัด",
    responsibility: "ออกแบบโครงสร้างแพลตฟอร์ม การนำเสนอข้อมูล และ Wallet/Web3 experience",
    delivery: "แพลตฟอร์มข้อมูลพลังงานแสงอาทิตย์ที่เชื่อมการดำเนินงานกับประสบการณ์ดิจิทัล",
    scope: ["Platform design", "Data experience", "Wallet & Web3"],
    fullUrl: realSunUrl,
    previewUrl: getCloudinaryVideoPreviewUrl(realSunUrl),
    posterUrl: getCloudinaryVideoPosterUrl(realSunUrl),
  },
];
