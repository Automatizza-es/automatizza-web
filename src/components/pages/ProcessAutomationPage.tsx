import Link from "next/link";
import { translator } from "@/lib/i18n/translate";
import { localizeHref, type Locale } from "@/lib/i18n/routes";
import { ServiceSteps } from "@/components/services/ServiceSteps";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import styles from "./ProcessAutomationPage.module.css";
import { ProcessAutomationMotion } from "./ProcessAutomationMotion";

// Approved Spanish copy; translations are rendered on the server.
export const automationExamples = [
  ["Solicitudes y seguimiento comercial", "Registrar las solicitudes que llegan por formulario o correo, asignarlas al responsable y organizar los siguientes pasos."],
  ["Documentos y presupuestos", "Preparar documentos a partir de datos y plantillas, organizar archivos y extraer información para su revisión y registro."],
  ["Conexión entre herramientas", "Compartir información entre el CRM, el correo, hojas de cálculo y otras aplicaciones, según las posibilidades de integración de cada sistema."],
  ["Avisos y tareas pendientes", "Enviar recordatorios, comunicar cambios de estado y avisar cuando falta información o hace falta una revisión."],
];
export const automationSteps = [
  ["Entendemos tu proceso", "Revisamos cómo trabaja tu equipo y dónde se repiten tareas o se pierde información."],
  ["Definimos qué cambiar", "Acordamos qué automatizar, qué necesita aprobación y cómo gestionar las excepciones."],
  ["Construimos y probamos", "Conectamos las herramientas y probamos tanto el funcionamiento habitual como los posibles fallos."],
  ["Lo ponemos en marcha", "Lo probamos con tu equipo y acordamos el mantenimiento y los siguientes pasos."],
];
export const automationQuestions = [
  ["¿Podemos mantener los programas que utilizamos?", "Siempre que permitan una conexión adecuada, partimos de las herramientas existentes. Si alguna impone limitaciones, valoramos las alternativas antes de proponer un cambio."],
  ["¿Hace falta inteligencia artificial?", "No siempre. Muchas tareas se resuelven conectando aplicaciones y definiendo reglas. Cuando hay que interpretar mensajes o documentos, valoramos si la IA resulta adecuada y qué comprobaciones necesita."],
  ["¿Cómo se calcula el coste?", "Depende de los pasos, las integraciones y las excepciones que deba gestionar la solución. La propuesta debe distinguir el trabajo inicial de los costes recurrentes de herramientas, infraestructura y mantenimiento."],
  ["¿Cómo sabemos si ha merecido la pena?", "Antes de empezar podemos acordar qué observar: tiempo dedicado, registros duplicados, errores o solicitudes pendientes. Comparar el funcionamiento anterior con el nuevo permite valorar el resultado sin confundir una estimación con un ahorro demostrado."],
];

export default function ProcessAutomationPage({ locale = "es" }: { locale?: Locale }) {
  const t = translator(locale);
  const href = (path: string) => localizeHref(path, locale);
  const rootId = locale === "es" ? "process-automation-content" : `process-automation-content-${locale}`;
  return <>
    <Header redesign homeLinks />
    <ProcessAutomationMotion rootId={rootId} />
    <main id={rootId} className={styles.page}>
      <section className={styles.hero} aria-labelledby="automation-title">
        <Container className="editorial-container">
          <Link className={styles.back} href={href("/#servicios")}><span aria-hidden="true">←</span>{t(" Todos los servicios")}</Link>
          <p className={styles.eyebrow}>{t("SERVICIOS / AUTOMATIZACIÓN")}</p>
          <div className={styles.heroGrid} data-service-reveal>
            <h1 id="automation-title">{t("Automatización de procesos para empresas")}</h1>
            <div className={styles.copy}>
              <p>{t("Conectamos aplicaciones y automatizamos tareas repetitivas para que la información llegue donde hace falta, sin tener que trasladarla a mano cada vez.")}</p>
              <p>{t("Empezamos por entender cómo trabaja tu equipo y qué proceso necesita mejorar.")}</p>
              <Link className={`button button-primary ${styles.button}`} href={href("/contacto")}>{t("Hablemos de tu proceso ")}<span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="manual-work-title">
        <Container className="editorial-container">
          <div className={styles.sectionIntro} data-service-reveal>
            <h2 id="manual-work-title">{t("¿Dónde se puede reducir el trabajo manual?")}</h2>
          </div>
          <ul className={styles.examples} data-service-reveal>
            {automationExamples.map(([title, text]) => <li key={title}><h3>{t(title)}</h3><p>{t(text)}</p></li>)}
          </ul>
        </Container>
      </section>

      <section className={styles.case} aria-labelledby="silos-example-title">
        <Container className={`editorial-container ${styles.caseInner}`} data-service-reveal>
          <figure className={styles.caseFigure}>
            <Image className={styles.casePhoto} src="/images/services/silos-spain-team.jpg" alt={t("Equipo de Silos Spain en la fábrica.")} width={598} height={454} sizes="(max-width: 600px) calc(100vw - 32px), 360px" />
            <figcaption>{t("Con el equipo de Silos Spain en la fábrica")}</figcaption>
          </figure>
          <div className={styles.copy}>
            <h2 id="silos-example-title">{t("Así lo aplicamos en Silos Spain")}</h2>
            <p>{t("En el proyecto de Silos Spain desarrollamos una plataforma que reúne solicitudes, contactos, oportunidades y presupuestos en un mismo entorno.")}</p>
            <p>{t("El equipo puede consultar la información y continuar cada gestión desde la misma plataforma, sin ir pasando de una herramienta a otra.")}</p>
            <Link className={styles.textLink} href={href("/proyectos/silos-spain")}>{t("Ver el proyecto de Silos Spain ")}<span aria-hidden="true">→</span></Link>
          </div>
        </Container>
      </section>

      <ServiceSteps title={t("Cómo lo ponemos en marcha")} steps={automationSteps.map(([title, text]) => [t(title), t(text)] as const)} />
      <ServiceFaq title={t("Antes de empezar")} questions={automationQuestions.map(([question, answer]) => [t(question), t(answer)] as const)} />

      <section className={styles.closing} aria-labelledby="service-contact-title">
        <Container className={`editorial-container ${styles.split}`} data-service-reveal>
          <h2 id="service-contact-title">{t("¿Qué tarea sigue pasando por demasiadas manos?")}</h2>
          <div className={styles.copy}>
            <p>{t("Cuéntanos qué ocurre desde que empieza hasta que termina. En una primera conversación gratuita y sin compromiso, podemos valorar por dónde empezar.")}</p>
            <Link className={`button ${styles.button} ${styles.contactButton}`} href={href("/contacto")}>{t("Cuéntanos tu proceso ")}<span aria-hidden="true">→</span></Link>
          </div>
        </Container>
      </section>
    </main>
    <div className="closing-block"><Footer homeLinks /></div>
  </>;
}
