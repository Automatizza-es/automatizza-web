import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceSteps } from "@/components/services/ServiceSteps";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { IllustrativeConversation } from "@/components/services/IllustrativeConversation";
import { localizeHref, type Locale } from "@/lib/i18n/routes";
import { translator } from "@/lib/i18n/translate";
import { ProcessAutomationMotion } from "./ProcessAutomationMotion";
import styles from "./ProcessAutomationPage.module.css";
import ai from "./AiServicePage.module.css";

export const aiExamples = [
  ["Documentos y correos", "Extraer información y organizarla para su revisión."],
  ["Información interna", "Facilitar consultas sobre documentación y fuentes autorizadas."],
  ["Agentes de WhatsApp", "Recoger solicitudes, responder dentro de un alcance definido y conectar con otras herramientas."],
  ["Agentes de llamadas", "Recoger el motivo de una llamada y gestionar acciones concretas según las integraciones acordadas."],
] as const;
export const aiSteps = [
  ["Elegimos una tarea", "Concretamos qué debe resolver y cómo evaluar el resultado."],
  ["Preparamos la información", "Definimos fuentes, permisos y acciones permitidas."],
  ["Probamos sus respuestas", "Revisamos situaciones habituales, errores y casos que requieren intervención humana."],
  ["Lo incorporamos al trabajo", "Acompañamos la puesta en marcha y acordamos seguimiento y mantenimiento."],
] as const;
export const aiQuestions = [
  ["¿Todas las automatizaciones necesitan inteligencia artificial?", "No. Muchas tareas se resuelven conectando herramientas y definiendo reglas. Valoramos la IA cuando hace falta interpretar información, siempre con un alcance y unas comprobaciones definidos."],
  ["¿Puede equivocarse un agente de IA?", "Sí. Probamos sus respuestas y definimos límites, revisiones y qué hacer si no dispone de información suficiente. No sustituye las comprobaciones que requiera cada tarea."],
  ["¿Qué información puede consultar?", "Solo las fuentes y los accesos que se acuerden para el proyecto. Revisamos los permisos y el tratamiento de los datos según las herramientas y los proveedores utilizados."],
  ["¿Cuándo interviene una persona?", "Definimos qué acciones necesitan aprobación y cuándo derivar una consulta al equipo, por ejemplo ante información incompleta o situaciones fuera del alcance acordado."],
  ["¿De qué depende el coste?", "Del alcance, las fuentes de información, las integraciones y las pruebas necesarias. Acordamos el trabajo inicial, el seguimiento y el mantenimiento, además de los costes recurrentes de los proveedores y su uso."],
] as const;

export default function AiServicePage({ locale = "es" }: { locale?: Locale }) {
  const t = translator(locale);
  const href = (path: string) => localizeHref(path, locale);
  const rootId = `ai-service-content-${locale}`;
  return <>
    <Header redesign homeLinks />
    <ProcessAutomationMotion rootId={rootId} />
    <main id={rootId} className={styles.page}>
      <section className={styles.hero} aria-labelledby="ai-title">
        <Container className="editorial-container">
          <Link className={styles.back} href={href("/#servicios")}><span aria-hidden="true">←</span>{t(" Todos los servicios")}</Link>
          <p className={styles.eyebrow}>{t("SERVICIOS / INTELIGENCIA ARTIFICIAL")}</p>
          <div className={styles.heroGrid} data-service-reveal>
            <h1 id="ai-title">{t("Inteligencia artificial para empresas.")}</h1>
            <div className={styles.copy}>
              <p>{t("Incorporamos inteligencia artificial a tareas concretas: interpretar documentos, clasificar mensajes, consultar información o atender consultas. Definimos contigo dónde puede ayudar y qué necesita revisión")}</p>
              <Link className={`button button-primary ${styles.button}`} href={href("/contacto")}>{t("Hablemos de tu proyecto")}<span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Container>
      </section>
      <section className={styles.section} aria-labelledby="ai-examples-title">
        <Container className="editorial-container">
          <h2 id="ai-examples-title" data-service-reveal>{t("Dónde puede ayudar la inteligencia artificial")}</h2>
          <ul className={styles.examples} data-service-reveal>
            {aiExamples.map(([title, text]) => <li key={title}><h3>{t(title)}</h3><p>{t(text)}</p></li>)}
          </ul>
        </Container>
      </section>
      <section className={styles.case} aria-labelledby="ai-case-title">
        <Container className={`editorial-container ${ai.caseGrid}`}>
          <div className={styles.copy} data-service-reveal>
            <p className={ai.caseLabel}>Silos Spain · WhatsApp</p>
            <h2 id="ai-case-title">{t("Una primera conversación que ayuda a avanzar")}</h2>
            <p>{t("Para Silos Spain hemos desarrollado un agente de WhatsApp que recoge la necesidad inicial del cliente y organiza los datos de su proyecto. El flujo contempla también la gestión de reuniones mediante herramientas de calendario")}</p>
            <Link className={styles.textLink} href={href("/proyectos/silos-spain")}>{t("Ver el proyecto de Silos Spain")}<span aria-hidden="true">→</span></Link>
          </div>
          <IllustrativeConversation locale={locale} />
        </Container>
      </section>
      <ServiceSteps title={t("Cómo lo ponemos en marcha")} steps={aiSteps.map(([title, text]) => [t(title), t(text)] as const)} />
      <ServiceFaq title={t("Antes de empezar")} questions={aiQuestions.map(([question, answer]) => [t(question), t(answer)] as const)} />
      <section className={styles.closing} aria-labelledby="service-contact-title">
        <Container className={`editorial-container ${styles.split}`} data-service-reveal>
          <h2 id="service-contact-title">{t("¿En qué tarea te gustaría incorporar inteligencia artificial?")}</h2>
          <div className={styles.copy}>
            <p>{t("Cuéntanos qué necesita tu equipo. Revisamos dónde puede ayudar la IA y qué límites y comprobaciones necesita.")}</p>
            <Link className={`button ${styles.button} ${styles.contactButton}`} href={href("/contacto")}>{t("Hablemos de tu proyecto")}<span aria-hidden="true">→</span></Link>
          </div>
        </Container>
      </section>
    </main>
    <div className="closing-block"><Footer homeLinks /></div>
  </>;
}
