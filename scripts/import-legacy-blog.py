"""One-off, reproducible import of the owner's local blog manuscripts.

Usage: python3 scripts/import-legacy-blog.py SITE_APP_DIR DOCX_DIR
The generated Markdown is checked into FOMOLOGY; the website never reads the old site.
"""

from pathlib import Path
import re
import shutil
import sys
import zipfile
from xml.etree import ElementTree as ET


POSTS = {
    "notebooklm-expert-notes": "Clone Experts with NotebookLM.docx",
    "sme-chatbot": "การใช้ Chat Bot แอดมินใน SME.docx",
    "personal-expense-app": "ผมทำแอพ รายรับ-รายจ่าย ที่ทำมาแค่เพื่อผม.docx",
    "strategic-navigator": "สร้าง The Strategic Navigator\u00a0ผู้ช่วย AI วิเคราะห์คริปโตส่วนตัวด้วย n8n.docx",
}

SECTION_MARKERS = {
    "notebooklm-expert-notes": [
        ("ทำไมต้องดึง Data", "## ทำไมต้องดึงข้อมูลจาก YouTube"),
        ("The Secret Weapon", "## นำแหล่งข้อมูลเข้า NotebookLM"),
        ("🛠️ ขั้นตอน", "## เตรียมข้อมูล"),
        ("🔥 ขั้นตอนสำคัญ", "## สกัดความรู้ด้วย 3 Prompt"),
        ("Step 1:", "### Step 1 / Master Outline"),
        ("Step 2:", "### Step 2 / Deep-dive"),
        ("Step 3:", "### Step 3 / Glossary"),
        ("🎉 นำไปต่อยอด", "## นำไปต่อยอด"),
        ("⚠️ Wake Up Call", "## ข้อควรคิดก่อนนำไปใช้"),
    ],
    "sme-chatbot": [
        ("ค่าใช้จ่ายในการใช้ AI", "## ค่าใช้จ่ายในการใช้ AI แทนมนุษย์ยังแพงอยู่ไหม"),
        ("ผมเริ่มจาก ท่ามาตรฐาน", "## เริ่มจาก workflow ที่เรียบง่าย"),
        ("Phase 2:", "## Phase 2 / เชื่อมข้อมูลร้าน"),
        ("Phase 3:", "## Phase 3 / จัดการความรู้ด้วย RAG"),
        ("Phase 4:", "## Phase 4 / ส่งต่องานให้แอดมิน"),
        ("🎯 บทสรุป", "## บทสรุป"),
    ],
    "personal-expense-app": [
        ("โปรเจคนี้ทำงานยังไง", "## ระบบนี้ทำงานอย่างไร"),
        ("วิธีนำ Workflow", "## วิธีนำ workflow ไปทดลอง"),
    ],
    "strategic-navigator": [
        ("Data Ingestion", "## 01 / Data Ingestion"),
        ("2. The Trading Memory", "## 02 / Trading Memory"),
        ("3. Data Aggregator", "## 03 / Data Aggregator"),
        ("4. AI Agent", "## 04 / AI Agent"),
        ("🎉 ผลลัพธ์", "## ผลลัพธ์ของการทดลอง"),
    ],
}


def read_docx(path: Path) -> list[str]:
    with zipfile.ZipFile(path) as archive:
        root = ET.fromstring(archive.read("word/document.xml"))
    namespace = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    paragraphs = []
    for paragraph in root.findall(".//w:p", namespace):
        text = "".join(node.text or "" for node in paragraph.findall(".//w:t", namespace)).strip()
        if text:
            paragraphs.append(text)
    return paragraphs


def sanitize(slug: str, paragraphs: list[str]) -> list[str]:
    cleaned = []
    for paragraph in paragraphs:
        if slug == "personal-expense-app" and paragraph.startswith("VDO สาธิต:"):
            cleaned.append("[วิดีโอสาธิตจากต้นฉบับถูกพักไว้เพื่อตรวจข้อมูลส่วนตัวก่อนเผยแพร่]")
            continue
        # The source pasted raw n8n node exports, including a machine instance ID.
        # The explanatory prose is kept, but exports are not safe to publish.
        if slug == "strategic-navigator" and (
            paragraph.startswith('{  "nodes":')
            or paragraph.startswith("// ดึงข้อมูลย้อนหลังจากกล่องต่างๆ")
        ):
            cleaned.append("[ตัวอย่างโค้ด/Workflow export จากต้นฉบับถูกพักไว้เพื่อตรวจข้อมูลภายในก่อนเผยแพร่]")
            continue
        cleaned.append(re.sub(r"\s+", " ", paragraph))
    return cleaned


def add_structure(slug: str, paragraphs: list[str]) -> list[str]:
    structured = []
    for paragraph in paragraphs:
        marker = next((heading for prefix, heading in SECTION_MARKERS.get(slug, []) if paragraph.startswith(prefix)), None)
        if marker:
            if len(paragraph) <= 100:
                level = "###" if marker.startswith("###") else "##"
                structured.append(f"{level} {paragraph}")
                continue
            structured.append(marker)
        structured.append(paragraph)
    return structured


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit(__doc__)
    site_app = Path(sys.argv[1])
    docx_dir = Path(sys.argv[2])
    destination = Path("src/content/blog")
    destination.mkdir(parents=True, exist_ok=True)

    for name in ("turning-knowledge-into-action", "blockchain-beginner-guide"):
        shutil.copyfile(site_app / "src/blog" / f"{name}.mdx", destination / f"{name}.md")

    for slug, filename in POSTS.items():
        paragraphs = add_structure(slug, sanitize(slug, read_docx(docx_dir / filename)))
        paragraphs[0] = "# " + paragraphs[0]
        (destination / f"{slug}.md").write_text("\n\n".join(paragraphs) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
