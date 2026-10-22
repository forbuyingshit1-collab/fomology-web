import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CaseVideoButton } from "@/components/course/case-video-button";
import { CopyButton } from "@/components/course/copy-button";
import { CourseProgressBar, CourseProgressProvider, LessonCompletion, ModuleProgress } from "@/components/course/progress";
import { courseLessonIds, courseManifest } from "@/data/course";
import { flux3Cases } from "@/data/flux3-cases";
import release from "@/data/flux3-release.json";
import { loadAllLessons } from "@/lib/course-content";
import { renderCourseMarkdown } from "@/lib/render-course-content";

export const metadata: Metadata = {
  title: "สร้าง AI Video แรกด้วย FLUX.3 — FOMOLOGY Course",
  description: "คอร์สภาษาไทย 3 หมวด 10 บท จากไอเดียสู่ FLUX.3 Prompt, Dry Run และวิดีโอแนวตั้งพร้อมเสียง",
};

const officialLinks = [
  ["OpenAI Skills", "https://learn.chatgpt.com/docs/build-skills"],
  ["BFL FLUX.3 API", "https://docs.bfl.ai/api-reference/utility/generate-a-video-with-flux-3"],
  ["BFL Video Prompting", "https://docs.bfl.ai/guides/prompting_video_overview"],
] as const;

