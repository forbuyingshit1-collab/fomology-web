import Link from "next/link";
import { fastworkUrl } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-row">
        <Link href="/" className="footer-wordmark">FOMOLOGY<span className="brand-dot">.</span></Link>
        <span className="mono-label">© 2026 · LEARN. MAKE. REPEAT.</span>
        <div className="footer-links">
          <Link href="/course" className="text-link">คอร์สเรียน</Link>
          <Link href="/blog" className="text-link">บทความ</Link>
          <a href={fastworkUrl} target="_blank" rel="noopener noreferrer" className="text-link">Fastwork <span aria-hidden="true">↗</span></a>
          <a href="https://www.facebook.com/profile.php?id=61592333219846" target="_blank" rel="noopener noreferrer" className="text-link">Facebook</a>
          <a href="https://www.tiktok.com/@anantapadchiya" target="_blank" rel="noopener noreferrer" className="text-link">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
