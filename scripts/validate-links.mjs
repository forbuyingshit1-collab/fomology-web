import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const live = process.argv.includes("--live");
const failures = [];
const external = new Set();

async function walk(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) output.push(...await walk(full)); else output.push(full);
  }
  return output;
}

for (const directory of ["src/content/course", "src/app/course", "src/app/resources", "src/data"]) {
  for (const file of (await walk(path.join(root, directory))).filter((item) => /\.(md|ts|tsx)$/.test(item))) {
    const content = await readFile(file, "utf8");
    for (const match of content.matchAll(/https:\/\/[^\s)'"`]+/g)) {
      const cleaned = match[0].replace(/[.,;]+$/, "");
      try { new URL(cleaned); external.add(cleaned); } catch { failures.push(`${path.relative(root, file)}: malformed URL ${cleaned}`); }
    }
    if (/href=["']http:/.test(content)) failures.push(`${path.relative(root, file)}: insecure external link`);
  }
}

const caseData = await readFile(path.join(root, "src/data/flux3-cases.ts"), "utf8");
const cloudinaryVideos = [...caseData.matchAll(/https:\/\/res\.cloudinary\.com\/lx5v2ghk\/video\/upload\/[^"\s]+\.mp4/g)].map((match) => match[0]);
if (cloudinaryVideos.length !== 5 || new Set(cloudinaryVideos).size !== 5) failures.push("Case Library must contain five unique direct Cloudinary MP4 URLs");
for (const route of ["src/app/course/page.tsx", "src/app/resources/create-flux3-video/page.tsx"]) {
  try { if (!(await stat(path.join(root, route))).isFile()) failures.push(`${route}: route file missing`); } catch { failures.push(`${route}: route file missing`); }
}

if (live) {
  for (const url of [...external].filter((item) => !item.includes("example.com") && !item.includes("?key="))) {
    try {
      let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(20000) });
      if ([403, 405].includes(response.status)) response = await fetch(url, { method: "GET", headers: { Range: "bytes=0-0" }, redirect: "follow", signal: AbortSignal.timeout(20000) });
      if (response.status >= 400 && response.status !== 429) failures.push(`${url}: HTTP ${response.status}`); else console.log(`OK ${response.status} ${url}${response.status === 429 ? " (reachable; rate limited)" : ""}`);
    } catch (error) { failures.push(`${url}: ${error.message}`); }
  }
}

if (failures.length) {
  console.error("\nLink validation failed:\n");
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}
console.log(`Link validation passed: ${external.size} external URLs parsed${live ? " and checked live" : ""}; five case videos present.`);
