export type CourseLesson = {
  id: string;
  number: number;
  title: string;
  file: string;
  minutes: number;
  completionLabel: string;
  reviewedAt: string;
};

export type CourseModule = {
  id: string;
  number: number;
  title: string;
  milestone: string;
  lessons: readonly CourseLesson[];
};

export type CourseManifest = {
  status: "RELEASE_CANDIDATE";
  id: string;
  title: string;
  firstRunMinutes: string;
  repeatRunMinutes: string;
  output: string;
  progressStorageKey: string;
  reviewedAt: string;
  modules: readonly CourseModule[];
};

export const courseManifest = {
  status: "RELEASE_CANDIDATE",
  id: "flux3-first-win-v2",
  title: "สร้าง AI Video แรกด้วย FLUX.3",
  firstRunMinutes: "30–45 นาที",
  repeatRunMinutes: "ประมาณ 15 นาที",
  output: "วิดีโอแนวตั้ง 8–10 วินาที พร้อมเสียงและไฟล์ MP4",
  progressStorageKey: "fomology-flux3-first-win-v2",
  reviewedAt: "2026-09-28",
  modules: [
    {
      id: "understand",
      number: 1,
      title: "เข้าใจระบบก่อนเสียเครดิต",
      milestone: "คุณเลือกโหมดได้ และมอง Prompt เป็นใบกำกับฉาก ไม่ใช่คาถา",
      lessons: [
        { id: "model-decision", number: 1, title: "AI Video คือการเลือกโมเดลให้ตรงงาน", file: "01-model-decision.md", minutes: 4, completionLabel: "ฉันบอกเป้าหมายคลิปร้านกาแฟและยอมรับว่า Generation มีค่าใช้จ่าย", reviewedAt: "2026-09-28" },
        { id: "prompt-shooting-brief", number: 2, title: "Prompt คือใบกำกับฉาก", file: "02-prompt-shooting-brief.md", minutes: 5, completionLabel: "ฉันชี้ Action และ Final Image ของฉากร้านกาแฟได้", reviewedAt: "2026-09-28" },
        { id: "skill-not-template", number: 3, title: "Prompt Skill คือระบบ ไม่ใช่ Template", file: "03-skill-not-template.md", minutes: 4, completionLabel: "ฉันเข้าใจว่า Skill จะถามสิ่งที่ขาดก่อนสร้าง Prompt", reviewedAt: "2026-09-28" },
        { id: "choose-mode", number: 4, title: "เลือกโหมด FLUX.3 ให้ถูก", file: "04-choose-mode.md", minutes: 4, completionLabel: "ฉันเลือก t2v เพราะโปรเจกต์นี้เริ่มจากข้อความและไม่มีสื่อต้นฉบับ", reviewedAt: "2026-09-28" },
      ],
    },
    {
      id: "prepare",
      number: 2,
      title: "เตรียมเครื่องมืออย่างปลอดภัย",
      milestone: "Codex มองเห็น Skill และคุณรู้เส้นแบ่งว่า API key ต้องอยู่ในเครื่องเท่านั้น",
      lessons: [
        { id: "safe-setup", number: 5, title: "เตรียม Codex และ BFL อย่างปลอดภัย", file: "05-safe-setup.md", minutes: 4, completionLabel: "ฉันมีเครื่องมือ บัญชี เครดิต และเข้าใจขอบเขต Secret", reviewedAt: "2026-09-28" },
        { id: "install-skill", number: 6, title: "ดาวน์โหลดและติดตั้ง Prompt Skill", file: "06-install-skill.md", minutes: 6, completionLabel: "Codex แสดงและเรียก $create-flux3-video ได้", reviewedAt: "2026-09-28" },
      ],
    },
    {
      id: "create",
      number: 3,
      title: "สร้าง First Win",
      milestone: "คุณมี MP4 พร้อมเสียง บันทึกสิ่งที่ดีหนึ่งข้อ และรู้ว่าจะเปลี่ยนอะไรเพียงหนึ่งอย่าง",
      lessons: [
        { id: "direction-lock", number: 7, title: "ล็อกทิศทางของร้านกาแฟ", file: "07-direction-lock.md", minutes: 5, completionLabel: "ฉันมี Direction Lock ครบ Viewer, Platform, Action, Camera, Sound และ Final Image", reviewedAt: "2026-09-28" },
        { id: "build-audit-prompt", number: 8, title: "สร้างและตรวจ Final Prompt", file: "08-build-audit-prompt.md", minutes: 6, completionLabel: "Final Prompt ผ่าน Quality Gate และแสดงความเสี่ยงที่ยังเหลือ", reviewedAt: "2026-09-28" },
        { id: "dry-run-generate", number: 9, title: "Dry Run แล้วค่อย Generate", file: "09-dry-run-generate.md", minutes: 7, completionLabel: "ฉันตรวจ Dry Run อนุมัติแบบชัดเจน และดาวน์โหลด MP4 กับ Draft Cache ที่มี", reviewedAt: "2026-09-28" },
        { id: "review-learn", number: 10, title: "ทบทวนผลและเรียนรู้ทีละการเปลี่ยน", file: "10-review-learn.md", minutes: 5, completionLabel: "ฉันบันทึกสิ่งที่สำเร็จ ข้อบกพร่อง และการเปลี่ยนครั้งถัดไปอย่างละหนึ่งข้อ", reviewedAt: "2026-09-28" },
      ],
    },
  ],
} as const satisfies CourseManifest;

export const courseLessons: readonly CourseLesson[] = courseManifest.modules.reduce<CourseLesson[]>(
  (lessons, module) => [...lessons, ...module.lessons],
  [],
);
export const courseLessonIds = courseLessons.map((lesson) => lesson.id);
