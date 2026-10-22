import { readFile } from "node:fs/promises";
import path from "node:path";
import { courseLessons, type CourseLesson } from "@/data/course";

export const requiredLessonSections = [
  "บทนี้คุณจะได้อะไร",
  "เข้าใจใน 1 นาที",
  "ทำตามทีละขั้น",
  "ตัวอย่างไม่ดี / ดีขึ้นอย่างไร",
  "ลองทำ",
  "เช็กก่อนผ่าน",
  "ลิงก์และอ่านเพิ่ม",
] as const;

export type LoadedLesson = CourseLesson & { markdown: string };

export async function loadLesson(lesson: CourseLesson): Promise<LoadedLesson> {
  const filename = path.join(process.cwd(), "src", "content", "course", lesson.file);
  const markdown = await readFile(filename, "utf8");
  const sections = [...markdown.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
  if (sections.length !== requiredLessonSections.length || sections.some((section, index) => section !== requiredLessonSections[index])) {
    throw new Error(`${lesson.file}: lesson sections must match the required seven-section order`);
  }
  return { ...lesson, markdown };
}

export async function loadAllLessons(): Promise<LoadedLesson[]> {
  return Promise.all(courseLessons.map(loadLesson));
}

