import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import faqStyles from "@/components/home/FaqSection.module.css";
import styles from "./ProcessAutomationPage.module.css";
import { ProcessAutomationMotion } from "./ProcessAutomationMotion";

// Approved Spanish copy. Other languages are added to the route registry only
// once their complete page is ready; this view is not a translation fallback.
const examples = [
  ["Solicitudes y seguimiento comercial", "Registrar las solicitudes que llegan por formulario o correo, asignarlas al responsable y organizar los siguientes pasos."],
  ["Documentos y presupuestos", "Preparar documentos a partir de datos y plantillas, organizar archivos y extraer información para su revisión y registro."],
  ["Conexión entre herramientas", "Compartir información entre el CRM, el correo, hojas de cálculo y otras aplicaciones, según las posibilidades de integración de cada sistema."],
  ["Avisos y tareas pendientes", "Enviar recordatorios, comunicar cambios de estado y avisar cuando falta información o hace falta una revisión."],
];
const steps = [
  ["Entendemos cómo funciona hoy", "Revisamos los pasos y las herramientas de tu equipo para localizar tareas duplicadas y puntos donde se pierde información"],
  ["Definimos qué cambiar", "Acordamos qué automatizar, qué necesita aprobación y cómo gestionar las excepciones"],
  ["Construimos y probamos", "Conectamos las herramientas y probamos tanto las situaciones habituales como los posibles fallos"],
  ["Lo ponemos en marcha", "Lo probamos con tu equipo y acordamos el mantenimiento y los cambios posteriores, con la posibilidad de ampliar por fases"],
];
const questions = [
  ["¿Podemos mantener los programas que utilizamos?", "Siempre que permitan una conexión adecuada, partimos de las herramientas existentes. Si alguna impone limitaciones, valoramos las alternativas antes de proponer un cambio."],
  ["¿Hace falta inteligencia artificial?", "No siempre. Muchas tareas se resuelven conectando aplicaciones y definiendo reglas. Cuando hay que interpretar mensajes o documentos, valoramos si la IA resulta adecuada y qué comprobaciones necesita."],
  ["¿Cómo se calcula el coste?", "Depende de los pasos, las integraciones y las excepciones que deba gestionar la solución. La propuesta debe distinguir el trabajo inicial de los costes recurrentes de herramientas, infraestructura y mantenimiento."],
  ["¿Cómo sabemos si ha merecido la pena?", "Antes de empezar podemos acordar qué observar: tiempo dedicado, registros duplicados, errores o solicitudes pendientes. Comparar el funcionamiento anterior con el nuevo permite valorar el resultado sin confundir una estimación con un ahorro demostrado."],
];

export default function ProcessAutomationPage() {
  return <>
    <Header redesign homeLinks />
    <ProcessAutomationMotion />
    <main id="process-automation-content" className={styles.page}>
      <section className={styles.hero} aria-labelledby="automation-title">
        <Container className="editorial-container">
          <Link className={styles.back} href="/#servicios"><span aria-hidden="true">←</span> Todos los servicios</Link>
          <p className={styles.eyebrow}>SERVICIOS / AUTOMATIZACIÓN</p>
          <div className={styles.heroGrid} data-service-reveal>
            <h1 id="automation-title">Automatización de procesos para empresas</h1>
            <div className={styles.copy}>
              <p>Conectamos aplicaciones y automatizamos tareas repetitivas para que la información llegue donde hace falta, sin tener que trasladarla a mano cada vez.</p>
              <p>Empezamos por entender cómo trabaja tu equipo y qué proceso necesita mejorar.</p>
              <Link className={`button button-primary ${styles.button}`} href="/contacto">Hablemos de tu proceso <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="manual-work-title">
        <Container className="editorial-container">
          <div className={styles.sectionIntro} data-service-reveal>
            <h2 id="manual-work-title">¿Dónde se puede reducir el trabajo manual?</h2>
          </div>
          <ul className={styles.examples} data-service-reveal>
            {examples.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
          </ul>
        </Container>
      </section>

      <section className={styles.case} aria-labelledby="silos-example-title">
        <Container className={`editorial-container ${styles.caseInner}`} data-service-reveal>
          <figure className={styles.caseFigure}>
            <Image className={styles.casePhoto} src="/images/services/silos-spain-team.jpg" alt="Equipo de Silos Spain en la fábrica." width={598} height={454} sizes="(max-width: 600px) calc(100vw - 32px), 360px" />
            <figcaption>Con el equipo de Silos Spain en la fábrica</figcaption>
          </figure>
          <div className={styles.copy}>
            <h2 id="silos-example-title">Así lo aplicamos en Silos Spain</h2>
            <p>En el proyecto de Silos Spain desarrollamos una plataforma que reúne solicitudes, contactos, oportunidades y presupuestos en un mismo entorno.</p>
            <p>El CRM sirve como núcleo para conectar progresivamente procesos comerciales y administrativos. El equipo puede consultar la información y continuar el trabajo sin depender de herramientas aisladas.</p>
            <Link className={styles.textLink} href="/proyectos/silos-spain">Ver el proyecto de Silos Spain <span aria-hidden="true">→</span></Link>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="approach-title">
        <Container className="editorial-container">
          <h2 id="approach-title" data-service-reveal>Cómo lo ponemos en marcha</h2>
          <ol className={styles.steps} data-service-staircase role="list">
            {steps.map(([title, text], i) => <li key={title}>
              <span className={styles.number} aria-hidden="true">0{i + 1}</span>
              {i < steps.length - 1 && <svg className={styles.stepConnector} viewBox="0 0 100 64" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
                <path d="M0 64H68V0H100M96 -4L100 0L96 4" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
              </svg>}
              <h3>{title}</h3><p>{text}</p>
            </li>)}
          </ol>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.faq}`} aria-labelledby="service-faq-title">
        <Container className="editorial-container" data-service-reveal>
          <h2 id="service-faq-title">Antes de empezar</h2>
          <div className={`${faqStyles.questions} ${styles.questions}`}>
            {questions.map(([question, answer]) => <details className={faqStyles.item} key={question}>
              <summary className={faqStyles.summary}><h3><span>{question}</span><span className={faqStyles.icon} aria-hidden="true" /></h3></summary>
              <p className={faqStyles.answer}>{answer}</p>
            </details>)}
          </div>
        </Container>
      </section>

      <section className={styles.closing} aria-labelledby="service-contact-title">
        <Container className={`editorial-container ${styles.split}`} data-service-reveal>
          <h2 id="service-contact-title">¿Qué tarea sigue pasando por demasiadas manos?</h2>
          <div className={styles.copy}>
            <p>Cuéntanos qué ocurre desde que empieza hasta que termina. En una primera conversación gratuita y sin compromiso, podemos valorar por dónde empezar.</p>
            <Link className={`button ${styles.button} ${styles.contactButton}`} href="/contacto">Cuéntanos tu proceso <span aria-hidden="true">→</span></Link>
          </div>
        </Container>
      </section>
    </main>
    <div className="closing-block"><Footer homeLinks /></div>
  </>;
}
