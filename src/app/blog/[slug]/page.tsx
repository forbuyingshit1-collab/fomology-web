import type { Metadata } from "next";
import { readFile } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getPost, posts } from "@/data/blog";
import { renderArticle } from "@/lib/render-article";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return { title: post ? `${post.title} | FOMOLOGY` : "Blog | FOMOLOGY", description: post?.description };
}

export default async function BlogArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const markdown = await readFile(path.join(process.cwd(), "src/content/blog", `${post.slug}.md`), "utf8");

  return <>
    <SiteHeader />
    <main id="main-content" className="flex-1">
      <article className="site-container article-page">
        <Link href="/blog" className="mono-label back-link">← BLOG / ALL STORIES</Link>
        <header className="article-header"><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p className="article-deck">{post.description}</p><div className="article-meta"><span>FOMOLOGY</span>{post.date && <time dateTime={post.date}>{post.date}</time>}</div></header>
        {post.reviewNote && <p className="article-review-note">หมายเหตุบรรณาธิการ: {post.reviewNote}</p>}
        <div className="article-prose">{renderArticle(markdown)}</div>
        <footer className="article-end"><span className="pixel-accent" aria-hidden="true"><i /><i /><i /><i /></span><p>อ่านจบแล้ว ลองหยิบหนึ่งไอเดียไปลงมือทำ</p><div className="article-end-links"><Link href="/blog" className="text-link">ดูบทความอื่น <span aria-hidden="true">↗</span></Link><Link href="/products" className="text-link">ดูบริการ <span aria-hidden="true">↗</span></Link></div></footer>
      </article>
    </main>
    <SiteFooter />
  </>;
}
