import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CopyButton } from "@/components/course/copy-button";
import release from "@/data/flux3-release.json";

export const metadata: Metadata = {
  title: "ดาวน์โหลด create-flux3-video Prompt Skill — FOMOLOGY",
  description: "Local Release Candidate, SHA-256, คู่มือติดตั้ง Windows, Dry Run และ Troubleshooting สำหรับ FLUX.3 Prompt Skill",
};

const installCommand = `$zip = ".\\create-flux3-video-v${release.version}.zip"\nGet-FileHash $zip -Algorithm SHA256\n$skills = Join-Path $HOME ".agents\\skills"\nNew-Item -ItemType Directory -Force -Path $skills | Out-Null\nExpand-Archive -Path $zip -DestinationPath $skills -Force\nTest-Path (Join-Path $skills "create-flux3-video\\SKILL.md")`;
const invokePrompt = "$create-flux3-video ใช้โหมด prompt-only สัมภาษณ์ฉันทีละคำถามสำหรับวิดีโอร้านกาแฟ 9:16 8 วินาที มีเสียง ไม่มีบทพูด และห้ามเรียก API";

const troubleshooting = [
  ["หา Skill ไม่เจอ", "ตรวจว่า path จบที่ .agents\\skills\\create-flux3-video\\SKILL.md เพียงหนึ่งระดับ แล้วเปิด Workspace ใหม่"],
  ["โฟลเดอร์ซ้อน", "ย้ายโฟลเดอร์ด้านในขึ้นหนึ่งระดับ; ห้ามเหลือ create-flux3-video\\create-flux3-video"],
  ["Execution Policy บล็อก", "ใช้ Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass หรือถามผู้ดูแลเครื่อง; ไม่เปลี่ยน Policy ถาวร"],
  ["ไม่มี Python", "ใช้ flux3_video.ps1 ซึ่งรองรับ Windows PowerShell 5.1 โดยไม่ต้องติดตั้ง Python"],
  ["API key หาย/ถูกปฏิเสธ", "ให้ Helper ถามแบบ Masked ใหม่ ตรวจ Key ใน Dashboard และอย่าใส่ Key ใน Payload"],
  ["Payload ไม่ผ่าน", "อ่านข้อความ Field/Mode แล้วแก้ก่อน Network; อย่าปิด Validation"],
  ["HTTP 402", "หยุด เติมเครดิต และคง Prompt/Payload เดิม; ห้าม Auto-resubmit"],
  ["HTTP 429", "Helper เคารพ Retry-After เมื่อมี หรือรอแบบ Bounded Backoff เฉพาะคำขอที่ปลอดภัย"],
  ["Request/Content Moderated", "หยุด อ่านเหตุผล แก้เนื้อหาอย่างมีเจตนา; ห้ามส่งซ้ำอัตโนมัติ"],
  ["Polling Error / Task not found", "บันทึก Result JSON และ polling_url ที่ได้จริง ห้ามสร้าง URL ใหม่หรือ Submit ซ้ำทันที"],
  ["Result URL หมดอายุ", "ดาวน์โหลด MP4/Cache ทันทีเมื่อ Ready; ถ้าหมดอายุให้ตรวจ Dashboard ก่อนเสียเครดิตใหม่"],
  ["ไม่มี Draft Cache", "เก็บ Result JSON และตรวจว่า Request เป็น draft=true/hd; อย่าสมมติว่ามี Cache"],
  ["ตัวละคร/Action/Audio เพี้ยน", "กลับไปลด Beat หรือล็อกความเสี่ยงหนึ่งข้อ แล้วเปลี่ยนทีละอย่าง"],
  ["ควรหยุดเมื่อไร", "หยุดเมื่อ 402, Moderation, Error ที่ยังไม่เข้าใจ หรือ Drift ซ้ำ เก็บ Last Good Prompt/Payload/Result/Video/Cache"],
] as const;

