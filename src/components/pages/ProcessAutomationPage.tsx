import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import faqStyles from "@/components/home/FaqSection.module.css";
import styles from "./ProcessAutomationPage.module.css";

// Approved Spanish copy. Other languages are added to the route registry only
// once their complete page is ready; this view is not a translation fallback.
const examples = [
  ["Solicitudes y seguimiento comercial", "Registrar las solicitudes que llegan por formulario o correo, asignarlas al responsable y organizar los siguientes pasos."],
  ["Documentos y presupuestos", "Preparar documentos a partir de datos y plantillas, organizar archivos y extraer información para su revisión y registro."],
  ["Conexión entre herramientas", "Compartir información entre el CRM, el correo, hojas de cálculo y otras aplicaciones, según las posibilidades de integración de cada sistema."],
  ["Avisos y tareas pendientes", "Enviar recordatorios, comunicar cambios de estado y avisar cuando falta información o hace falta una revisión."],
];
const steps = [
  ["Entendemos cómo funciona hoy", "Revisamos los pasos, las personas implicadas y las herramientas que utilizáis. Localizamos dónde se duplica trabajo o se pierde información."],
  ["Definimos qué cambiar", "Acordamos qué se automatiza, qué necesita aprobación y cómo se gestionan las excepciones. También valoramos las limitaciones de las aplicaciones existentes."],
  ["Construimos y probamos", "Conectamos las herramientas y comprobamos el recorrido con situaciones habituales y casos que pueden dar problemas."],
  ["Lo ponemos en marcha", "Probamos su funcionamiento con el equipo y acordamos cómo gestionar el mantenimiento y los cambios posteriores. Podemos empezar por un solo proceso y ampliar por fases."],
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
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="automation-title">
        <Container className="editorial-container">
          <p className="section-eyebrow">AUTOMATIZACIÓN DE PROCESOS</p>
          <div className={styles.heroGrid}>
            <h1 id="automation-title">Automatización de procesos para empresas</h1>
            <div className={styles.copy}>
              <p className={styles.lead}>Menos copiar y pegar. Menos pendientes entre herramientas.</p>
              <p>Conectamos aplicaciones y automatizamos tareas repetitivas para que la información llegue donde hace falta, sin tener que trasladarla a mano cada vez.</p>
              <p>Empezamos por entender cómo trabaja tu equipo y qué proceso necesita mejorar.</p>
              <Link className={`button button-primary ${styles.button}`} href="/contacto">Hablemos de tu proceso <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="manual-work-title">
        <Container className="editorial-container">
          <div className={styles.split}>
            <h2 id="manual-work-title">¿Dónde se puede reducir el trabajo manual?</h2>
            <p>Las oportunidades suelen aparecer cuando alguien tiene que registrar los mismos datos varias veces, preparar documentos con información que ya existe o estar pendiente de avisar a otra persona para que el trabajo continúe.</p>
          </div>
          <ul className={styles.examples}>
            {examples.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
          </ul>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.soft}`} aria-labelledby="human-review-title">
        <Container className={`editorial-container ${styles.split}`}>
          <h2 id="human-review-title">Automatizar también es decidir qué debe seguir revisando una persona</h2>
          <div className={styles.copy}>
            <p>Antes de construir una solución, revisamos cuánto se repite la tarea, qué tiempo consume y qué excepciones aparecen.</p>
            <p>Si el proceso cambia constantemente o requiere decisiones difíciles de definir, puede convenir simplificarlo primero o automatizar solo una parte.</p>
            <p>Dejamos claros los puntos de revisión, qué ocurre cuando falta un dato y cómo debe actuar el sistema si algo falla.</p>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="approach-title">
        <Container className="editorial-container">
          <h2 id="approach-title">Así abordamos el proceso</h2>
          <ol className={styles.steps}>
            {steps.map(([title, text], i) => <li key={title}>
              <span className={styles.number} aria-hidden="true">0{i + 1}</span>
              <h3>{title}</h3><p>{text}</p>
            </li>)}
          </ol>
        </Container>
      </section>

      <section className={styles.case} aria-labelledby="silos-example-title">
        <Container className={`editorial-container ${styles.caseInner}`}>
          <div className={styles.split}>
            <h2 id="silos-example-title">Un ejemplo: la gestión comercial de Silos Spain</h2>
            <div className={styles.copy}>
              <p>En el proyecto de Silos Spain desarrollamos una plataforma que reúne solicitudes, contactos, oportunidades y presupuestos en un mismo entorno.</p>
              <p>El CRM sirve como núcleo para conectar progresivamente procesos comerciales y administrativos. El equipo puede consultar la información y continuar el trabajo sin depender de herramientas aisladas.</p>
              <Link className={styles.textLink} href="/proyectos/silos-spain">Ver el proyecto de Silos Spain <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className={`${styles.section} ${styles.soft}`} aria-labelledby="service-faq-title">
        <Container className="editorial-container">
          <h2 id="service-faq-title">Antes de empezar</h2>
          <div className={faqStyles.questions}>
            {questions.map(([question, answer]) => <details className={faqStyles.item} key={question}>
              <summary className={faqStyles.summary}><h3><span>{question}</span><span className={faqStyles.icon} aria-hidden="true" /></h3></summary>
              <p className={faqStyles.answer}>{answer}</p>
            </details>)}
          </div>
        </Container>
      </section>

      <section className={styles.closing} aria-labelledby="service-contact-title">
        <Container className={`editorial-container ${styles.split}`}>
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
