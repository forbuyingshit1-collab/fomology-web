"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { fastworkUrl } from "@/data/site";
import { featuredWorks } from "@/data/featured-work";
import { showcaseClips } from "@/data/media";
import { clientWorks } from "@/data/client-work";
import { MediaDialog } from "@/components/media-dialog";
import type { MediaDialogData } from "@/components/media-dialog";

const practices = [
  {
    id: "video", title: "AI Video", thai: "เล่าเรื่องด้วยภาพเคลื่อนไหว", description: "จากประโยคในหัว สู่ฉาก ตัวละคร และเรื่องเล่าที่มองเห็นได้", label: "MADE WITH FOMOLOGY", learning: "เริ่มทำ AI Video แรก", href: "/course", learningNote: "มีคอร์สฟรีให้ลองทำตามทีละขั้น", works: showcaseClips,
  },
  {
    id: "websites", title: "Websites", thai: "สร้างพื้นที่ให้ไอเดีย", description: "ออกแบบข้อมูลและประสบการณ์ ให้คนเข้าใจสิ่งที่เราต้องการเล่า", label: "WEBSITE & PRODUCT WORK", learning: "อ่านเรื่องการเรียนรู้จากงานจริง", href: "/blog/turning-knowledge-into-action", learningNote: "เบื้องหลังการเรียนรู้และลงมือสร้าง", works: [clientWorks[3], clientWorks[1], clientWorks[2]],
  },
  {
    id: "automation", title: "Automation", thai: "ให้เครื่องมือช่วยงานซ้ำ ๆ", description: "เชื่อมขั้นตอนและข้อมูล ให้มีเวลาไปทำสิ่งที่สำคัญกว่า", label: "SYSTEMS & WORKFLOWS", learning: "อ่านเบื้องหลังแอปรายรับรายจ่าย", href: "/blog/personal-expense-app", learningNote: "บันทึกการทดลองใช้ AI และ n8n", works: [clientWorks[0], clientWorks[1]],
  },
];

function posterFor(work: { fullUrl: string; posterUrl: string }) {
  return featuredWorks.find((featured) => featured.fullUrl === work.fullUrl)?.poster ?? work.posterUrl;
}

