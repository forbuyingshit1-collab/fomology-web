# Clone Experts with NotebookLM

ถอดวิชา YouTuber 300 คลิป: สร้าง AI ผู้ช่วยส่วนตัวด้วย NotebookLM (Step-by-Step)

ช่วงนี้ใครๆ ก็เริ่มหันมาสร้าง Personal Bot ของตัวเองกันเยอะมาก ไม่ว่าจะเอาไว้ช่วยเทรด ช่วยวิเคราะห์งาน หรือเป็นที่ปรึกษาเฉพาะด้าน

แต่ปัญหาโลกแตกที่นักพัฒนาหรือคนทำ AI ต้องเจอคือ… “เราจะเอา Data เฉพาะทางเจ๋งๆ จากไหนมาสอนน้อง?”

วันนี้ผมมีทริค (ที่แอบโกงนิดๆ) ในสายรีเสิร์ชมาแชร์ครับ ไอเดียคือการทำ RAG (Retrieval-Augmented Generation) โดยการให้ AI ไป “สกัดความรู้” ทั้งหมดจาก YouTuber ที่เราชื่นชอบ ผ่านเครื่องมือระดับเทพอย่าง NotebookLM ของ Google แบบง่ายๆ ในคลิกเดียว!

## ทำไมต้องดึง Data จาก YouTube เข้า NotebookLM?

ถ้าเราไปถาม ChatGPT หรือ Gemini ตรงๆ ว่า “สอนเทรดหน่อย” น้องมักจะตอบกว้างๆ เอาทฤษฎีนั้นผสมทฤษฎีนี้ แต่อย่างเรื่อง “การเทรด” มันมีหลายสไตล์ ไม่มีถูกผิดตายตัวครับ

การใช้ NotebookLM จะแก้ปัญหานี้ได้เด็ดขาด เพราะน้องเป็น AI ที่จะตอบคำถามจากข้อมูลที่เรากำหนดเท่านั้น ถ้าน้องวิเคราะห์คลิปของอาจารย์คนนี้ น้องก็จะตอบอิงจาก “แนวคิดของอาจารย์คนนี้เท่านั้น” ไม่มั่วนิ่มเอาทฤษฎีอื่นมาปนครับ

## The Secret Weapon: ดูดความรู้ 300 คลิปใน 1 คลิก 🚀

ความลับที่หลายคนยังไม่รู้คือ มันมีส่วนเสริม (Extension) บน Chrome ที่ทำให้เราสามารถนำเข้าคลิป YouTube ทั้งช่องเข้าไปใน NotebookLM ได้เลย

## 🛠️ ขั้นตอนการเตรียม Data:

ไปที่ Chrome Web Store ค้นหาและติดตั้ง Extension ที่ชื่อว่า “YouTube to NotebookLM” (ตอนนี้มีคนใช้ทะลุ 100,000 users แถมได้เรตติ้ง 4.9 ดาวเลยทีเดียว! )

หาต้นแบบ: เข้า YouTube ไปที่หน้าช่องของคนที่เราชื่นชอบ (ในเคสนี้ผมเลือกวิเคราะห์ช่องของ Rayner Teo ปรมาจารย์ด้านการเทรดที่มีผู้ติดตามกว่า 2 ล้านคน )

คลิกเดียวจบ: สังเกตที่หน้าช่องใต้ชื่อและยอดซับ จะมีปุ่ม “NotebookLM” โผล่ขึ้นมา กดปุ่มนี้เลยครับ!

AI รวบรวมข้อมูล: ระบบจะดึงข้อมูลคลิปมาใส่ใน NotebookLM ของเราทันที ในคลิกเดียวผมดึง Data เข้ามาได้ถึง 298 แหล่งข้อมูล (Sources) ซึ่งเกือบชนเพดาน Limit สูงสุดที่ NotebookLM รับได้ (300 Sources ต่อ 1 Notebook) โหดจัด!!

## 🔥 ขั้นตอนสำคัญ: “สกัดความรู้” ด้วย Prompt 3 สเต็ป

