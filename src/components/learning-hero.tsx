"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { featuredWorks } from "@/data/featured-work";
import { fastworkUrl } from "@/data/site";
import { MediaDialog } from "@/components/media-dialog";
import type { MediaDialogData } from "@/components/media-dialog";

export function LearningHero() {
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const [media, setMedia] = useState<MediaDialogData | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaTrigger = useRef<HTMLElement | null>(null);
  const gesture = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const active = featuredWorks[selected];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !paused && !media && !motion.matches && !document.hidden) {
        video.play().catch(() => undefined);
      } else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    }, { threshold: 0.35 });
    observer.observe(video);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      video.pause();
    };
  }, [selected, paused, media]);

  function choose(index: number) {
    setSelected((index + featuredWorks.length) % featuredWorks.length);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight") { event.preventDefault(); choose(selected + 1); }
    else if (event.key === "ArrowLeft") { event.preventDefault(); choose(selected - 1); }
    else if (event.key === "Home") { event.preventDefault(); choose(0); }
    else if (event.key === "End") { event.preventDefault(); choose(featuredWorks.length - 1); }
    else return;
    event.currentTarget.focus({ preventScroll: true });
  }

  function finishSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = gesture.current;
    gesture.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      suppressClick.current = true;
      choose(selected + (dx < 0 ? 1 : -1));
    }
  }

  function openVideo(index: number, trigger: HTMLElement) {
    if (index !== selected) { choose(index); return; }
    mediaTrigger.current = trigger;
    setMedia({ type: "video", id: active.id, title: active.title, fullUrl: active.fullUrl });
  }

  return (
    <section className="work-hero" aria-labelledby="learn-title">
      <div className="work-hero-heading">
        <p className="learn-kicker"><span />FOMOLOGY / IDEAS INTO REAL WORK</p>
        <h1 id="learn-title"><span className="work-title-phrase">ผลงานจริง<span className="learn-red">.</span></span>{" "}<span className="work-title-phrase">ผลลัพธ์จริง<span className="learn-red">.</span></span></h1>
        <p>AI Video เว็บไซต์ และระบบที่เราลงมือสร้าง<br />อยากเรียนทำเอง หรืออยากให้เราช่วยทำ เลือกได้เลย</p>
      </div>

      <div className="case-carousel" role="region" aria-roledescription="คารูเซล" aria-label="เคสผลงานเด่น" tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={(event) => { suppressClick.current = false; if (event.pointerType === "touch") gesture.current = { x: event.clientX, y: event.clientY }; }}
        onPointerUp={finishSwipe} onPointerCancel={() => { gesture.current = null; }}
        onClickCapture={(event) => { if (suppressClick.current) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false; } }}>
        <div className="case-carousel-stage">
          {featuredWorks.map((work, index) => {
            const position = index === selected ? "center" : index === (selected + 1) % featuredWorks.length ? "right" : "left";
            return (
              <article key={work.id} className={`case-card case-card-${position}`} aria-hidden={index !== selected}>
                <button type="button" className="case-card-open" tabIndex={index === selected ? 0 : -1}
                  onClick={(event) => openVideo(index, event.currentTarget)} aria-label={index === selected ? `ดูวิดีโอเต็ม ${work.title}` : `เลือกเคส ${work.title}`}>
                  <div className="case-card-media">
                    <Image src={work.poster} alt="" fill sizes="(max-width: 760px) 82vw, 620px" priority={index === 0} />
                    {index === selected && <video key={work.id} ref={videoRef} className="hero-preview-video" src={work.previewUrl} poster={work.poster} muted loop playsInline preload="metadata" aria-hidden="true" onError={(event) => { event.currentTarget.style.opacity = "0"; }} />}
                    <span className="case-watch"><span aria-hidden="true">▶</span> ดูผลงานเต็ม</span>
                  </div>
                  <div className="case-card-copy"><span>{work.category}</span><h2>{work.title}</h2><p>{work.description}</p></div>
                </button>
                <div className="case-card-outcome"><div><strong>{work.outcome}</strong><span>{work.outcomeLabel}</span></div>
                  {work.sourceImage ? <button type="button" tabIndex={index === selected ? 0 : -1} onClick={(event) => { mediaTrigger.current = event.currentTarget; setMedia({ type: "image", id: "fantasy-proof", title: "1.23 ล้านวิวใน 30 ชั่วโมง", src: work.sourceImage, alt: work.sourceAlt }); }}>{work.sourceLabel} <span aria-hidden="true">↗</span></button> : <button type="button" tabIndex={index === selected ? 0 : -1} onClick={(event) => openVideo(index, event.currentTarget)}>{work.sourceLabel} <span aria-hidden="true">↗</span></button>}
                </div>
              </article>
            );
          })}
        </div>
        <button type="button" className="case-carousel-arrow case-carousel-prev" aria-label="ดูเคสก่อนหน้า" onClick={() => choose(selected - 1)}>←</button>
        <button type="button" className="case-carousel-arrow case-carousel-next" aria-label="ดูเคสถัดไป" onClick={() => choose(selected + 1)}>→</button>
        <div className="case-carousel-controls">
          <div className="case-carousel-dots" aria-label="เลือกเคส">{featuredWorks.map((work, index) => <button type="button" key={work.id} aria-label={`เลือกเคส ${work.id === "fantasy" ? "วิดีโอล้านวิว" : work.outcome}`} aria-pressed={index === selected} onClick={() => choose(index)}><span /></button>)}</div>
          <span className="case-preview-note">พรีวิวไม่มีเสียง</span>
          <button type="button" className="case-preview-pause" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "เล่นพรีวิว" : "หยุดพรีวิว"}<span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span></button>
        </div>
        <p className="sr-only" aria-live="polite">เคสที่เลือก: {active.title}</p>
      </div>

      <div className="work-hero-actions">
        <a href="#courses" className="learn-button learn-button-choice">ดูคอร์สเรียน <span aria-hidden="true">↗</span></a>
        <a href={fastworkUrl} target="_blank" rel="noopener noreferrer" className="learn-button learn-button-choice">จ้างงาน Fastwork <span aria-hidden="true">↗</span><span className="sr-only"> (เปิดแท็บใหม่)</span></a>
      </div>
      <MediaDialog data={media} onClose={() => setMedia(null)} triggerRef={mediaTrigger} />
    </section>
  );
}
