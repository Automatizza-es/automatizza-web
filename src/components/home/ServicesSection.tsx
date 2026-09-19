import { Container } from "@/components/layout/Container";

const services = [
  {
    number: "01",
    title: "Automatización e integraciones",
    text: "Conectamos herramientas y automatizamos tareas entre sistemas para reducir trabajo manual y errores.",
    signal: "Sistemas conectados",
  },
  {
    number: "02",
    title: "Aplicaciones empresariales",
    text: "Desarrollamos herramientas adaptadas a procesos específicos: CRM, gestión interna, presupuestos, logística y otras necesidades.",
    signal: "Software a medida",
  },
  {
    number: "03",
    title: "Inteligencia artificial aplicada",
    text: "Utilizamos IA cuando aporta valor para interpretar información, clasificar datos, extraer contenido o asistir determinados procesos.",
    signal: "IA con propósito",
  },
];

export function ServicesSection() {
  return (
    <section className="services-section" id="servicios" aria-labelledby="services-title">
      <Container>
        <div className="services-intro" data-reveal>
          <p className="section-eyebrow">QUÉ HACEMOS</p>
          <h2 id="services-title">Tecnología aplicada a problemas concretos</h2>
          <p>
            La solución puede ser una automatización sencilla, una aplicación a medida o un
            sistema que conecte varias áreas. La tecnología se decide después de entender el
            proceso.
          </p>
        </div>

        <div className="services-decision" data-reveal>
          <div className="decision-input"><span>PUNTO DE PARTIDA</span><strong>Problema o proceso</strong></div>
          <div className="decision-analysis"><i aria-hidden="true" /><span>ANÁLISIS</span><strong>¿Qué tecnología tiene sentido?</strong></div>
          <div className="decision-capabilities">
            {services.map((service, index) => (
              <article className="decision-capability" key={service.number}>
                <span className="service-signal"><i aria-hidden="true" />{service.signal}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                {index === 2 ? (
                  <aside className="ai-criterion">
                    No utilizamos inteligencia artificial cuando una regla sencilla resuelve mejor
                    el problema.
                  </aside>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