export function PracticeExplorer() {
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [workIndex, setWorkIndex] = useState(0);
  const [media, setMedia] = useState<MediaDialogData | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mediaTrigger = useRef<HTMLButtonElement | null>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const activeIndex = useRef(0);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const practice = practices[practiceIndex];
  const work = practice.works[workIndex];

  const activate = useCallback((index: number) => {
    if (activeIndex.current === index) return;
    activeIndex.current = index;
    setPracticeIndex(index);
    setWorkIndex(0);
  }, []);

  useEffect(() => {
    const story = storyRef.current;
    const sticky = stickyRef.current;
    if (!story || !sticky) return;
    const preference = window.matchMedia("(min-width: 1101px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const update = () => {
      frame = 0;
      story.dataset.scrollMode = preference.matches ? "sticky" : "flow";
      if (!preference.matches) return;
      const travel = story.offsetHeight - sticky.offsetHeight - 120;
      const progress = Math.max(0, Math.min(1, (120 - story.getBoundingClientRect().top) / Math.max(1, travel)));
      if (story.getBoundingClientRect().top < window.innerHeight) activate(Math.min(practices.length - 1, Math.floor(progress * practices.length)));
      story.style.setProperty("--practice-progress", String(progress));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    update();
    return () => { window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); preference.removeEventListener("change", schedule); window.cancelAnimationFrame(frame); };
  }, [activate]);

  function selectPractice(index: number) {
    activate(index);
    const story = storyRef.current;
    const sticky = stickyRef.current;
    if (story?.dataset.scrollMode === "sticky" && sticky) {
      const travel = story.offsetHeight - sticky.offsetHeight - 120;
      const top = window.scrollY + story.getBoundingClientRect().top - 120 + travel * (index + 0.12) / practices.length;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      suppressClick.current = true;
      selectPractice((practiceIndex + (dx < 0 ? 1 : practices.length - 1)) % practices.length);
    }
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % practices.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + practices.length - 1) % practices.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = practices.length - 1;
    else return;
    event.preventDefault();
    selectPractice(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <>
      <div ref={storyRef} className="practice-story"><div ref={stickyRef} className="practice-sticky"><div className="practice-explorer">
        <div className="practice-index" role="tablist" aria-label="เลือกประเภทผลงาน">{practices.map((item, index) => <button key={item.id} ref={(element) => { tabRefs.current[index] = element; }} type="button" role="tab" id={`practice-tab-${item.id}`} aria-selected={practiceIndex === index} aria-controls="practice-panel" tabIndex={practiceIndex === index ? 0 : -1} onClick={() => selectPractice(index)} onKeyDown={(event) => handleTabKey(event, index)}><span>{item.title}</span><small>{item.thai}</small><span className="practice-index-arrow" aria-hidden="true">↗</span></button>)}</div>
        <div className="practice-panel" role="tabpanel" id="practice-panel" aria-labelledby={`practice-tab-${practice.id}`} tabIndex={0}
          onPointerDown={(event) => { suppressClick.current = false; if (event.pointerType === "touch") gesture.current = { x: event.clientX, y: event.clientY }; }}
          onPointerUp={finishSwipe} onPointerCancel={() => { gesture.current = null; }}
          onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
          <div className="practice-profile"><div className="practice-profile-name"><Image src="/brand/fomology-logo.jpg" alt="" width={46} height={46} /><div><strong>FOMOLOGY<span className="learn-red">.</span></strong><span>เรียนรู้จากการลงมือทำ</span></div></div><span className="practice-profile-label">{practice.label}</span></div>
          <div key={practice.id} className="practice-description"><h3>{practice.thai}</h3><p>{practice.description}</p></div>
          <div className="practice-work-layout">
            <div className="practice-main-work"><button ref={mediaTrigger} type="button" className="practice-play" onClick={() => setMedia({ type: "video", id: work.id, title: work.title, fullUrl: work.fullUrl })} aria-label={`เล่นวิดีโอ ${work.title}`}><Image key={work.id} src={posterFor(work)} alt={work.title} fill sizes="(max-width: 760px) 85vw, 48vw" /><span className="practice-play-icon" aria-hidden="true">▶</span><span className="practice-play-caption">ดูวิดีโอผลงาน <span aria-hidden="true">↗</span></span></button><div className="practice-work-caption" aria-live="polite"><strong>{work.title}</strong><span>ผลงานผู้สอน</span></div></div>
            <div className="practice-work-sidebar"><div className="practice-work-choices" aria-label="เลือกตัวอย่างผลงาน">{practice.works.map((item, index) => <button type="button" key={item.id} aria-pressed={workIndex === index} onClick={() => setWorkIndex(index)}><div><Image src={posterFor(item)} alt="" fill sizes="90px" /><span aria-hidden="true">▶</span></div><span>{item.title}</span></button>)}</div><div className="practice-learning-link"><span>อยากลองทำเอง?</span><strong>{practice.learningNote}</strong><Link href={practice.href}>{practice.learning} <span aria-hidden="true">↗</span></Link></div></div>
          </div>
          <div className="practice-next-steps"><Link href={practice.href}>เรียนรู้จากงานนี้ <span aria-hidden="true">↗</span></Link><a href={fastworkUrl} target="_blank" rel="noopener noreferrer">อยากให้เราช่วยทำ <span aria-hidden="true">↗</span></a></div>
          <p className="practice-source-note">ตัวอย่างผลงานของ FOMOLOGY</p>
        </div>
      </div></div></div>
      <MediaDialog data={media} onClose={() => setMedia(null)} triggerRef={mediaTrigger} />
    </>
  );
}
