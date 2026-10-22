import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/products";
import { fastworkUrl } from "@/data/site";

type ServicePillarsProps = {
  variant: "compact" | "full";
};

const pillars = [
  {
    number: "01",
    label: "CONTENT & DIGITAL EXPERIENCE",
    title: "สื่อและประสบการณ์ดิจิทัล",
    description: "ช่วยจัดเรื่องที่อยากสื่อสาร แล้วเปลี่ยนให้เป็นภาพ วิดีโอ หรือเว็บไซต์ที่เข้าใจง่ายและพร้อมเผยแพร่",
    serviceIndexes: [3, 0],
  },
  {
    number: "02",
    label: "SYSTEMS & AUTOMATION",
    title: "ระบบและ Automation",
    description: "ช่วยแยกงานที่ซ้ำ ข้อมูลที่กระจัดกระจาย และขั้นตอนที่ติดขัด ก่อนออกแบบระบบที่ทีมใช้งานต่อได้จริง",
    serviceIndexes: [1, 2],
  },
] as const;

export function ServicePillars({ variant }: ServicePillarsProps) {
  return (
    <section id="services" className={`service-pillars service-pillars-${variant} section-spacing editorial-band`} aria-labelledby={`service-pillars-${variant}-title`}>
      <div className="site-container">
        <div className="section-intro" data-reveal>
          <p className="eyebrow">WHAT WE HELP YOU BUILD</p>
          <h2 id={`service-pillars-${variant}-title`}>เล่าโจทย์มา<br />เราช่วยหาวิธีทำ</h2>
          <p>เราไม่เริ่มจากแพ็กเกจตายตัว แต่เริ่มจากปัญหา คนที่จะใช้ และผลลัพธ์ที่คุณต้องการ</p>
        </div>

        <div className="pillar-list">
          {pillars.map((pillar) => (
            <article className="service-pillar" key={pillar.number} data-reveal>
              <header className="service-pillar-header">
                <span className="pillar-number">{pillar.number}</span>
                <div>
                  <p className="mono-label">{pillar.label}</p>
                  <h3>{pillar.title}</h3>
                </div>
                <p>{pillar.description}</p>
              </header>
              <div className="pillar-service-grid">
                {pillar.serviceIndexes.map((serviceIndex) => {
                  const service = services[serviceIndex];
                  const anchorId = service.title === "AI Video Production"
                    ? "service-ai-video"
                    : service.title === "Automation & Integrations"
                      ? "service-automation"
                      : undefined;
                  return (
                    <div id={anchorId} className="pillar-service-card" key={service.number}>
                      <div className="pillar-service-image" aria-hidden="true">
                        <Image src={service.image} alt="" fill sizes="(max-width: 700px) 96px, 140px" />
                      </div>
                      <div>
                        <span className="mono-label">{service.number}</span>
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                        {variant === "full" && (
                          <div className="service-card-details-desktop">
                            <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
                            <small>{service.scope}</small>
                          </div>
                        )}
                      </div>
                      <details className="mobile-card-details service-mobile-details">
                        <summary>ดูเพิ่มเติม <span aria-hidden="true">+</span></summary>
                        <ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
                        <small>{service.scope}</small>
                      </details>
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>

        <div className="service-pillar-close" data-reveal>
          <div>
            <p className="mono-label">NOT SURE WHAT TO CALL IT?</p>
            <h3>ยังไม่แน่ใจว่าต้องเริ่มจากอะไร?</h3>
          </div>
          <div>
            <p>ส่งขั้นตอนที่ทำอยู่ หรือเล่าจุดที่ติดมาได้ เราจะช่วยแยกโจทย์และเสนอทางเริ่มที่เหมาะกับงานจริง</p>
            {variant === "full" ? (
              <a href={fastworkUrl} target="_blank" rel="noopener noreferrer" className="button button-on-blue">คุยงานผ่าน Fastwork <span aria-hidden="true">↗</span></a>
            ) : (
              <Link href="/products" className="button button-on-blue">ดูบริการทั้งหมด <span aria-hidden="true">→</span></Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
