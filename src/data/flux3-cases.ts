import { getCloudinaryVideoPosterUrl } from "@/lib/cloudinary";

export type Flux3Case = {
  id: string;
  expanded: boolean;
  title: string;
  videoUrl: string;
  posterUrl: string;
  posterAlt: string;
  visualSummary: string;
  lesson: string;
  reusablePattern: string;
  promptSource?: string;
  fullPrompt?: string;
  transcriptStatus: string;
};

const videoUrls = [
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789977375/final_%E0%B8%9E%E0%B8%B4%E0%B8%86%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%B5%E0%B8%B1%E0%B8%AA%E0%B8%B2%E0%B8%99.mp4",
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789978451/create-a-20-second-thai-3145048883.mp4",
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789977714/%E0%B9%80%E0%B8%97%E0%B9%88.mp4",
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789979128/OP2.mp4",
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789979778/%E0%B8%AA%E0%B8%B8%E0%B8%A3%E0%B8%B2%E0%B8%A9%E0%B8%A9%E0%B8%A9%E0%B8%A9.mp4",
] as const;

const interviewPrompt = `A fifteen-second original Thai television street-interview segment from about 2002, filmed outside an ordinary Bangkok university with a professional MiniDV / Betacam-style ENG camera and later captured from an aging archive tape. 4:3 framing. Play it completely straight as a genuine human-interest report. Use slightly soft PAL video, mild interlacing, tape noise, deep small-sensor depth of field, shoulder-mounted ENG camera, ordinary Thai students, short natural Thai dialogue, real campus and traffic ambience, and no modern cinematic polish. Keep all identities, clothing, microphone placement, and positions stable. End on an awkward loose two-shot held one second longer than a modern edit, then cut abruptly to black.`;

const suratPrompt = `Maintain the exact two adult character identities and reference costume design. The older brother wears a handmade red cloak and has one exposed iridescent titanium-pipe mechanical RIGHT arm; the younger brother remains fully sealed inside oversized rough-welded gray oil-drum armor. Preserve face, age, body proportions, clothing, right-arm placement, armor geometry and color throughout. Authentic original Thai direct-to-VCD fantasy drama circa 1998–2003: faded color, handheld DV camera, light analog noise and scanlines, rural Southern Thailand at dawn. No subtitles or on-screen text. The brothers perform a small roadside ritual, walk through a rubber plantation, and meet a local antagonist. Audio uses original nang talung drums, aged VCD synth, rubber-tree ambience, wind, footsteps and short natural Southern Thai dialogue. Final image: the antagonist fills frame facing the brothers across the dirt road.`;

