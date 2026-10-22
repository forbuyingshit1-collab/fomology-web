"use client";

import { useEffect, useRef } from "react";

const heroVideoUrl =
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1790141115/MiniMax_H3_00074_.mp4";
const heroPosterUrl =
  "https://res.cloudinary.com/lx5v2ghk/video/upload/so_0,q_auto,f_jpg/v1790141115/MiniMax_H3_00074_.jpg";

export function LandingHero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video) return;
    const heroVideo = video;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;

    function syncPlayback() {
      if (motionPreference.matches || !visible) {
        heroVideo.pause();
        if (motionPreference.matches) {
          heroVideo.currentTime = 0;
          heroVideo.load();
        }
        return;
      }
      heroVideo.play().catch(() => undefined);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting && entry.intersectionRatio >= 0.45);
      syncPlayback();
    }, { threshold: 0.45 });

    observer.observe(frame);
    motionPreference.addEventListener("change", syncPlayback);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", syncPlayback);
      heroVideo.pause();
    };
  }, []);

  return (
    <section className="landing-hero" aria-labelledby="hero-title">
      <div className="site-container hero-grid">
        <div className="hero-copy" data-reveal>
          <del className="hero-old-meaning">Fear of Missing Out</del>
          <h1 id="hero-title" className="hero-title-en">
            <span className="hero-brand-acronym">FOMO</span>
            <span className="hero-brand-expansion">
              <span>Focus On Making</span>{" "}
              <span>Outstanding.</span>
            </span>
          </h1>
          <p className="hero-lede">
            เราช่วยคิด ออกแบบ และลงมือสร้าง ตั้งแต่ AI Video และเว็บไซต์ ไปจนถึงระบบเฉพาะงานและ Automation ที่พร้อมใช้จริง
          </p>
          <div className="hero-actions" aria-label="เลือกบริการที่สนใจ">
            <a className="button hero-choice hero-choice-video" href="#showcase" aria-label="ดูตัวอย่างผลงาน AI Video">สนใจ AI Video <span aria-hidden="true">↓</span></a>
            <a className="button hero-choice hero-choice-automation" href="#client-work" aria-label="ดูตัวอย่างผลงานระบบและ Automation">สนใจ Automation <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div ref={frameRef} className="hero-video-frame" aria-hidden="true" data-reveal>
          <video
            ref={videoRef}
            className="hero-video"
            src={heroVideoUrl}
            poster={heroPosterUrl}
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
          >
            <track kind="captions" />
          </video>
          <span className="hero-video-label">AI MOTION / FOMOLOGY</span>
          <span className="hero-video-pixels" aria-hidden="true"><i /><i /><i /></span>
        </div>
      </div>
    </section>
  );
}
