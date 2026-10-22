"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { fastworkUrl } from "@/data/site";

const logoUrl = "/brand/fomology-logo.jpg";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  function openMenu(trigger: HTMLButtonElement) {
    lastTriggerRef.current = trigger;
    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    drawerRef.current?.querySelector<HTMLElement>("button")?.focus();

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") closeMenu();
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
      lastTriggerRef.current?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 700) setMenuOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function trapFocus(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab") return;
    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="site-container header-row">
          <Link href="/" className="brand-link" aria-label="FOMOLOGY หน้าแรก">
            <Image src={logoUrl} alt="" width={48} height={48} className="brand-logo" priority />
            <span className="brand-wordmark">FOMOLOGY<span className="brand-dot">.</span></span>
          </Link>
          <nav aria-label="เมนูหลัก" className="header-nav">
            <Link href="/#courses">คอร์สเรียน</Link>
            <Link href="/#showcase" className="desktop-nav-link">ผลงาน</Link>
            <Link href="/blog" className="desktop-nav-link">บทความ</Link>
            <a href={fastworkUrl} target="_blank" rel="noopener noreferrer" className="desktop-nav-link">จ้างงาน <span aria-hidden="true">↗</span><span className="sr-only">ผ่าน Fastwork (เปิดแท็บใหม่)</span></a>
          </nav>
          <Link href="/#choose-path" className="header-contact">เริ่มต้นที่นี่ <span aria-hidden="true">↗</span></Link>
          <button
            type="button"
            className="mobile-compact-trigger"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-drawer"
            onClick={(event) => openMenu(event.currentTarget)}
          >
            <span className="menu-icon" aria-hidden="true"><i /><i /></span>
            <span className="sr-only">เปิดเมนูหลัก</span>
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="mobile-navigation-layer">
          <button type="button" className="mobile-menu-backdrop" aria-label="ปิดเมนู" onClick={closeMenu} />
          <aside
            ref={drawerRef}
            id="mobile-navigation-drawer"
            className="mobile-navigation-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="เมนูหลัก"
            onKeyDown={trapFocus}
          >
            <div className="mobile-drawer-head">
              <span className="mono-label">FOMOLOGY / NAVIGATION</span>
              <button type="button" className="mobile-drawer-close" onClick={closeMenu} aria-label="ปิดเมนู">×</button>
            </div>
            <nav aria-label="เมนูมือถือ" className="mobile-drawer-links">
              <Link href="/" onClick={closeMenu}>หน้าแรก</Link>
              <Link href="/#courses" onClick={closeMenu}>คอร์สเรียน</Link>
              <Link href="/#showcase" onClick={closeMenu}>ผลงาน</Link>
              <Link href="/blog" onClick={closeMenu}>บทความ</Link>
              <Link href="/course" onClick={closeMenu}>เริ่มเรียนฟรี <span aria-hidden="true">↗</span></Link>
              <a href={fastworkUrl} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>จ้างงานผ่าน Fastwork <span aria-hidden="true">↗</span><span className="sr-only"> (เปิดแท็บใหม่)</span></a>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
