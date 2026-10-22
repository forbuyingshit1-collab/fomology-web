"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ProgressContextValue = {
  completed: string[];
  ready: boolean;
  toggle: (id: string) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function useProgress() {
  const value = useContext(ProgressContext);
  if (!value) throw new Error("Course progress component must be inside CourseProgressProvider");
  return value;
}

export function CourseProgressProvider({ lessonIds, storageKey, children }: { lessonIds: string[]; storageKey: string; children: ReactNode }) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored: unknown = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
        if (Array.isArray(stored)) setCompleted(stored.filter((item): item is string => typeof item === "string" && lessonIds.includes(item)));
      } catch { setCompleted([]); }
      setReady(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [lessonIds, storageKey]);

  useEffect(() => {
    if (ready) window.localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed, ready, storageKey]);

  const value = useMemo<ProgressContextValue>(() => ({
    completed,
    ready,
    toggle: (id) => setCompleted((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    reset: () => setCompleted([]),
  }), [completed, ready]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function CourseProgressBar({ total }: { total: number }) {
  const { completed, ready, reset } = useProgress();
  const [confirming, setConfirming] = useState(false);
  const percent = Math.round((completed.length / total) * 100);

  function handleReset() {
    if (!confirming) { setConfirming(true); window.setTimeout(() => setConfirming(false), 3000); return; }
    reset();
    setConfirming(false);
  }

  return <div className="course-progress" aria-label="ความคืบหน้าของคอร์ส"><div className="site-container progress-row"><div className="progress-copy"><span>YOUR PROGRESS</span><strong aria-live="polite">{ready ? `${completed.length}/${total} · ${percent}%` : `0/${total} · 0%`}</strong></div><div className="progress-track" aria-hidden="true"><span style={{ width: `${percent}%` }} /></div><button type="button" className="reset-button" onClick={handleReset} disabled={completed.length === 0}>{confirming ? "ยืนยันเริ่มใหม่" : "เริ่มใหม่"}</button></div></div>;
}

export function ModuleProgress({ lessonIds }: { lessonIds: readonly string[] }) {
  const { completed, ready } = useProgress();
  const count = lessonIds.filter((id) => completed.includes(id)).length;
  return <span className="module-progress" aria-live="polite">{ready ? `${count}/${lessonIds.length} บท` : `0/${lessonIds.length} บท`}</span>;
}

export function LessonCompletion({ id, label }: { id: string; label: string }) {
  const { completed, ready, toggle } = useProgress();
  const checked = completed.includes(id);
  return <label className="lesson-check"><input type="checkbox" checked={ready && checked} onChange={() => toggle(id)} /><span>{label}</span></label>;
}
