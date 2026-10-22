import {
  getCloudinaryVideoPosterUrl,
  getCloudinaryVideoPreviewUrl,
} from "@/lib/cloudinary";

export type ShowcaseClip = {
  id: string;
  title: string;
  fullUrl: string;
  previewUrl: string;
  posterUrl: string;
};

export type ResultImage = {
  id: string;
  src: string;
  alt: string;
};

// Showcase videos 1, 2, and 4 (Item 3 is duplicate of 1, Item 5 did not pass QA)
const clip1Url =
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789977375/final_%E0%B8%9E%E0%B8%B4%E0%B8%86%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%B5%E0%B8%B1%E0%B8%AA%E0%B8%B2%E0%B8%99.mp4";
const clip2Url =
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789978451/create-a-20-second-thai-3145048883.mp4";
const clip4Url =
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789977714/%E0%B9%80%E0%B8%97%E0%B9%88.mp4";

export const showcaseClips: ShowcaseClip[] = [
  {
    id: "clip-1",
    title: "แฟนตาซีไทยแบบ live action",
    fullUrl: clip1Url,
    previewUrl: getCloudinaryVideoPreviewUrl(clip1Url),
    posterUrl: getCloudinaryVideoPosterUrl(clip1Url),
  },
  {
    id: "clip-2",
    title: "บทสัมภาษณ์ริมถนนในกรุงเทพฯ",
    fullUrl: clip2Url,
    previewUrl: getCloudinaryVideoPreviewUrl(clip2Url),
    posterUrl: getCloudinaryVideoPosterUrl(clip2Url),
  },
  {
    id: "clip-4",
    title: "นักรบอนิเมะโทนแดงและดำ",
    fullUrl: clip4Url,
    previewUrl: getCloudinaryVideoPreviewUrl(clip4Url),
    posterUrl: getCloudinaryVideoPosterUrl(clip4Url),
  },
];

// Result images in specified order: 3.jpg, 1.jpg, 2.jpg
export const resultImages: ResultImage[] = [
  {
    id: "result-3",
    src: "https://res.cloudinary.com/lx5v2ghk/image/upload/v1789979784/3.jpg",
    alt: "ภาพสถิติ TikTok Studio แสดงยอดดูโพสต์ 3 ล้าน ผู้ติดตามสุทธิ 5,532 และการถูกใจ 339,000 ภายใน 7 วัน",
  },
  {
    id: "result-1",
    src: "https://res.cloudinary.com/lx5v2ghk/image/upload/v1789979786/1.jpg",
    alt: "ภาพสถิติของคลิปแฟนตาซีไทย แสดงยอดดู 1,238,143 ที่เวลา 1 day 6 hours หรือ 30 ชั่วโมง และยอดรวม 1.3 ล้านวิวในหน้าสถิติ",
  },
  {
    id: "result-2",
    src: "https://res.cloudinary.com/lx5v2ghk/image/upload/v1789979786/2.jpg",
    alt: "ภาพหน้า TikTok แสดงวิดีโอปักหมุดสามรายการที่มียอดดูประมาณ 1.1 ถึง 1.5 ล้านครั้ง",
  },
];
