"use client";

import { useEffect } from "react";

export function ScrollStory() {
  useEffect(() => {
    const revealNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const traceNodes = Array.from(document.querySelectorAll<HTMLElement>("[data-trace]"));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      for (const node of [...revealNodes, ...traceNodes]) node.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12%", threshold: 0.12 },
    );

    for (const node of [...revealNodes, ...traceNodes]) observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return null;
}
