import { fastworkUrl } from "@/data/site";

export function ContactSection() {
  return (
    <section className="contact-section section-spacing" aria-labelledby="contact-heading">
      <div className="site-container contact-grid">
        <div data-reveal>
          <p className="eyebrow">READY WHEN YOU ARE / PROJECT CONSULTATION</p>
          <h2 id="contact-heading">มีโจทย์อยู่แล้ว<br />มาช่วยกันทำให้ชัด</h2>
        </div>
        <div className="contact-copy" data-reveal>
          <p>เล่าปัญหา ผลลัพธ์ที่อยากได้ หรือขั้นตอนที่ติดอยู่มาได้ เราจะช่วยแยกโจทย์และมองหาทางเริ่มที่เหมาะกับงานของคุณ</p>
          <a href={fastworkUrl} target="_blank" rel="noopener noreferrer" className="button button-ink">
            คุยงานผ่าน Fastwork <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
