import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceSteps } from "@/components/services/ServiceSteps";
import { ServiceFaq } from "@/components/services/ServiceFaq";
import { localizeHref, type Locale } from "@/lib/i18n/routes";
import { translator } from "@/lib/i18n/translate";
import { ProcessAutomationMotion } from "./ProcessAutomationMotion";
import styles from "./ProcessAutomationPage.module.css";
import software from "./SoftwareServicePage.module.css";

export const softwareNeeds = [
  ["El trabajo acaba fuera del programa.", "Utilizas una herramienta, pero terminas completando cada gestión con hojas de cálculo, correos y documentos aparte."],
  ["Tu equipo se adapta al programa.", "Para completar una tarea tienes que dar rodeos o seguir pasos que no encajan con tu forma de trabajar."],
  ["Falta una herramienta para un proceso concreto.", "Necesitas gestionar reservas, registrar operaciones o dar acceso a clientes con unas reglas que las opciones existentes no cubren."],
] as const;
export const softwareExamples = [
  ["Herramientas de gestión interna", "Reunir clientes, documentación y tareas en una herramienta que refleje cómo trabaja tu equipo."],
  ["Portales para clientes y colaboradores", "Permitir que clientes y colaboradores consulten o aporten la información que necesitan, con los accesos acordados."],
  ["Aplicaciones para operaciones desde el móvil", "Registrar y consultar información durante el trabajo, como recogidas y viajes, sin esperar a volver a la oficina."],
  ["Sistemas de reservas y gestión de espacios", "Organizar reservas, usuarios y servicios para facilitar la gestión diaria de un espacio compartido."],
] as const;
export const softwareSteps = [
  ["Definimos una primera versión", "Acordamos qué necesita resolver y qué puede esperar."],
  ["Diseñamos su funcionamiento", "Organizamos pantallas, información y permisos."],
  ["Construimos y probamos", "Comprobamos el funcionamiento con situaciones del trabajo diario."],
  ["Lo ponemos en marcha", "Acompañamos al equipo y acordamos mantenimiento y posibles ampliaciones."],
] as const;
export const softwareQuestions = [
  ["¿Cuándo conviene desarrollar una aplicación en lugar de contratar un programa existente?", "Cuando un proceso importante no queda bien resuelto con las herramientas disponibles. Primero valoramos si un programa existente puede cubrir la necesidad antes de proponer un desarrollo."],
  ["¿Puede conectarse con las herramientas que ya utilizamos?", "Depende de las posibilidades de integración de cada herramienta. Revisamos sus conexiones y limitaciones antes de acordar qué sistemas integrar."],
  ["¿Podemos empezar con una versión sencilla y ampliarla?", "Sí. Definimos una primera versión que resuelva la necesidad principal y acordamos qué mejoras pueden incorporarse después."],
  ["¿Qué ocurre después de la puesta en marcha?", "Probamos la aplicación con tu equipo y acordamos el mantenimiento y cómo gestionar incidencias, cambios o ampliaciones. El alcance de ese trabajo se define para cada proyecto."],
  ["¿De qué depende el coste?", "Del alcance, los perfiles de usuario, las integraciones y la complejidad del desarrollo. La propuesta distingue el trabajo inicial de los costes recurrentes de infraestructura, licencias y mantenimiento que correspondan."],
] as const;
const projects = [
  { name: "La Factory Coworking", text: "Aplicación para reunir reservas de salas, usuarios y servicios y facilitar la gestión diaria del espacio.", path: "/proyectos/la-factory-coworking", link: "Ver el proyecto de La Factory Coworking" },
  { name: "APC Europe", text: "Aplicación para registrar recogidas y viajes desde el móvil y centralizar la información de las operaciones de transporte.", path: "/proyectos/apc", link: "Ver el proyecto de APC Europe" },
];

