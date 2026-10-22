import { createHash } from "node:crypto";
import { readFile, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const publicMode = process.argv.includes("--public");
const localFailures = [];
const externalGates = [];
const course = spawnSync(process.execPath, [path.join(root, "scripts/validate-course.mjs")], { encoding: "utf8" });
if (course.status !== 0) localFailures.push(course.stderr.trim() || "course validation failed"); else process.stdout.write(course.stdout);

const release = JSON.parse(await readFile(path.join(root, "src/data/flux3-release.json"), "utf8"));
const localZip = path.join(root, "public", release.localAssetPath.replace(/^\//, ""));
const localChecksum = path.join(root, "public", release.localChecksumPath.replace(/^\//, ""));
try {
  const bytes = await readFile(localZip);
  const digest = createHash("sha256").update(bytes).digest("hex");
  const checksumText = await readFile(localChecksum, "utf8");
  if (release.localSha256 !== digest) localFailures.push("release metadata localSha256 does not match the built ZIP");
  if (checksumText.split(/\s+/)[0] !== digest) localFailures.push(".sha256 file does not match the built ZIP");
} catch { localFailures.push("local release ZIP or checksum is missing; run npm run build:skill"); }

for (const output of ["out/course/index.html", "out/resources/create-flux3-video/index.html", "out/_next"]) {
  try { await stat(path.join(root, output)); } catch { localFailures.push(`${output} is missing; run npm run build`); }
}
try {
  const html = await readFile(path.join(root, "out/course/index.html"), "utf8");
  const anchors = new Set([...html.matchAll(/id="lesson-([^"]+)"/g)].map((match) => match[1]));
  if (anchors.size !== 10) localFailures.push(`static course export contains ${anchors.size}/10 lesson anchors`);
  if (!html.includes('id="case-library"')) localFailures.push("static course export is missing Case Library anchor");
} catch { /* missing output already reported */ }

if (!release.publicRepositoryUrl) externalGates.push("Public GitHub repository has not been created (requires explicit instruction)");
if (!release.publicReleaseUrl || !release.publicAssetUrl) externalGates.push("Public GitHub Release and immutable asset URL have not been published (requires explicit instruction)");
if (!/^[a-f0-9]{64}$/.test(release.publicSha256 ?? "")) externalGates.push("Published asset SHA-256 is unavailable; local RC checksum is not a public checksum");
if (release.paidSmokeTest !== "PASSED") externalGates.push("Paid FLUX.3 smoke test has not run (requires explicit approval immediately before the paid call)");
if (release.deployment !== "DEPLOYED") externalGates.push("Website has not been deployed (requires a separate explicit instruction)");

if (localFailures.length) {
  console.error("\nLOCAL RELEASE CANDIDATE: FAIL\n");
  localFailures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}
console.log("\nLOCAL RELEASE CANDIDATE: PASS");
console.log(`  Version: ${release.version}`);
console.log(`  SHA-256: ${release.localSha256}`);
console.log("  Course, static routes, package metadata, local asset, checksum: ready\n");
if (externalGates.length) {
  console.log("PUBLIC LAUNCH READINESS: EXTERNAL GATES REMAIN\n");
  externalGates.forEach((gate) => console.log(`  - ${gate}`));
  console.log("\nNo public URL, release checksum, paid result, or deployment was fabricated.");
  if (publicMode) process.exit(2);
} else console.log("PUBLIC LAUNCH READINESS: PASS");
