import Link from "next/link";
import { Fragment } from "react";

import { Header } from "@/components/layout/Header";
import { Container } from "@/components/layout/Container";
import { ApcVisual } from "./visuals/ApcVisual";
import { LaFactoryVisual, WebHome } from "./visuals/LaFactoryVisual";
import { CrmDashboard, SilosSpainVisual } from "./visuals/SilosSpainVisual";
import { projectDetails, type ProjectDetail } from "./projectDetails";
import styles from "./ProjectDetailPage.module.css";

function ProjectVisual({ slug }: { slug: ProjectDetail["slug"] }) {
  if (slug === "silos-spain") return <SilosSpainVisual />;
  if (slug === "apc") return <ApcVisual />;
  return <LaFactoryVisual />;
}

function Recording({ project }: { project: ProjectDetail }) {
  return (
    <figure className={`${styles.recording} ${project.slug === "silos-spain" ? styles.wideRecording : styles.phoneRecording}${project.slug === "apc" ? ` ${styles.apcRecording}` : ""}`}>
      <div className={styles.recordingSurface}>
        <video controls playsInline preload="none" poster={project.poster} aria-label={`Ver el recorrido de ${project.client}`}>
          <source src={project.video} type="video/mp4" />
          Tu navegador no puede reproducir este vídeo. <a href={project.video}>Ver la grabación</a>.
        </video>
      </div>
      {project.videoCaption && <figcaption>{project.videoCaption}</figcaption>}
    </figure>
  );
}

function FeatureVisual({ project, index }: { project: ProjectDetail; index: number }) {
  if (project.slug === "silos-spain") {
    return index === 0 ? (
      <figure className={styles.dashboardFigure}>
        <div className={styles.dashboard} role="img" aria-label="Dashboard del CRM: solicitudes, contactos, oportunidades y presupuestos">
          <CrmDashboard />
        </div>
        <figcaption>Interfaz representativa del CRM · Datos ficticios</figcaption>
      </figure>
    ) : <Recording project={project} />;
  }
  if (project.slug === "apc") return null;
  return index === 0 ? <Recording project={project} /> : (
    <figure className={styles.factoryWebFigure}>
      <div className={styles.factoryWeb} role="img" aria-label="Espacio personal de La Factory: salas, próximas reservas y tarifa">
        <WebHome />
      </div>
      <figcaption>Espacio personal del coworker · Datos de ejemplo</figcaption>
    </figure>
  );
}

export function ProjectDetailPage({ project }: { project: ProjectDetail }) {
  return (
    <>
      <Header redesign homeLinks />
      <main className={`${styles.page} ${styles[project.slug] ?? ""}`}>
        <Container className={styles.container}>
          <section className={styles.hero} aria-labelledby="project-title">
            <Link className={styles.back} href="/proyectos"><span aria-hidden="true">←</span> Todos los proyectos</Link>
            <p className={styles.eyebrow}>{project.client} <span aria-hidden="true">/</span> {project.category}</p>
            <div className={styles.heroCopy}>
              <h1 id="project-title">{project.title}</h1>
              <div className={styles.introduction}>
                <p>{project.introduction}</p>
                <ul className={styles.tags} aria-label="Áreas del proyecto">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
              </div>
            </div>
            <figure className={styles.heroFigure}>
              <div className={`${styles.heroStage} ${styles.visual}`} role="img" aria-label={`${project.client}: ${project.visualNote}`}>
                <ProjectVisual slug={project.slug} />
              </div>
              <figcaption>{project.visualNote}</figcaption>
            </figure>
          </section>

          <section className={styles.context} aria-label="El reto y la solución">
            <div><p className={styles.sectionLabel}>El reto</p><h2>{project.challengeTitle}</h2><p>{project.challenge}</p></div>
            <div><p className={styles.sectionLabel}>La solución</p><h2>{project.focus}</h2><p>{project.solution}</p></div>
          </section>

          <section className={styles.inside} aria-labelledby="inside-title">
            <div className={styles.insideHeading}>
              <p className={styles.eyebrow}>El proyecto por dentro</p>
              <h2 id="inside-title">La tecnología, en su contexto.</h2>
            </div>
            {project.slug === "apc" ? (
              <div className={styles.operationStory}>
                {project.features.map((feature, index) => (
                  <Fragment key={feature.label}>
                    <article className={styles.featureCopy}>
                      <p className={styles.sectionLabel}>{feature.label}</p>
                      <h3>{feature.title}</h3>
                      <p>{feature.text}</p>
                    </article>
                    {index === 0 && <Recording project={project} />}
                  </Fragment>
                ))}
              </div>
            ) : project.features.map((feature, index) => (
              <article className={`${styles.feature} ${index % 2 ? styles.reverse : ""}`} key={feature.label}>
                <div className={styles.featureCopy}>
                  <p className={styles.sectionLabel}>{feature.label}</p>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
                <FeatureVisual project={project} index={index} />
              </article>
            ))}
          </section>

          <section className={styles.contact} id="contacto" aria-labelledby="detail-contact-title">
            <p className={styles.eyebrow}>Tu próximo proyecto</p>
            <h2 id="detail-contact-title">Todo empieza por entender cómo trabajas.</h2>
            <Link href="mailto:info@automatizza.es" className={styles.contactLink}>Hablemos de tu proyecto <span aria-hidden="true">↗</span></Link>
          </section>

          <nav className={styles.otherProjects} aria-label="Otros proyectos">
            <p className={styles.sectionLabel}>Sigue explorando</p>
            <div>
              {projectDetails.filter((other) => other.slug !== project.slug).map((other) => (
                <Link href={`/proyectos/${other.slug}`} scroll={false} key={other.slug}>
                  <span>{other.client}<small>{other.category}</small></span><span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </nav>
          <footer className={styles.footer}>
            <Link href="/" aria-label="Automatizza, inicio">Automatizza</Link>
            <Link href="/proyectos">Volver a Proyectos <span aria-hidden="true">↑</span></Link>
            <span>© 2026 Automatizza</span>
          </footer>
        </Container>
      </main>
    </>
  );
}
