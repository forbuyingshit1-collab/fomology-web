import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getWork, works } from "@/data/products";
import { fastworkUrl } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return works.filter((work) => work.detail).map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWork((await params).slug);
  return { title: work ? `${work.title} | FOMOLOGY` : "Work | FOMOLOGY", description: work?.summary };
}

export default async function WorkDetailPage({ params }: Props) {
  const work = getWork((await params).slug);
  if (!work?.detail) notFound();

  return <>
    <SiteHeader />
    <main id="main-content" className="flex-1">
      <article className="site-container detail-article">
        <Link href="/products" className="mono-label back-link">← SERVICES / ALL WORK</Link>
        <header className="detail-header"><p className="eyebrow">{work.maturity}</p><h1>{work.title}</h1><p>{work.summary}</p></header>
        {work.cover && <figure className="detail-cover"><Image src={work.cover} alt="" fill sizes="(max-width: 800px) 100vw, 900px" /><figcaption>ภาพประกอบแนวคิด ไม่ใช่ภาพหน้าจอระบบหรือหลักฐานผลลัพธ์</figcaption></figure>}
        <div className="detail-body"><aside><span className="mono-label">SCOPE</span><p>{work.scope}</p><span className="mono-label">STATUS</span><p>{work.maturity}</p></aside><div>
          <h2>โจทย์และวิธีที่เราทำ</h2>
          {work.detail.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="detail-note">ข้อมูลหน้านี้อ้างอิงจากไฟล์งานที่มีอยู่ โดยไม่เพิ่มตัวเลขผลลัพธ์หรือข้อมูลลูกค้าที่ยังไม่ได้ยืนยัน</p>
          <a className="button button-blue" href={fastworkUrl} target="_blank" rel="noopener noreferrer">คุยงานผ่าน Fastwork <span aria-hidden="true">↗</span></a>
        </div></div>
      </article>
    </main>
    <SiteFooter />
  </>;
}
