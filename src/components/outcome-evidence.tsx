"use client";

import { useRef, useState } from "react";
import { resultImages } from "@/data/media";
import { MediaDialog } from "@/components/media-dialog";
import type { MediaDialogData } from "@/components/media-dialog";

const outcomes = [
  { value: "1.23M", label: "วิวใน 30 ชั่วโมง", description: "คลิปแฟนตาซีไทยในเคสเปิด", image: resultImages[1] },
  { value: "3M", label: "ยอดดูโพสต์รวมใน 7 วัน", description: "ภาพบันทึกจาก TikTok Studio", image: resultImages[0] },
  { value: "3 คลิป", label: "ทะลุหลักล้านวิว", description: "คลิปปักหมุดในภาพบันทึกผลงาน", image: resultImages[2] },
];

export function OutcomeEvidence() {
  const [media, setMedia] = useState<MediaDialogData | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  return <>
    <section className="outcome-section" aria-labelledby="outcome-title">
      <div className="learn-container"><div className="outcome-heading" data-enter><h2 id="outcome-title">ไม่ได้มีแค่ไอเดีย<br />มีผลลัพธ์ให้ดูด้วย<span className="learn-red">.</span></h2><p>ตัวเลขจากผลงานที่ผ่านมา<br />พร้อมภาพสถิติต้นฉบับให้เปิดดู</p></div>
        <div className="outcome-grid">{outcomes.map((outcome) => <button type="button" key={outcome.value} className="outcome-card" data-enter onClick={(event) => { trigger.current = event.currentTarget; setMedia({ type: "image", id: outcome.image.id, title: `${outcome.value} ${outcome.label}`, src: outcome.image.src, alt: outcome.image.alt }); }}><strong>{outcome.value}</strong><span>{outcome.label}</span><small>{outcome.description}</small><span className="outcome-source">เปิดหลักฐาน <b aria-hidden="true">↗</b></span></button>)}</div>
      </div>
    </section>
    <MediaDialog data={media} onClose={() => setMedia(null)} triggerRef={trigger} />
  </>;
}
