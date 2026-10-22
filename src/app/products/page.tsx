import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ClientWorkSection } from "@/components/client-work-section";
import { ServicePillars } from "@/components/service-pillars";
import { LearnCreateSection } from "@/components/learn-create-section";
import { ContactSection } from "@/components/contact-section";
import { ScrollStory } from "@/components/scroll-story";
import { works } from "@/data/products";
import { fastworkUrl } from "@/data/site";

export const metadata: Metadata = {
  title: "รับทำเว็บไซต์ ระบบ Automation และ AI Video | FOMOLOGY",
  description: "FOMOLOGY รับออกแบบและพัฒนาเว็บไซต์ ระบบหลังบ้าน Automation และ AI Video ตั้งแต่แยกโจทย์ ออกแบบ workflow ไปจนถึงชิ้นงานพร้อมใช้งาน",
};

export default function ProductsPage() {
  return <>
    <SiteHeader />
    <main id="main-content" className="flex-1">
      <header className="site-container editorial-hero product-sales-hero">
        <p className="eyebrow">EXPERT STUDIO / SERVICES</p>
        <h1>จากประสบการณ์ที่ลงมือทำจริง<br /><span className="heading-emphasis">สู่งานที่พร้อมใช้</span></h1>
        <p className="editorial-lede">เราช่วยทำความเข้าใจปัญหา วางแนวทาง และลงมือสร้าง ตั้งแต่วิดีโอและเว็บไซต์ ไปจนถึงระบบและ Automation ที่พร้อมส่งมอบให้ทีมของคุณใช้งานต่อ</p>
        <div className="product-hero-actions">
          <a href={fastworkUrl} target="_blank" rel="noopener noreferrer" className="button button-blue">คุยงานผ่าน Fastwork <span aria-hidden="true">↗</span></a>
          <a href="#client-work" className="text-link">ดูงานที่เคยส่งมอบ <span aria-hidden="true">↓</span></a>
        </div>
        <ul className="capability-strip" aria-label="บริการหลัก">
          <li>WEBSITES</li><li>CUSTOM SYSTEMS</li><li>AUTOMATION</li><li>AI VIDEO</li>
        </ul>
        <span className="pixel-accent" aria-hidden="true"><i /><i /><i /><i /></span>
      </header>

      <ClientWorkSection variant="full" />
      <ServicePillars variant="full" />

      <section className="section-spacing work-section" aria-labelledby="work-title">
        <div className="site-container">
          <div className="section-intro"><p className="eyebrow">03 / LABS & INDEPENDENT WORK</p><h2 id="work-title">งานทดลองและผลงานอิสระ</h2><p>ต้นแบบ งานเขียน และโปรเจกต์ที่เราสร้างเพื่อสำรวจแนวคิดใหม่ โดยระบุสถานะตามจริงและไม่ปะปนกับงานลูกค้า</p></div>
          <div className="work-grid">
            {works.map((work, index) => <article className="work-card" key={work.slug}>
              {work.cover ? <div className="work-image"><Image src={work.cover} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span>ILLUSTRATION / NOT UI PROOF</span></div> : <div className="work-image work-image-text" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div>}
              <div className="work-card-body"><p className="mono-label">{work.maturity}</p><h3>{work.title}</h3><p>{work.summary}</p><small>{work.scope}</small>
                {(work.detail || work.href) && <Link href={work.href ?? `/products/${work.slug}`} className="text-link">{work.href ? "อ่านต่อ" : "อ่านเบื้องหลัง"} <span aria-hidden="true">↗</span></Link>}
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <LearnCreateSection />
      <ContactSection />
    </main>
    <SiteFooter />
    <ScrollStory />
  </>;
}
