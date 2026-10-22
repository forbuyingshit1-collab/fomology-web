"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { showcaseClips, type ShowcaseClip } from "@/data/media";
import { MediaDialog, type MediaDialogData } from "@/components/media-dialog";

function ShowcaseChapter({
  clip,
  index,
  active,
  register,
  onSelect,
}: {
  clip: ShowcaseClip;
  index: number;
  active: boolean;
  register: (node: HTMLElement | null) => void;
  onSelect: (clip: ShowcaseClip, trigger: HTMLElement) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasMovingFrame, setHasMovingFrame] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.play().catch(() => undefined);
      return;
    }

    video.pause();
    video.currentTime = 0;
  }, [active]);

  const descriptions = [
    "เรื่องเล่าแบบไทยในบรรยากาศภาพยนตร์",
    "บทสัมภาษณ์ริมถนนที่ดูเป็นธรรมชาติ",
    "แอนิเมชันสีจัดจ้านในสไตล์ของตัวเอง",
  ];

  return (
    <article ref={register} data-showcase-id={clip.id} data-showcase-index={index} className="showcase-chapter" data-reveal>
      <div className="showcase-caption">
        <span className="chapter-number">0{index + 1}</span>
        <h3>{clip.title}</h3>
        <p>{descriptions[index]}</p>
      </div>
      <button type="button" className="showcase-media" onClick={(event) => onSelect(clip, event.currentTarget)} aria-label={`เปิดวิดีโอ: ${clip.title}`}>
        <Image className={hasMovingFrame && active ? "video-poster is-playing" : "video-poster"} src={clip.posterUrl} alt="" fill sizes="(max-width: 700px) 320px, 65vw" />
        <video ref={videoRef} src={active ? clip.previewUrl : undefined} poster={clip.posterUrl} muted loop playsInline preload={active ? "metadata" : "none"} onLoadStart={() => setHasMovingFrame(false)} onTimeUpdate={(event) => {
          if (event.currentTarget.currentTime > 0.15) setHasMovingFrame(true);
        }}><track kind="captions" /></video>
        <span className="media-action">PLAY FULL <b aria-hidden="true">↗</b></span>
      </button>
    </article>
  );
}

export function ShowcaseSection() {
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const [activeMedia, setActiveMedia] = useState<MediaDialogData | null>(null);
  const chaptersRef = useRef(new Map<string, HTMLElement>());
  const visibilityRef = useRef(new Map<string, number>());
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.showcaseId;
        if (!id) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) visibilityRef.current.set(id, entry.intersectionRatio);
        else visibilityRef.current.delete(id);
      });

      const visible = [...visibilityRef.current.entries()].sort(([firstId, firstRatio], [secondId, secondRatio]) => {
        if (secondRatio !== firstRatio) return secondRatio - firstRatio;
        const firstIndex = Number(chaptersRef.current.get(firstId)?.dataset.showcaseIndex);
        const secondIndex = Number(chaptersRef.current.get(secondId)?.dataset.showcaseIndex);
        return firstIndex - secondIndex;
      });
      setActivePreviewId(visible[0]?.[0] ?? null);
    }, { threshold: [0, 0.35, 0.58, 0.85] });

    chaptersRef.current.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  function registerChapter(id: string, node: HTMLElement | null) {
    if (node) chaptersRef.current.set(id, node);
    else chaptersRef.current.delete(id);
  }

  function handleSelect(clip: ShowcaseClip, trigger: HTMLElement) {
    activeTriggerRef.current = trigger;
    setActiveMedia({ type: "video", id: clip.id, title: clip.title, fullUrl: clip.fullUrl });
  }

  return (
    <section id="showcase" className="showcase-section section-spacing" aria-labelledby="showcase-heading">
      <div className="site-container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">CONTENT & DIGITAL EXPERIENCE / SELECTED MOTION</p>
          <h2 id="showcase-heading">MADE WITH FOMOLOGY</h2>
          <p>ตัวอย่างงาน AI Video ที่เราทดลองทั้งภาพ จังหวะ และวิธีเล่า ก่อนพัฒนาเป็นชิ้นงานที่พร้อมเผยแพร่</p>
        </div>
        <div className="showcase-list">
          {showcaseClips.map((clip, index) => <ShowcaseChapter
            key={clip.id}
            clip={clip}
            index={index}
            active={activePreviewId === clip.id}
            register={(node) => registerChapter(clip.id, node)}
            onSelect={handleSelect}
          />)}
        </div>
        <div className="section-outlink" data-reveal>
          <a className="text-link" href="https://www.tiktok.com/@anantapadchiya" target="_blank" rel="noopener noreferrer">ดูผลงานทั้งหมดบน TikTok <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <MediaDialog data={activeMedia} onClose={() => setActiveMedia(null)} triggerRef={activeTriggerRef} />
    </section>
  );
}