พอได้ Data มาเกือบ 300 คลิปแล้ว อย่าเพิ่งปล่อยให้น้องสรุปเองมั่วๆ นะครับ เราต้องค่อยๆ ตะล่อมถามเพื่อสกัดความรู้ออกมาทำโครงสร้าง Data ให้เป๊ะที่สุด ผมใช้สูตร Prompt 3 สเต็ปนี้ (ก๊อปไปใช้ได้เลย):

### Step 1: สร้าง Master Outline (สารบัญโครงสร้าง)

ขั้นแรกเราต้องสั่งให้น้องกาง “สารบัญ” ของกลยุทธ์ทั้งหมดออกมาให้ดูก่อน โดยยังไม่ต้องอธิบายรายละเอียด เพื่อดูว่าใน 300 คลิปนี้มีแก่นความรู้อะไรบ้าง

Prompt 1:

"Act as an Expert Quantitative Analyst and Data Architect. Analyze all provided sources (Rayner Teo's trading videos) and generate a highly detailed, hierarchical Master Outline. Cover every trading strategy, technical indicator, risk management rule, and theoretical concept mentioned. Do not explain the concepts yet; just provide the most comprehensive taxonomy and structural index possible."

### Step 2: เจาะลึกข้อมูลทีละหัวข้อ (Deep-dive)

เมื่อได้สารบัญแล้ว เราจะสั่งเจาะข้อมูลตามสารบัญนั้นทีละข้อ โดยบังคับใช้กฎ “Zero Summarization” (ห้ามสรุปย่อ) และให้ออกมาเป็นตรรกะ ‘If-Then’ เพื่อเอาไปเขียนโค้ดต่อได้ง่ายๆ

Prompt 2:

"Based on the Master Outline, perform a deep-dive extraction for this specific section: [Insert Section Name Here].Strict Guidelines:Zero Summarization: Extract every granular detail, statistical data point, hard rule, parameter, and contextual example. Treat this as a comprehensive academic research paper. 2. RAG-Optimized Format: Structure the response using Markdown (#, ##, ###), bullet points, and tables. 3. Algorithmic Logic: If any entry/exit rules, portfolio sizing, or indicator setups are mentioned, articulate them clearly as 'If-Then' conditional logic. 4. Citations: Include precise citation numbers for every factual claim."

### Step 3: ทำพจนานุกรม (Glossary)

สุดท้าย สั่งให้ลิสต์คำศัพท์เทคนิคทั้งหมดที่ YouTuber คนนี้ชอบใช้ พร้อมความหมาย เพื่อเป็น Knowledge Base ให้บอทของเราเข้าใจศัพท์เฉพาะทาง

Prompt 3:

"To complete the Knowledge Graph, extract a comprehensive Glossary from all sources. List all technical trading terms, indicator acronyms, and specific jargon used by Rayner Teo. Provide a precise definition and the specific context of how he uses each term, formatted as a clear Key-Value pair or a Markdown table."

## 🎉 นำไปต่อยอด (Next Steps)

เท่านี้ก็เสร็จครับ! เราจะได้ Data โครงสร้างเป๊ะๆ ที่กลั่นมาจากคลิปเกือบ 300 คลิป

ข้อมูลที่จัดระเบียบแบบ If-Then logic นี้ เราสามารถเอาไปประยุกต์ใช้ต่อได้เยอะมาก ไม่ว่าจะเป็น:

เอาไปเขียน Python เพื่อรันเป็นบอทเทรดอัตโนมัติ

เอาชุดข้อมูลไปโยนเข้าแพลตฟอร์มอย่าง n8n เพื่อทำ Workflow สร้าง AI Chatbot (RAG) ไว้เป็นที่ปรึกษาการลงทุนส่วนตัวของเราเอง

## ข้อควรคิดก่อนนำไปใช้

⚠️ Wake Up Call: เพื่อเป็นไอเดียให้คนที่กำลังเทรนบอทอยู่และไม่มี Data ใช้นะครับ วิธีนี้ทรงพลังมากในการดึง Knowledge Base เฉพาะทาง ผมเดาว่าอีกไม่นานแพลตฟอร์มต่างๆ อาจจะเริ่มมาจำกัดการดึงข้อมูลลักษณะนี้แน่ๆ เพราะความรู้ของแต่ละช่องนั้นมีมูลค่ามหาศาล

ตอนนี้ใครมีเวลา รีบโหลด รีบเล่น รีบเรียนรู้กันครับ!
