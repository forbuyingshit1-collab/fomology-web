import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { posts } from "@/data/blog";

// Keep a few Thai compounds together when the card narrows on mobile.
const protectedTitlePhrases = new Set(["เริ่มจาก", "แอดมิน", "รายรับ–รายจ่าย", "ทำมา", "คริปโตส่วนตัว", "ในวงการ", "คนทั่วไป"]);
const protectedTitlePattern = /(เริ่มจาก|แอดมิน|รายรับ–รายจ่าย|ทำมา|คริปโตส่วนตัว|ในวงการ|คนทั่วไป)/g;

function renderPostTitle(title: string) {
  return title.split(protectedTitlePattern).map((part, index) =>
    protectedTitlePhrases.has(part) ? <span className="keep-phrase" key={index}>{part}</span> : part
  );
}

export const metadata: Metadata = {
  title: "Blog | FOMOLOGY",
  description: "บันทึกการเรียนรู้ เบื้องหลังงาน AI และ Automation และคู่มือที่ชวนลงมือทำจริงจาก FOMOLOGY",
};

export default function BlogPage() {
  return <>
    <SiteHeader />
    <main id="main-content" className="flex-1">
      <header className="site-container editorial-hero">
        <p className="eyebrow">BLOG / FIELD NOTES</p>
        <h1>สิ่งที่ลองทำ<br /><span className="heading-emphasis">สิ่งที่ได้เรียนรู้</span></h1>
        <p className="editorial-lede">เรื่องเล่าจากการทดลองใช้ AI สร้างระบบ และเรียนรู้ระหว่างทาง เผื่อคุณจะได้ไอเดียไปลองทำต่อ</p>
        <span className="pixel-accent" aria-hidden="true"><i /><i /><i /><i /></span>
      </header>
      <section className="section-spacing editorial-band" aria-labelledby="post-list-title">
        <div className="site-container">
          <div className="section-intro compact"><p className="eyebrow">ALL STORIES / {String(posts.length).padStart(2, "0")}</p><h2 id="post-list-title">เลือกเรื่องที่สนใจ</h2></div>
          <div className="post-list">
            {posts.map((post, index) => <article className="post-row" key={post.slug}>
              <span className="post-index mono-label">{String(index + 1).padStart(2, "0")}</span>
              <div className="post-visual" aria-hidden="true"><Image src={post.image} alt="" fill sizes="(max-width: 700px) 80px, 112px" /></div>
              <div className="post-row-main"><p className="mono-label">{post.category}{post.date && ` · ${post.date}`}</p><h3><Link href={`/blog/${post.slug}`}>{renderPostTitle(post.title)}</Link></h3><p>{post.description}</p></div>
              <Link className="post-arrow" href={`/blog/${post.slug}`} aria-label={`อ่าน ${post.title}`}>↗</Link>
            </article>)}
          </div>
          <p className="blog-source-note">บทความบางเรื่องเขียนไว้ก่อนหน้านี้ ราคา ขั้นตอนใช้เครื่องมือ และข้อมูลเกี่ยวกับคริปโตอาจเปลี่ยนไป โปรดตรวจสอบข้อมูลล่าสุดก่อนนำไปใช้</p>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}
