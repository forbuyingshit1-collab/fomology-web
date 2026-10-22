"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { resultImages, type ResultImage } from "@/data/media";
import { MediaDialog, type MediaDialogData } from "@/components/media-dialog";

export function ResultsSection() {
  const [activeMedia, setActiveMedia] = useState<MediaDialogData | null>(null);
  const activeTriggerRef = useRef<HTMLElement | null>(null);

  function showImage(image: ResultImage, trigger: HTMLElement) {
    activeTriggerRef.current = trigger;
    setActiveMedia({ type: "image", id: image.id, title: "หลักฐานจากผลงานจริง", src: image.src, alt: image.alt });
  }

  return (
    <section className="results-section section-spacing" aria-labelledby="results-heading">
      <div className="site-container results-grid">
        <div className="results-copy" data-reveal>
          <p className="eyebrow">CONTENT & DIGITAL EXPERIENCE / RECORDED RESULTS</p>
          <h2 id="results-heading">ภาพที่สื่อสารได้<br />ต้องพาคนหยุดดู</h2>
          <p>ภาพสถิติจากโพสต์ที่เผยแพร่จริง เราแสดงภาพต้นฉบับไว้ เพื่อให้คุณเห็นผลลัพธ์ตามที่บันทึกไว้</p>
          <div className="proof-stat"><strong>3M</strong><span>ยอดดูโพสต์ใน 7 วัน จากหนึ่งในผลลัพธ์ที่บันทึกไว้</span></div>
        </div>
        <div className="evidence-rail" aria-label="ภาพหลักฐานผลลัพธ์จริง">
          {resultImages.map((image, index) => (
            <button key={image.id} type="button" className={`evidence-shot evidence-shot-${index + 1}`} onClick={(event) => showImage(image, event.currentTarget)} aria-label={`ดูภาพขนาดเต็ม: ${image.alt}`} data-reveal>
              <Image src={image.src} alt={image.alt} width={600} height={800} sizes="(max-width: 760px) 78vw, 30vw" />
              <span>RAW PROOF <b aria-hidden="true">↗</b></span>
            </button>
          ))}
        </div>
      </div>
      <MediaDialog data={activeMedia} onClose={() => setActiveMedia(null)} triggerRef={activeTriggerRef} />
    </section>
  );
}
