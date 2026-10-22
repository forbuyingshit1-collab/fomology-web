import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LearningHero } from "@/components/learning-hero";
import { PracticeExplorer } from "@/components/practice-explorer";
import { OutcomeEvidence } from "@/components/outcome-evidence";
import { PageMotion } from "@/components/page-motion";
import { courseLessons, courseManifest } from "@/data/course";
import { posts } from "@/data/blog";
import { fastworkUrl } from "@/data/site";
import "./learning-home.css";
import "./work-motion.css";

const reading = ["turning-knowledge-into-action", "personal-expense-app", "notebooklm-expert-notes"]
  .map((slug) => posts.find((post) => post.slug === slug))
  .filter((post) => post !== undefined);

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" className="learning-page">
        <LearningHero />
        <OutcomeEvidence />
        <section id="showcase" className="learn-section practice-section" aria-labelledby="practice-heading">
          <div className="learn-container">
            <div className="learn-section-heading" data-enter>
              <h2 id="practice-heading">ไอเดียเดียว<br />เป็นไปได้อีกหลายแบบ<span className="learn-red">.</span></h2>
              <p>จากงานที่คนมองเห็น สู่ระบบที่ช่วยอยู่เบื้องหลัง<br className="learn-desktop-break" />เลือกดูสิ่งที่เราลงมือสร้างจริง</p>
            </div>
            <PracticeExplorer />
          </div>
        </section>
        <section id="choose-path" className="learn-section path-section" aria-labelledby="path-heading">
          <div className="learn-container"><div className="learn-section-heading" data-enter><h2 id="path-heading">จากตรงนี้<br />เลือกทางที่เป็นคุณ<span className="learn-red">.</span></h2><p>อยากเรียนรู้เพื่อลงมือเอง<br />หรือมีโจทย์ที่อยากให้เราช่วยทำ</p></div>
            <div className="path-grid">
              <article className="path-card" data-enter><span className="path-symbol" aria-hidden="true">↗</span><p className="learn-kicker">LEARN WITH US</p><h3>อยากทำเอง<br />มาเรียนรู้ด้วยกัน</h3><p>คอร์สภาษาไทย เริ่มจากโจทย์เล็ก ๆ<br />ค่อย ๆ ทำตามจนได้ผลงานของตัวเอง</p><a href="#courses" className="learn-button learn-button-choice">ดูคอร์สเรียน <span aria-hidden="true">↗</span></a></article>
              <article className="path-card" data-enter><span className="path-symbol" aria-hidden="true">↗</span><p className="learn-kicker">WORK WITH US</p><h3>มีโจทย์อยู่แล้ว<br />ให้เราช่วยลงมือ</h3><p>AI Video เว็บไซต์ ระบบ และ Automation<br />ดูผลงานและคุยรายละเอียดงานผ่าน Fastwork</p><a href={fastworkUrl} target="_blank" rel="noopener noreferrer" className="learn-button learn-button-choice">จ้างงานผ่าน Fastwork <span aria-hidden="true">↗</span><span className="sr-only"> (เปิดแท็บใหม่)</span></a></article>
            </div>
          </div>
        </section>
        <section id="courses" className="learn-section course-discovery" aria-labelledby="courses-heading">
          <div className="learn-container">
            <div className="learn-section-heading course-section-heading" data-enter>
              <div><p className="learn-kicker">A LITTLE LESS FOMO. A LOT MORE MAKING.</p><h2 id="courses-heading">ไม่ต้องรู้ทุกอย่าง<br />ก็เริ่มทำสักอย่างได้</h2></div>
              <p>เริ่มจากคอร์สที่พาคุณทำตามทีละขั้น<br className="learn-desktop-break" />ด้วยภาษาง่าย ๆ และโจทย์ที่จับต้องได้</p>
            </div>
            <article className="learn-course-card" data-enter>
              <div className="learn-course-visual">
                <Image src="/editorial/idea-to-video.webp" alt="ภาพประกอบแนวคิดจากไอเดียสู่การสร้างวิดีโอ" fill sizes="(max-width: 760px) 100vw, 42vw" />
                <span className="learn-free-badge">คอร์สฟรี</span>
                <div className="learn-course-cover-label"><span>YOUR FIRST AI VIDEO</span><strong>จาก “อยากลอง”<br />เป็น “ทำได้แล้ว”</strong></div>
              </div>
              <div className="learn-course-content">
                <span className="learn-course-format">เรียนด้วยตัวเอง · ภาษาไทย · เริ่มต้น</span>
                <h3>{courseManifest.title}</h3>
                <p>เริ่มจากไอเดียเล็ก ๆ ของร้านกาแฟ เรียนรู้การเขียน Prompt เตรียมเครื่องมือ และค่อย ๆ สร้างวิดีโอแรกของคุณ</p>
                <div className="learn-course-facts">
                  <span><strong>{courseManifest.modules.length} หมวด</strong>เรียนเป็นขั้นตอน</span>
                  <span><strong>{courseLessons.length} บท</strong>อ่านแล้วลองทำ</span>
                  <span><strong>{courseManifest.firstRunMinutes}</strong>สำหรับเริ่มครั้งแรก</span>
                </div>
                <details className="learn-syllabus">
                  <summary>ในคอร์สนี้จะได้เรียนอะไร <span aria-hidden="true">+</span></summary>
                  <ol>{courseManifest.modules.map((module) => <li key={module.id}><span>{module.number}</span>{module.title}</li>)}</ol>
                </details>
                <div className="learn-course-action"><Link href="/course" className="learn-button learn-button-red">เข้าเรียนฟรี <span aria-hidden="true">↗</span></Link><span>เปิดอ่านได้เลย ไม่ต้องสมัคร</span></div>
                <small className="learn-course-note">เนื้อหาเรียนฟรี การสร้างวิดีโอใช้บัญชีและเครดิต BFL ของคุณ</small>
              </div>
            </article>
          </div>
        </section>
        <section className="learn-section field-notes" aria-labelledby="notes-heading">
          <div className="learn-container">
            <div className="learn-section-heading" data-enter><div><h2 id="notes-heading">สิ่งที่ลอง สิ่งที่ได้เรียนรู้</h2><p className="learn-heading-note">บันทึกระหว่างทาง เผื่อเป็นจุดเริ่มต้นของคุณ</p></div><Link href="/blog" className="learn-inline-link">อ่านทั้งหมด <span aria-hidden="true">↗</span></Link></div>
            <div className="learn-notes-grid">{reading.map((post) => <Link key={post.slug} href={`/blog/${post.slug}`} className="learn-note-card"><div className="learn-note-image"><Image src={post.image} alt="" fill sizes="(max-width: 760px) 90vw, 30vw" /></div><span className="learn-note-category">{post.category.split(" / ")[0]}</span><h3>{post.title}</h3><span className="learn-note-link">อ่านเรื่องนี้ <span aria-hidden="true">↗</span></span></Link>)}</div>
          </div>
        </section>
        <section className="learn-section learn-destinations" aria-labelledby="next-step-heading">
          <div className="learn-container">
            <div className="learn-teacher-line"><Image src="/brand/fomology-logo.jpg" alt="" width={44} height={44} /><p>ลองจริง ทำจริง แล้วมาเรียนรู้ด้วยกัน<span>Anantasak Charoensuk · FOMOLOGY</span></p></div>
            <div className="learn-destination-grid">
              <div className="learn-destination-primary" data-enter><h2 id="next-step-heading">ไอเดียถัดไป<br />อาจเป็นของคุณ<span className="learn-red">.</span></h2><p>อยากเรียนรู้เพื่อลงมือเอง<br />เริ่มจากก้าวเล็ก ๆ ด้วยกัน</p><Link href="/course" className="learn-button learn-button-choice">เริ่มเรียนคอร์สฟรี <span aria-hidden="true">↗</span></Link></div>
              <aside className="learn-hire-card" aria-labelledby="hire-heading" data-enter><span className="learn-hire-icon" aria-hidden="true">↗</span><p className="learn-kicker">LET’S WORK TOGETHER</p><h3 id="hire-heading">มีโจทย์<br />อยากให้ช่วยทำ?</h3><p>AI Video เว็บไซต์ ระบบ และ Automation<br />ดูผลงานและคุยรายละเอียดงานได้ที่ Fastwork</p><a href={fastworkUrl} target="_blank" rel="noopener noreferrer" className="learn-button learn-button-choice">จ้างงานผ่าน Fastwork <span aria-hidden="true">↗</span><span className="sr-only"> (เปิดแท็บใหม่)</span></a><span className="learn-hire-handle">fastwork.com/user/anan</span></aside>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <PageMotion />
    </>
  );
}
