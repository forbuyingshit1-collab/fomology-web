"use client";

import { useState } from "react";

export function CopyButton({ text, label = "คัดลอก" }: { text: string; label?: string }) {
  const [feedback, setFeedback] = useState(label);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setFeedback("คัดลอกแล้ว");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
      setFeedback("คัดลอกแล้ว");
    }
    window.setTimeout(() => setFeedback(label), 1800);
  }

  return <button type="button" className="copy-button" onClick={copy} aria-live="polite">{feedback}</button>;
}