export default function SkillResourcePage() {
  const checksumReady = release.localSha256 !== "PENDING_LOCAL_BUILD";
  return <><SiteHeader /><main id="main-content" className="resource-page"><section className="resource-hero"><div className="site-container resource-hero-grid"><div><p className="eyebrow">LOCAL RELEASE CANDIDATE · {release.version}</p><h1>create-flux3-video<br />Prompt Skill</h1><p>สัมภาษณ์ กำกับ ตรวจ Prompt/Payload และช่วย Generate ในเครื่องหลังคุณอนุมัติ—เว็บไซต์ไม่รับ API key หรือไฟล์งานของคุณ</p><div className="resource-actions">{checksumReady ? <a className="button button-blue" href={release.localAssetPath} download>ดาวน์โหลด Local RC ZIP</a> : <span className="button button-disabled" aria-disabled="true">รอ Local Build</span>}<Link className="text-link text-link-blue" href="/course/">กลับไปคอร์ส →</Link></div></div><aside className="release-card" aria-label="Release metadata"><span>STATUS</span><strong>LOCAL RC</strong><dl><div><dt>Version</dt><dd>{release.version}</dd></div><div><dt>BFL verified</dt><dd>{release.bflVerifiedAt}</dd></div><div><dt>SHA-256</dt><dd><code>{release.localSha256}</code></dd></div></dl><p>Public GitHub Release และ Paid Smoke Test ยังเป็น External Gates ไม่มีการสร้าง URL หรือผลทดสอบปลอม</p></aside></div></section>

    <section className="resource-section section-spacing"><div className="site-container resource-two-column"><div><p className="eyebrow">VERIFY & INSTALL</p><h2>ตรวจไฟล์ก่อนติดตั้ง</h2><p>ดาวน์โหลด ZIP กับ <a href={release.localChecksumPath} download>ไฟล์ checksum</a> แล้วเทียบค่า ตัว ZIP มี Root เดียว `create-flux3-video/`</p><div className="course-code"><div className="course-code-head"><span>powershell</span><CopyButton text={installCommand} /></div><pre><code>{installCommand}</code></pre></div></div><div><h2>ทดสอบ Invocation</h2><p>คำสั่งนี้สร้าง Prompt เท่านั้น ไม่อ่าน Key และไม่เรียก API</p><div className="course-code"><div className="course-code-head"><span>prompt</span><CopyButton text={invokePrompt} /></div><pre><code>{invokePrompt}</code></pre></div><div className="safe-key"><strong>กติกา API key</strong><p>กรอกผ่าน Masked Session Input ของ Helper เท่านั้น ห้ามใส่ใน Chat, Prompt, Payload, URL, Log หรือ Command History</p></div></div></div></section>

    <section className="resource-section resource-ink section-spacing"><div className="site-container"><div className="section-intro"><div><p className="eyebrow">PACKAGE CONTENTS</p><h2>หนึ่ง ZIP<br />ครบเส้นทาง Local</h2></div><p>PowerShell เป็นทางหลักบน Windows 10/11 และไม่ต้องใช้ Python ส่วน Python Helper เป็นทาง Cross-platform ที่ใช้ Fixtures ชุดเดียวกัน</p></div><div className="package-grid"><code>SKILL.md</code><code>README.md / README_TH.md</code><code>VERSION / CHANGELOG.md</code><code>ATTRIBUTION.md</code><code>LICENSE / LICENSE-DOCS</code><code>agents/openai.yaml</code><code>references/*.md</code><code>scripts/flux3_video.ps1</code><code>scripts/flux3_video.py</code><code>tests/ + fixtures/</code></div></div></section>

    <section className="resource-section section-spacing"><div className="site-container"><div className="section-intro"><div><p className="eyebrow">DRY RUN → PAID SUBMIT</p><h2>เห็นทุกค่าก่อนใช้เครดิต</h2></div><p>ทั้งสอง Helper Validate ก่อน Network แสดง Prompt/Settings และถาม `Submit this paid generation? [y/N]` โดย Enter เท่ากับ No</p></div><ol className="resource-flow"><li><span>01</span>Validate mode-specific fields</li><li><span>02</span>Dry Run โดยไม่อ่าน Key</li><li><span>03</span>แสดง Prompt + Settings</li><li><span>04</span>Masked Key + explicit approval</li><li><span>05</span>Submit ครั้งเดียว</li><li><span>06</span>Poll returned URL + download artifacts</li></ol></div></section>

    <section className="resource-section troubleshooting section-spacing" id="troubleshooting"><div className="site-container"><p className="eyebrow">TROUBLESHOOTING</p><h2>แก้ปัญหาโดยไม่ทิ้งงานที่ดี</h2><div className="troubleshooting-grid">{troubleshooting.map(([problem, recovery]) => <article key={problem}><h3>{problem}</h3><p>{recovery}</p></article>)}</div></div></section>

    <section className="resource-section section-spacing"><div className="site-container resource-meta"><div><p className="eyebrow">CHANGELOG · LICENSES · ATTRIBUTION</p><h2>Release Candidate ที่ตรวจย้อนกลับได้</h2><p>รายละเอียดอยู่ใน ZIP: Code/Scripts ใช้ MIT; เอกสารและ Prompt Examples ใช้ CC BY 4.0; วิดีโอ FOMOLOGY ที่ลิงก์ภายนอกไม่อยู่ใต้ License เหล่านี้ Attribution รักษาเครดิต Visual Skills และ Interview Pattern</p></div><ul><li><a href="https://docs.bfl.ai/api-reference/utility/generate-a-video-with-flux-3" target="_blank" rel="noopener noreferrer">BFL FLUX.3 API ↗</a></li><li><a href="https://learn.chatgpt.com/docs/build-skills" target="_blank" rel="noopener noreferrer">OpenAI Build Skills ↗</a></li><li><span>Public repository: External Gate</span></li><li><span>Latest public release: External Gate</span></li></ul></div></section>
  </main><SiteFooter /></>;
}
