import Image from "next/image";

export function LabPreview() {
  return (
    <section className="lab-preview section-spacing" aria-labelledby="lab-title">
      <div className="site-container lab-grid">
        <div data-reveal>
          <p className="eyebrow">AFTER THE FIRST WIN</p>
          <h2 id="lab-title">ทำวิดีโอแรกได้แล้ว<br />ต่อไปลองอะไรใหม่ ๆ</h2>
        </div>
        <div className="lab-flow" data-trace aria-label="เส้นทางใน FOMOLOGY Lab สำหรับโปรเจกต์ใหม่">
          <span className="lab-node">NEW IDEA</span>
          <span className="lab-arrow" aria-hidden="true">→</span>
          <span className="lab-node">DRAFT</span>
          <span className="lab-arrow" aria-hidden="true">→</span>
          <span className="lab-node">FINAL</span>
          <span className="lab-arrow" aria-hidden="true">→</span>
          <span className="lab-node">4K ENHANCE</span>
        </div>
        <figure className="lab-art" data-reveal>
          <Image
            src="/editorial/lab-storyboard.webp"
            alt="ภาพคอลลาจแสดงการพัฒนาไอเดียใหม่จากภาพร่างสีแดงไปสู่วิดีโอสำเร็จสีฟ้า"
            fill
            sizes="(max-width: 900px) 100vw, 86vw"
          />
        </figure>
        <div className="lab-copy" data-reveal>
          <p>
            FOMOLOGY Lab คือพื้นที่สำหรับทดลองไอเดียใหม่หลังจากทำวิดีโอแรก
            เริ่มจากร่างงาน ปรับจนเสร็จ และเพิ่มความละเอียด 4K เมื่อจำเป็น
          </p>
          <span className="coming-soon" aria-disabled="true">LAB · COMING SOON</span>
        </div>
      </div>
    </section>
  );
}
