"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { MediaDialog } from "@/components/media-dialog";

export function CaseVideoButton({ id, title, videoUrl, posterUrl, posterAlt }: { id: string; title: string; videoUrl: string; posterUrl: string; posterAlt: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  return <><button ref={triggerRef} type="button" className="case-poster" onClick={() => setOpen(true)} aria-label={`เปิดวิดีโอ ${title}`}><Image src={posterUrl} alt={posterAlt} width={1450} height={1080} sizes="(max-width: 720px) 100vw, 50vw" /><span>PLAY CASE <b aria-hidden="true">↗</b></span></button><MediaDialog data={open ? { type: "video", id, title, fullUrl: videoUrl } : null} onClose={() => setOpen(false)} triggerRef={triggerRef} /></>;
}