export const flux3Cases: readonly Flux3Case[] = [
  {
    id: "night-train-fantasy",
    expanded: false,
    title: "รถไฟยามค่ำและโลกแฟนตาซีที่คุมบรรยากาศ",
    videoUrl: videoUrls[0],
    posterUrl: getCloudinaryVideoPosterUrl(videoUrls[0]),
    posterAlt: "ขบวนรถไฟเก่าใต้ดวงจันทร์เต็มดวงในบรรยากาศสีน้ำเงินยามค่ำ",
    visualSummary: "ภาพเปิดใช้ขบวนรถไฟ ดวงจันทร์ และโทนกลางคืนเป็นวัตถุยึดสายตาเดียวกัน เพื่อพาคนดูเข้าสู่โลกแฟนตาซีทันที",
    lesson: "บรรยากาศที่ชัดเกิดจากหลักฐานในเฟรม—เวลา แสง วัตถุหลัก และการเคลื่อน—ไม่ใช่คำว่า cinematic อย่างเดียว",
    reusablePattern: "เวลาและสภาพแสง + วัตถุ Anchor + การเคลื่อนที่อ่านง่าย + Final Image ที่คงโทนเดิม",
    transcriptStatus: "ไม่เผยแพร่ Transcript: ยังไม่มีส่วนเสียงที่ตรวจยืนยันแบบคำต่อคำ",
  },
  {
    id: "archive-campus-interview",
    expanded: true,
    title: "บทสัมภาษณ์มหาวิทยาลัยแบบเทปข่าวยุค 2000",
    videoUrl: videoUrls[1],
    posterUrl: getCloudinaryVideoPosterUrl(videoUrls[1]),
    posterAlt: "นักข่าวหญิงถือไมโครโฟนสัมภาษณ์นักศึกษาสองคนหน้าอาคารมหาวิทยาลัย",
    visualSummary: "งานเลียนภาษาภาพข่าวภาคสนาม 4:3 ด้วยกล้องไหล่ ฉากหลังที่ยังอ่านได้ เครื่องแต่งกาย และจังหวะคนธรรมดาแทนการแสดงแบบโฆษณา",
    lesson: "ระบุระบบบันทึก พฤติกรรมเล็ก ๆ ของผู้พูด และเสียงจากสถานที่จริง จะคุมยุคได้ดีกว่าคำว่า retro",
    reusablePattern: "recording system + ordinary behavior + background evidence + short dialogue + period-correct ending",
    promptSource: "Owner-supplied FLUX3_GOLD_EXAMPLES_EN.md; published here as an abridged authorized teaching prompt",
    fullPrompt: interviewPrompt,
    transcriptStatus: "Prompt มีบทพูด แต่ไม่แสดงเป็น Transcript เพราะยังไม่ได้ตรวจเทียบเสียงจริงแบบคำต่อคำ",
  },
  {
    id: "red-black-anime-combat",
    expanded: true,
    title: "แอ็กชันอนิเมะโทนแดง–ดำที่อ่านแรงปะทะได้",
    videoUrl: videoUrls[2],
    posterUrl: getCloudinaryVideoPosterUrl(videoUrls[2]),
    posterAlt: "นักรบอนิเมะชุดแดงดำถืออาวุธยาวในช็อตเคลื่อนไหวมุมต่ำ",
    visualSummary: "สีแดง ดำ และขาวแบ่งตัวละครออกจากฉาก ส่วนมุมต่ำและเส้นทแยงพาสายตาไปตามอาวุธและทิศทางแรง",
    lesson: "ฉากต่อสู้ต้องมี Geography และลำดับเตรียม–ปะทะ–ฟื้นตัว ไม่ควรแทน Action ทั้งหมดด้วยแสงเอฟเฟกต์",
    reusablePattern: "locked screen direction + one attack per beat + visible contact/reaction + VFX that affects the world",
    transcriptStatus: "ไม่มี Transcript ที่เผยแพร่: Case นี้ใช้สอน Visual Action และยังไม่มีคำพูดที่ตรวจยืนยัน",
  },
  {
    id: "vertical-multi-scene-story",
    expanded: false,
    title: "เรื่องเล่าแนวตั้งหลายฉากที่ต้องคุมจังหวะ",
    videoUrl: videoUrls[3],
    posterUrl: "/course/cases/case-04-poster.svg",
    posterAlt: "โปสเตอร์ตัวอักษรสำหรับ Case 04 งานเล่าเรื่องแนวตั้งหลายฉาก",
    visualSummary: "คลิปแนวตั้งยาวกว่าหนึ่งช็อต เหมาะใช้สังเกตว่าแต่ละ Beat ต้องมีหน้าที่และ Endpoint ก่อนเปลี่ยนฉาก",
    lesson: "เมื่อต้องเล่าหลายเหตุการณ์ ให้ลด Action ต่อ Beat และรักษาจุดโฟกัส ไม่ยัดกล้องหลายแบบในประโยคเดียว",
    reusablePattern: "one beat, one change + motivated camera + explicit endpoint before the next cut",
    transcriptStatus: "ไม่เผยแพร่ Transcript: ยังไม่มีส่วนเสียงที่ตรวจยืนยันแบบคำต่อคำ",
  },
  {
    id: "surat-vcd-brothers",
    expanded: true,
    title: "พี่น้องแฟนตาซี VCD ในสวนยางสุราษฎร์",
    videoUrl: videoUrls[4],
    posterUrl: "/course/cases/case-05-poster.svg",
    posterAlt: "โปสเตอร์ตัวอักษรสำหรับ Case 05 พี่น้องแฟนตาซี VCD ในสวนยางสุราษฎร์",
    visualSummary: "ตัวละครสองพี่น้องถูกล็อกด้วยเสื้อคลุมแดง แขนกล และเกราะถังน้ำมัน ขณะที่โลกภาพใช้กล้อง DV สีซีด และพื้นที่สวนยางเป็นหลักฐานของสถานที่",
    lesson: "ภาพอ้างอิงควรยึด Identity ส่วน Prompt เน้น Motion พร้อมย้ำรายละเอียดที่สลับข้างหรือแปลงรูปง่าย",
    reusablePattern: "reference fixes appearance + prompt directs motion + repeat failure-prone invariant + continuation hook",
    promptSource: "Owner-supplied FLUX3_GOLD_EXAMPLES_EN.md; published here as an abridged authorized teaching prompt",
    fullPrompt: suratPrompt,
    transcriptStatus: "Prompt มีบทพูดภาษาไทย แต่ไม่แสดงเป็น Transcript เพราะยังไม่ได้ตรวจเทียบเสียงจริงแบบคำต่อคำ",
  },
] as const;
