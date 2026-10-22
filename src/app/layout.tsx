import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@/components/analytics";
import "./globals.css";
import "./clean-site.css";

const lineSeedThai = localFont({
  src: [
    { path: "./fonts/line-seed-th-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/line-seed-th-bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/line-seed-th-extrabold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-line-seed-th",
  display: "swap",
});

const plexMono = localFont({
  src: "./fonts/ibm-plex-mono-medium-latin.woff2",
  weight: "500",
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "FOMOLOGY | ผลงานจริง คอร์ส AI และงานสร้างสรรค์",
  description:
    "AI Video เว็บไซต์ ระบบ และ Automation จากผลงานที่ลงมือทำจริง เลือกเรียนรู้ผ่านคอร์สภาษาไทย หรือจ้างงาน FOMOLOGY ผ่าน Fastwork",
  icons: {
    icon: "/icon.jpg",
  },
  openGraph: {
    title: "FOMOLOGY | ผลงานจริง คอร์ส AI และงานสร้างสรรค์",
    description:
      "ผลงานจริง ผลลัพธ์จริง อยากเรียนทำเองหรืออยากให้เราช่วยทำ เลือกได้เลย",
    type: "website",
    locale: "th_TH",
    siteName: "FOMOLOGY",
    images: [
      {
        url: "/og/fomology-og.jpg",
        width: 1200,
        height: 630,
        alt: "FOMOLOGY เรียนรู้ AI ผ่านการลงมือทำ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FOMOLOGY | ผลงานจริง คอร์ส AI และงานสร้างสรรค์",
    description:
      "ผลงานจริง ผลลัพธ์จริง เรียนรู้ผ่านคอร์สภาษาไทย หรือจ้างงานผ่าน Fastwork",
    images: ["/og/fomology-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" data-scroll-behavior="smooth">
      <body
        className={`${lineSeedThai.variable} ${plexMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <a className="skip-link" href="#main-content">ข้ามไปเนื้อหาหลัก</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
