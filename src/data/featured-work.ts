import { resultImages, showcaseClips } from "@/data/media";
import { clientWorks } from "@/data/client-work";

function excerpt(url: string) {
  return url.replace("/video/upload/", "/video/upload/so_0,du_8,ac_none,w_960,c_limit,q_auto:good,f_mp4/");
}

export const featuredWorks = [
  {
    id: "fantasy", category: "AI VIDEO / RECORDED RESULT", title: "ทะลุ 1.23 ล้านวิวใน 30 ชั่วโมง",
    description: "คลิปแฟนตาซีไทย จากไอเดียสู่เรื่องเล่าที่คนหยุดดู", outcome: "1.23M", outcomeLabel: "วิวใน 30 ชั่วโมง",
    poster: "/media/featured/fantasy.jpg", fullUrl: showcaseClips[0].fullUrl, previewUrl: excerpt(showcaseClips[0].fullUrl),
    sourceLabel: "ดูภาพสถิติ", sourceImage: resultImages[1].src,
    sourceAlt: resultImages[1].alt,
  },
  {
    id: "chatbot", category: "SYSTEMS & AUTOMATION / CLIENT WORK", title: "แชต สินค้า และหลังบ้าน ในระบบเดียว",
    description: "บ้านรวมทะเล Chat Bot เชื่อมงานขายเข้ากับงานแอดมิน", outcome: "2–3 คน", outcomeLabel: "รองรับภาระงานแอดมินเดิม ตามรายงานลูกค้า",
    poster: "/media/featured/chatbot.jpg", fullUrl: clientWorks[0].fullUrl, previewUrl: excerpt(clientWorks[0].fullUrl),
    sourceLabel: "ดูการทำงานจริง", sourceImage: null, sourceAlt: null,
  },
  {
    id: "realsun", category: "WEBSITE & PLATFORM / CLIENT WORK", title: "จากข้อมูลพลังงาน สู่ประสบการณ์ที่ใช้งานได้",
    description: "RealSun ออกแบบแพลตฟอร์มข้อมูลและประสบการณ์ Web3", outcome: "RealSun", outcomeLabel: "Platform design · Data experience · Web3",
    poster: "/media/featured/realsun.jpg", fullUrl: clientWorks[3].fullUrl, previewUrl: excerpt(clientWorks[3].fullUrl),
    sourceLabel: "ดูการทำงานจริง", sourceImage: null, sourceAlt: null,
  },
] as const;
