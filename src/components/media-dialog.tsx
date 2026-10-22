"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export type MediaDialogData =
  | {
      type: "video";
      id: string;
      title: string;
      fullUrl: string;
    }
  | {
      type: "image";
      id: string;
      title: string;
      src: string;
      alt: string;
    };

type MediaDialogProps = {
  data: MediaDialogData | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
};

export function MediaDialog({ data, onClose, triggerRef }: MediaDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (data) {
      if (!dialog.open) {
        dialog.showModal();
        // Focus close button on open for accessibility
        setTimeout(() => {
          closeButtonRef.current?.focus();
        }, 50);
      }

      // Load the selected video only after the user opens the dialog, but never
      // start playback or audio automatically.
      if (data.type === "video" && videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [data]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    const dialog = dialogRef.current;
    if (dialog && dialog.open) {
      dialog.close();
    }
    onClose();
    // Return focus to trigger element
    if (triggerRef?.current) {
      triggerRef.current.focus();
    }
  };

  // Close on backdrop click (clicking outside the dialog inner container)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      handleClose();
    }
  };

  // Listen to native cancel event (Escape key)
  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement, Event>) => {
    e.preventDefault();
    handleClose();
  };

  if (!data) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
      className="media-dialog"
    >
      <div className="media-dialog-shell">
        <div className="media-dialog-header">
          <h3>
            {data.title}
          </h3>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
            aria-label="ปิดหน้าต่าง"
            className="media-dialog-close"
          >
            ปิด ✕
          </button>
        </div>

        <div className="media-dialog-body">
          {data.type === "video" ? (
            <video
              ref={videoRef}
              src={data.fullUrl}
              controls
              playsInline
              preload="metadata"
              className="media-dialog-video"
            >
              เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
            </video>
          ) : (
            <div className="media-dialog-image-wrap">
              <Image
                src={data.src}
                alt={data.alt}
                width={1200}
                height={1600}
                className="media-dialog-image"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
