"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MediaDialog, type MediaDialogData } from "@/components/media-dialog";
import { clientWorks, type ClientWork } from "@/data/client-work";
import { fastworkUrl } from "@/data/site";

type ClientWorkSectionProps = {
  variant: "compact" | "full";
};

function ClientWorkCard({
  work,
  index,
  active,
  register,
  onSelect,
}: {
  work: ClientWork;
  index: number;
  active: boolean;
  register: (node: HTMLElement | null) => void;
  onSelect: (work: ClientWork, trigger: HTMLElement) => void;
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

  return (
    <article ref={register} data-client-work-id={work.id} data-client-work-index={index} className="client-work-card" data-reveal>
      <button
        type="button"
        className="client-work-media"
        onClick={(event) => onSelect(work, event.currentTarget)}
        aria-label={`เปิดวิดีโอตัวอย่างงาน ${work.title}`}
      >
        <Image
          className={hasMovingFrame && active ? "client-work-poster is-playing" : "client-work-poster"}
          src={work.posterUrl}
          alt=""
          fill
          sizes="(max-width: 700px) 82vw, (max-width: 1100px) 50vw, 25vw"
        />
        <video
          ref={videoRef}
          src={active ? work.previewUrl : undefined}
          poster={work.posterUrl}
          muted
          loop
          playsInline
          preload={active ? "metadata" : "none"}
          onLoadStart={() => setHasMovingFrame(false)}
          onTimeUpdate={(event) => {
            if (event.currentTarget.currentTime > 0.15) setHasMovingFrame(true);
          }}
        >
          <track kind="captions" />
        </video>
        <span className="client-work-play">PLAY CASE <b aria-hidden="true">↗</b></span>
      </button>

      <div className="client-work-card-copy">
        <div className="client-work-meta">
          <span className="mono-label">{work.responsibilityLabel}</span>
          <span className="mono-label">CLIENT DELIVERY</span>
        </div>
        <p className="client-work-product mono-label">{work.product}</p>
        <h3>{work.title}</h3>
        <dl className="delivery-trace" aria-label={`รายละเอียดการส่งมอบ ${work.title}`}>
          <div><dt>โจทย์</dt><dd>{work.problem}</dd></div>
          <div><dt>สิ่งที่เรารับผิดชอบ</dt><dd>{work.responsibility}</dd></div>
          <div><dt>สิ่งที่ส่งมอบ</dt><dd>{work.delivery}</dd></div>
        </dl>
        <ul className="client-work-scope" aria-label={`ขอบเขตงาน ${work.title}`}>
          {work.scope.map((item) => <li key={item}>{item}</li>)}
        </ul>
        {work.outcomes && <div className="client-work-outcomes" aria-label="ผลลัพธ์ที่ลูกค้ารายงาน">
          {work.outcomes.map((outcome) => <div key={outcome.label}>
            <strong>{outcome.value}</strong>
            <span>{outcome.label}</span>
          </div>)}
          <small>CLIENT-REPORTED OUTCOME</small>
        </div>}
        <details className="mobile-card-details client-work-mobile-details">
          <summary>ดูเพิ่มเติม <span aria-hidden="true">+</span></summary>
          <dl className="mobile-delivery-trace" aria-label={`รายละเอียดเพิ่มเติมของ ${work.title}`}>
            <div><dt>โจทย์</dt><dd>{work.problem}</dd></div>
            <div><dt>สิ่งที่เรารับผิดชอบ</dt><dd>{work.responsibility}</dd></div>
            <div><dt>สิ่งที่ส่งมอบ</dt><dd>{work.delivery}</dd></div>
          </dl>
          <ul className="mobile-client-work-scope" aria-label={`ขอบเขตงาน ${work.title}`}>
            {work.scope.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </details>
      </div>
    </article>
  );
}

export function ClientWorkSection({ variant }: ClientWorkSectionProps) {
  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);
  const [activeMedia, setActiveMedia] = useState<MediaDialogData | null>(null);
  const cardsRef = useRef(new Map<string, HTMLElement>());
  const visibilityRef = useRef(new Map<string, number>());
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.clientWorkId;
        if (!id) return;
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) visibilityRef.current.set(id, entry.intersectionRatio);
        else visibilityRef.current.delete(id);
      });

      const visible = [...visibilityRef.current.entries()].sort(([firstId, firstRatio], [secondId, secondRatio]) => {
        if (secondRatio !== firstRatio) return secondRatio - firstRatio;
        const firstIndex = Number(cardsRef.current.get(firstId)?.dataset.clientWorkIndex);
        const secondIndex = Number(cardsRef.current.get(secondId)?.dataset.clientWorkIndex);
        return firstIndex - secondIndex;
      });
      setActivePreviewId(visible[0]?.[0] ?? null);
    }, { threshold: [0, 0.35, 0.6, 0.9] });

    cardsRef.current.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  function registerCard(id: string, node: HTMLElement | null) {
    if (node) cardsRef.current.set(id, node);
    else cardsRef.current.delete(id);
  }

  function handleSelect(work: ClientWork, trigger: HTMLElement) {
    activeTriggerRef.current = trigger;
    setActiveMedia({ type: "video", id: work.id, title: work.title, fullUrl: work.fullUrl });
  }

  return (
    <section id="client-work" className={`client-work-section client-work-${variant} section-spacing`} aria-labelledby={`client-work-${variant}-title`}>
      <div className="site-container">
        <div className="section-intro client-work-intro" data-reveal>
          <p className="eyebrow">SELECTED CLIENT WORK / FROM BRIEF TO DELIVERY</p>
          <h2 id={`client-work-${variant}-title`}>
            <span className="client-work-title-line keep-phrase">โจทย์จริง งานจริง</span>
            <span className="client-work-title-line keep-phrase">ส่งมอบจริง</span>
          </h2>
          <p>ตัวอย่างงานที่เราเคยรับผิดชอบ ตั้งแต่การแยกโจทย์ ออกแบบ ลงมือสร้าง จนถึงงานที่พร้อมนำไปใช้ต่อ</p>
        </div>

        <div className="client-work-grid">
          {clientWorks.map((work, index) => <ClientWorkCard
            key={work.id}
            work={work}
            index={index}
            active={activePreviewId === work.id}
            register={(node) => registerCard(work.id, node)}
            onSelect={handleSelect}
          />)}
        </div>

        <div className="client-work-cta" data-reveal>
          <div>
            <p className="mono-label">HAVE A SIMILAR CHALLENGE?</p>
            <h3>มีโจทย์คล้ายกัน?</h3>
          </div>
          <a href={fastworkUrl} target="_blank" rel="noopener noreferrer" className="button button-on-blue">คุยงานผ่าน Fastwork <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <MediaDialog data={activeMedia} onClose={() => setActiveMedia(null)} triggerRef={activeTriggerRef} />
    </section>
  );
}
