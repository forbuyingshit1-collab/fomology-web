import { readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const failures = [];
const requiredSections = ["บทนี้คุณจะได้อะไร", "เข้าใจใน 1 นาที", "ทำตามทีละขั้น", "ตัวอย่างไม่ดี / ดีขึ้นอย่างไร", "ลองทำ", "เช็กก่อนผ่าน", "ลิงก์และอ่านเพิ่ม"];

async function text(relative) {
  try { return await readFile(path.join(root, relative), "utf8"); }
  catch { failures.push(`${relative}: missing or unreadable`); return ""; }
}

const manifest = await text("src/data/course.ts");
const files = [...manifest.matchAll(/file:\s*"([^"]+\.md)"/g)].map((match) => match[1]);
const lessonIds = [...manifest.matchAll(/\{ id:\s*"([^"]+)", number:\s*\d+, title:[\s\S]*?file:/g)].map((match) => match[1]);
const moduleMatches = [...manifest.matchAll(/id:\s*"(understand|prepare|create)"/g)];
if (moduleMatches.length !== 3) failures.push(`src/data/course.ts: expected 3 modules, found ${moduleMatches.length}`);
if (files.length !== 10) failures.push(`src/data/course.ts: expected 10 lesson files, found ${files.length}`);
if (new Set(files).size !== files.length) failures.push("src/data/course.ts: duplicate lesson files");
if (new Set(lessonIds).size !== lessonIds.length) failures.push("src/data/course.ts: duplicate lesson IDs");
if (!manifest.includes('status: "RELEASE_CANDIDATE"')) failures.push("src/data/course.ts: course status is not RELEASE_CANDIDATE");
if (!manifest.includes("fomology-flux3-first-win-v2")) failures.push("src/data/course.ts: versioned progress key is missing");

for (const file of files) {
  const relative = `src/content/course/${file}`;
  const markdown = await text(relative);
  const headings = [...markdown.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
  if (JSON.stringify(headings) !== JSON.stringify(requiredSections)) failures.push(`${relative}: required seven headings are missing or out of order`);
  if (markdown.length < 1800) failures.push(`${relative}: lesson is too short to be complete (${markdown.length} chars)`);
  if (/CONTENT_PENDING|TODO|TBD|PLACEHOLDER|lorem ipsum/i.test(markdown)) failures.push(`${relative}: placeholder marker found`);
  if (!/https:\/\//.test(markdown)) failures.push(`${relative}: no official/external reading link`);
}

const lesson2 = await text("src/content/course/02-prompt-shooting-brief.md");
const mentalModel = "Prompt ไม่ใช่คาถาหรือคำสวย ๆ แต่คือใบกำกับฉากที่บอก AI ว่า กล้องควรเห็นอะไร ได้ยินอะไร อะไรต้องเปลี่ยน และคลิปต้องจบที่ภาพไหน";
if (!lesson2.includes(mentalModel)) failures.push("lesson 02: canonical Prompt mental model is missing");

const cases = await text("src/data/flux3-cases.ts");
const canonicalVideos = [
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789977375/final_%E0%B8%9E%E0%B8%B4%E0%B8%86%E0%B8%B2%E0%B8%95%E0%B8%AD%E0%B8%B5%E0%B8%B1%E0%B8%AA%E0%B8%B2%E0%B8%99.mp4",
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789978451/create-a-20-second-thai-3145048883.mp4",
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789977714/%E0%B9%80%E0%B8%97%E0%B9%88.mp4",
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789979128/OP2.mp4",
  "https://res.cloudinary.com/lx5v2ghk/video/upload/v1789979778/%E0%B8%AA%E0%B8%B8%E0%B8%A3%E0%B8%B2%E0%B8%A9%E0%B8%A9%E0%B8%A9%E0%B8%A9.mp4",
];
const videoCount = (cases.match(/videoUrl:\s*videoUrls\[/g) ?? []).length;
const expandedCount = (cases.match(/expanded:\s*true/g) ?? []).length;
if (videoCount !== 5) failures.push(`src/data/flux3-cases.ts: expected 5 cases, found ${videoCount}`);
for (const url of canonicalVideos) if (!cases.includes(url)) failures.push(`src/data/flux3-cases.ts: missing canonical case URL ${url}`);
if (expandedCount !== 3) failures.push(`src/data/flux3-cases.ts: expected 3 expanded cases, found ${expandedCount}`);
if (!cases.includes("ไม่แสดงเป็น Transcript") || !cases.includes("ยังไม่ได้ตรวจเทียบเสียงจริง")) failures.push("Case Library: Prompt/transcript boundary is missing");

const resourcePage = await text("src/app/resources/create-flux3-video/page.tsx");
for (const phrase of ["SHA-256", "Masked", "Dry Run", "402", "429", "Moderated", "Draft Cache", "External Gate"]) if (!resourcePage.includes(phrase)) failures.push(`resource page: missing ${phrase}`);

const release = JSON.parse(await text("src/data/flux3-release.json") || "{}");
if (!/^\d+\.\d+\.\d+-rc\.\d+$/.test(release.version ?? "")) failures.push("release metadata: invalid RC version");
if (release.bflVerifiedAt !== "2026-09-28") failures.push("release metadata: BFL verification date missing or stale");
if (release.resourcePath !== "/resources/create-flux3-video/") failures.push("release metadata: resource path mismatch");
if (typeof release.localAssetPath !== "string" || !release.localAssetPath.endsWith(".zip")) failures.push("release metadata: local asset path missing");
if (typeof release.localChecksumPath !== "string" || !release.localChecksumPath.endsWith(".sha256")) failures.push("release metadata: checksum path missing");
const packageVersion = (await text("packages/create-flux3-video/VERSION")).trim();
if (packageVersion !== release.version) failures.push(`release metadata version ${release.version} does not match package ${packageVersion}`);

if (failures.length) {
  console.error("\nCourse validation failed:\n");
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}
console.log(`Course validation passed: 3 modules, ${files.length} complete lessons, 5 cases, Skill ${release.version}.`);
