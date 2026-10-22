export function LearnCreateSection() {
  return (
    <section className="learn-create section-spacing" aria-labelledby="learn-create-title">
      <div className="site-container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">LEARN & CREATE / ANOTHER WAY TO BEGIN</p>
          <h2 id="learn-create-title">อยากเริ่มทำ<br />ด้วยตัวเอง?</h2>
          <p>นอกจากงานรับทำ เรากำลังเตรียมคอร์สและพื้นที่ทดลอง เพื่อให้คุณได้เรียนรู้และลองสร้างในจังหวะของตัวเอง</p>
        </div>
        <div className="learn-create-grid">
          <article className="learn-create-card learn-create-course" data-reveal>
            <div className="learn-create-status"><span>COURSE</span><strong>IN DEVELOPMENT</strong></div>
            <span className="learn-create-index">01</span>
            <h3>ทำวิดีโอแรก<br />ให้พร้อมโพสต์</h3>
            <p>คอร์สสั้นที่พาจากไอเดียไปสู่วิดีโอชิ้นแรก กำลังจัดทำเนื้อหาให้ครบก่อนเปิดใช้งาน</p>
          </article>
          <article className="learn-create-card learn-create-lab" data-reveal>
            <div className="learn-create-status"><span>FOMOLOGY LAB</span><strong>PREVIEW</strong></div>
            <span className="learn-create-index">02</span>
            <h3>พื้นที่ลอง<br />ก่อนสร้างจริง</h3>
            <p>พื้นที่สำหรับทดลอง prompt, workflow และเครื่องมือที่เราใช้ในการทำงาน ยังไม่เปิดให้ใช้งาน</p>
          </article>
        </div>
      </div>
    </section>
  );
}