export default function SoftwareServicePage({ locale = "es" }: { locale?: Locale }) {
  const t = translator(locale);
  const href = (path: string) => localizeHref(path, locale);
  const rootId = `software-service-content-${locale}`;
  return <>
    <Header redesign homeLinks />
    <ProcessAutomationMotion rootId={rootId} />
    <main id={rootId} className={styles.page}>
      <section className={styles.hero} aria-labelledby="software-title">
        <Container className="editorial-container">
          <Link className={styles.back} href={href("/#servicios")}><span aria-hidden="true">←</span>{t(" Todos los servicios")}</Link>
          <p className={styles.eyebrow}>{t("SERVICIOS / SOFTWARE A MEDIDA")}</p>
          <div className={styles.heroGrid} data-service-reveal>
            <h1 id="software-title">{t("Software a medida para empresas.")}</h1>
            <div className={styles.copy}>
              <p>{t("Desarrollamos aplicaciones para gestionar el trabajo de tu empresa: clientes, reservas, documentación u operaciones. Partimos de lo que necesita tu equipo y construimos una herramienta que pueda utilizar en su día a día")}</p>
              <Link className={`button button-primary ${styles.button}`} href={href("/contacto")}>{t("Hablemos de tu proyecto")}<span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="software-needs-title">
        <Container className="editorial-container">
          <h2 id="software-needs-title" data-service-reveal>{t("Cuando tus herramientas se quedan cortas")}</h2>
          <ul className={software.needs} role="list" data-service-reveal>
            {softwareNeeds.map(([title, text]) => <li key={title}><h3>{t(title)}</h3><p>{t(text)}</p></li>)}
          </ul>
          <p className={software.needsConclusion} data-service-reveal>{t("Antes de desarrollar, valoramos si una herramienta existente puede resolverlo")}</p>
        </Container>
      </section>

      <section className={styles.section} aria-labelledby="software-examples-title">
        <Container className="editorial-container">
          <h2 id="software-examples-title" data-service-reveal>{t("Qué podemos desarrollar")}</h2>
          <ul className={styles.examples} data-service-reveal>
            {softwareExamples.map(([title, text]) => <li key={title}><h3>{t(title)}</h3><p>{t(text)}</p></li>)}
          </ul>
        </Container>
      </section>

      <section className={styles.case} aria-labelledby="software-projects-title">
        <Container className="editorial-container">
          <h2 id="software-projects-title" data-service-reveal>{t("Dos ejemplos, necesidades distintas")}</h2>
          <div className={software.projects}>
            {projects.map(project => <article key={project.path} className={software.project} data-service-reveal>
              <h3>{project.name}</h3>
              <div className={styles.copy}>
                <p>{t(project.text)}</p>
                <Link className={styles.textLink} href={href(project.path)}>{t(project.link)}<span aria-hidden="true">→</span></Link>
              </div>
            </article>)}
          </div>
        </Container>
      </section>

      <ServiceSteps title={t("Cómo lo desarrollamos")} steps={softwareSteps.map(([title, text]) => [t(title), t(text)] as const)} />
      <ServiceFaq title={t("Antes de empezar")} questions={softwareQuestions.map(([question, answer]) => [t(question), t(answer)] as const)} />

      <section className={styles.closing} aria-labelledby="service-contact-title">
        <Container className={`editorial-container ${styles.split}`} data-service-reveal>
          <h2 id="service-contact-title">{t("¿Qué necesita tu equipo que tus herramientas actuales no resuelven?")}</h2>
          <div className={styles.copy}>
            <p>{t("Cuéntanos cómo trabaja tu equipo y qué necesitas mejorar. Revisamos el caso y valoramos por dónde empezar.")}</p>
            <Link className={`button ${styles.button} ${styles.contactButton}`} href={href("/contacto")}>{t("Hablemos de tu proyecto")}<span aria-hidden="true">→</span></Link>
          </div>
        </Container>
      </section>
    </main>
    <div className="closing-block"><Footer homeLinks /></div>
  </>;
}
