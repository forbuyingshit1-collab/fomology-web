"use client";

import { useEffect } from "react";

export function PageMotion() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".learning-page");
    if (!root) return;
    const nodes = [...root.querySelectorAll<HTMLElement>("[data-enter]")];
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) {
        (entry.target as HTMLElement).dataset.seen = "true";
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08 });
    function setup() {
      if (!root) return;
      for (const node of nodes) {
        if (preference.matches || node.getBoundingClientRect().top < window.innerHeight) node.dataset.seen = "true";
        else observer.observe(node);
      }
      root.classList.toggle("motion-ready", !preference.matches);
    }
    setup();
    preference.addEventListener("change", setup);
    return () => { observer.disconnect(); preference.removeEventListener("change", setup); root.classList.remove("motion-ready"); };
  }, []);
  return null;
}
