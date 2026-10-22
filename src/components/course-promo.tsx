import Link from "next/link";

export function CoursePromo() {
  return (
    <section className="course-promo" aria-labelledby="course-promo-title">
      <div className="site-container course-promo-grid">
        <div className="course-mark" data-reveal>
          <span>15</span>
          <small>MINUTES</small>
        </div>
        <div className="course-promo-copy" data-reveal>
          <p className="eyebrow eyebrow-on-blue">FREE COURSE · FIRST WIN</p>
          <h2 id="course-promo-title">ทำวิดีโอแรก<br />ให้พร้อมโพสต์</h2>
          <p>
            คอร์สสั้น 3 ช่วง พาคุณทำวิดีโอ 15–30 วินาทีให้จบในครั้งเดียว
            ไม่ต้องล็อกอิน ระบบบันทึกความคืบหน้าไว้บนอุปกรณ์ของคุณ
          </p>
          <ol className="course-steps" aria-label="สามช่วงของคอร์ส">
            <li><span>01</span> ไอเดีย → ทิศทาง</li>
            <li><span>02</span> ทิศทาง → วิดีโอ</li>
            <li><span>03</span> วิดีโอ → พร้อมโพสต์</li>
          </ol>
          <Link className="button button-on-blue" href="/course">เริ่มคอร์สฟรี <span aria-hidden="true">→</span></Link>
        </div>
      </div>
    </section>
  );
}