export default async function CoursePage() {
  const lessons = await loadAllLessons();
  const lessonById = new Map(lessons.map((lesson) => [lesson.id, lesson]));

  return <>
    <SiteHeader />
    <main id="main-content" className="course-page">
      <section className="course-hero"><div className="site-container course-hero-grid"><div><p className="eyebrow">FLUX.3 FIRST WIN · FREE COURSE</p><h1>{courseManifest.title}</h1><p className="course-promise">จากไอเดียร้านกาแฟสู่ Prompt, Dry Run และวิดีโอแนวตั้งพร้อมเสียง—โดย API key และไฟล์งานอยู่ในเครื่องของคุณเท่านั้น</p><div className="course-hero-actions"><a className="button button-blue" href="#module-understand">เริ่มบทที่ 1</a><Link className="text-link text-link-blue" href={release.resourcePath}>ดาวน์โหลด Prompt Skill →</Link></div></div><div className="course-meta" aria-label="รายละเอียดคอร์ส"><span><strong>3</strong> หมวด</span><span><strong>10</strong> บท</span><span><strong>8–10s</strong> First Win</span><small>ครั้งแรก {courseManifest.firstRunMinutes}<br />ครั้งถัดไป {courseManifest.repeatRunMinutes}</small></div></div></section>

      <section className="course-preflight"><div className="site-container preflight-grid"><div><p className="eyebrow">BEFORE YOU START</p><h2>อ่านบนมือถือได้<br />ลงมือจริงบน Windows</h2><p>การติดตั้งและ Generate รองรับเส้นทาง Windows 10/11 + Codex Desktop + PowerShell 5.1 ขึ้นไป การ Submit ใช้เครดิต BFL และต้องอนุมัติด้วยตัวเอง</p></div><ul aria-label="รายการเตรียมพร้อม"><li>Windows 10/11 และเวลา 30–45 นาที</li><li>Codex Desktop</li><li>BFL account, API key และเครดิต</li><li>ไม่วาง API key ใน Chat, Prompt หรือไฟล์</li></ul></div></section>

      <CourseProgressProvider lessonIds={[...courseLessonIds]} storageKey={courseManifest.progressStorageKey}>
        <CourseProgressBar total={courseLessonIds.length} />
        <section className="course-reading section-spacing"><div className="site-container course-reading-grid">
          <aside className="course-toc" aria-label="สารบัญคอร์ส"><p className="mono-label">COURSE MAP</p>{courseManifest.modules.map((module) => <div key={module.id}><a href={`#module-${module.id}`}><span>0{module.number}</span>{module.title}</a><ol>{module.lessons.map((lesson) => <li key={lesson.id}><a href={`#lesson-${lesson.id}`}>{String(lesson.number).padStart(2, "0")} · {lesson.title}</a></li>)}</ol></div>)}</aside>
          <div className="course-reading-main">
            <details className="mobile-course-toc"><summary>เปิดสารบัญ 10 บท</summary><nav aria-label="สารบัญคอร์สบนมือถือ">{courseManifest.modules.map((module) => <div key={module.id}><strong>หมวด {module.number} · {module.title}</strong>{module.lessons.map((lesson) => <a key={lesson.id} href={`#lesson-${lesson.id}`}>{String(lesson.number).padStart(2, "0")} · {lesson.title}</a>)}</div>)}</nav></details>
            {courseManifest.modules.map((module) => <section className="course-module" id={`module-${module.id}`} key={module.id} aria-labelledby={`module-title-${module.id}`}><header className="module-header"><div><p className="eyebrow">MODULE {String(module.number).padStart(2, "0")}</p><h2 id={`module-title-${module.id}`}>{module.title}</h2></div><ModuleProgress lessonIds={module.lessons.map((lesson) => lesson.id)} /></header>
              {module.lessons.map((manifestLesson) => { const lesson = lessonById.get(manifestLesson.id); if (!lesson) throw new Error(`Missing lesson ${manifestLesson.id}`); return <article className="lesson" id={`lesson-${lesson.id}`} key={lesson.id}><header className="lesson-header"><span className="lesson-number">{String(lesson.number).padStart(2, "0")}</span><div><p className="mono-label">{lesson.minutes} MIN · GUIDED PROJECT</p><h2>{lesson.title}</h2></div></header><div className="lesson-content">{renderCourseMarkdown(lesson.markdown, lesson.id)}</div><LessonCompletion id={lesson.id} label={lesson.completionLabel} /></article>; })}
              <div className="module-milestone"><span aria-hidden="true">✓</span><div><strong>Milestone หมวด {module.number}</strong><p>{module.milestone}</p></div></div>
            </section>)}
          </div>
        </div></section>
      </CourseProgressProvider>

      <section className="case-library section-spacing" id="case-library" aria-labelledby="case-library-title"><div className="site-container"><div className="section-intro"><div><p className="eyebrow">FLUX.3 CASE LIBRARY</p><h2 id="case-library-title">ดู Pattern<br />ไม่ลอกสไตล์</h2></div><p>คลิปจริงห้าชิ้นโหลดวิดีโอเมื่อคุณกด Play เท่านั้น Prompt ไม่ใช่ Transcript และเราจะไม่ตีความบทพูดจาก Prompt ว่าเกิดขึ้นจริงใน Result</p></div><div className="case-grid">{flux3Cases.map((item, index) => <article className={item.expanded ? "case-card expanded" : "case-card"} key={item.id}><CaseVideoButton id={item.id} title={item.title} videoUrl={item.videoUrl} posterUrl={item.posterUrl} posterAlt={item.posterAlt} /><div className="case-copy"><p className="mono-label">CASE {String(index + 1).padStart(2, "0")} · {item.expanded ? "EXPANDED" : "ADDITIONAL"}</p><h3>{item.title}</h3><dl><div><dt>Visual summary</dt><dd>{item.visualSummary}</dd></div><div><dt>Prompt นี้สอนอะไร</dt><dd>{item.lesson}</dd></div><div><dt>Reusable pattern</dt><dd><code>{item.reusablePattern}</code></dd></div></dl><p className="transcript-note">{item.transcriptStatus}</p>{item.fullPrompt ? <details className="case-prompt"><summary>เปิด Teaching Prompt</summary><p className="case-source">{item.promptSource}</p><div className="course-code"><div className="course-code-head"><span>prompt</span><CopyButton text={item.fullPrompt} /></div><pre><code>{item.fullPrompt}</code></pre></div></details> : null}<a className="text-link text-link-blue" href={item.videoUrl} target="_blank" rel="noopener noreferrer">เปิดไฟล์บน Cloudinary ↗</a></div></article>)}</div></div></section>

      <section className="first-win-finish section-spacing"><div className="site-container finish-grid"><div><p className="eyebrow">FIRST WIN CHECK</p><h2>คุณไปถึง First Win เมื่อ…</h2></div><ol><li>มี Direction Lock และ Final Prompt ที่ผ่าน Audit</li><li>Dry Run ผ่านด้วย t2v · 9:16 · 8–10s · hd · draft · audio</li><li>เห็น Prompt/Settings และกดอนุมัติ Paid Submit เอง</li><li>ดาวน์โหลด MP4, Result JSON และ Draft Cache ที่มี</li><li>บันทึก Success, Defect และ Next Change อย่างละหนึ่งข้อ</li></ol><Link className="button button-on-blue" href={release.resourcePath}>ไปหน้า Prompt Skill</Link></div></section>

      <section className="course-sources section-spacing"><div className="site-container"><p className="eyebrow">SOURCES & REVIEW</p><h2>เอกสารทางการและวันที่ตรวจ</h2><ul>{officialLinks.map(([label, href]) => <li key={href}><a href={href} target="_blank" rel="noopener noreferrer">{label} ↗</a></li>)}</ul><p>ตรวจ BFL และ OpenAI ล่าสุดเมื่อ <strong>{release.bflVerifiedAt}</strong> · เนื้อหาและตัวอย่างอ้างอิงจาก Source Material ของเจ้าของ · Visual Skills attribution อยู่ใน Skill Package</p><p className="privacy-note">เว็บไซต์เก็บเฉพาะ Lesson IDs ใน Local Storage ไม่มีช่องรับ API key, Prompt, Payload, Video หรือ Draft Cache และความคืบหน้าไม่ Sync ข้ามอุปกรณ์</p></div></section>
    </main>
    <SiteFooter />
  </>;
}
