const path = [
  { number: "01", label: "ทำความเข้าใจ", detail: "ฟังโจทย์ คนที่จะใช้ และผลลัพธ์ที่ต้องการ" },
  { number: "02", label: "ออกแบบ", detail: "จัดโครงสร้าง ลดความเสี่ยง และทำให้ทางเลือกชัด" },
  { number: "03", label: "ลงมือสร้าง", detail: "ทำชิ้นงาน ทดสอบ และปรับกับสถานการณ์จริง" },
  { number: "04", label: "ส่งมอบ", detail: "สรุปวิธีใช้ และส่งต่องานที่พร้อมนำไปใช้" },
] as const;

export function JourneySection() {
  return (
    <section className="journey-section" aria-labelledby="journey-heading">
      <div className="site-container journey-bridge">
        <div className="journey-copy" data-reveal>
          <p className="eyebrow">HOW WE WORK / CLEAR AT EVERY STEP</p>
          <h2 id="journey-heading">จากปัญหา<br />ไปสู่งานที่พร้อมใช้</h2>
          <p>เราทำให้แต่ละขั้นตอนชัด เพื่อให้คุณรู้ว่ากำลังตัดสินใจอะไร และจะได้รับอะไรเมื่อส่งมอบ</p>
        </div>
        <ol className="journey-path" data-trace aria-label="ขั้นตอนการทำงานจากทำความเข้าใจถึงส่งมอบ">
          {path.map((step) => (
            <li key={step.number} className="journey-point">
              <span className="journey-point-number">{step.number}</span>
              <div>
                <h3>{step.label}</h3>
                <p>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
