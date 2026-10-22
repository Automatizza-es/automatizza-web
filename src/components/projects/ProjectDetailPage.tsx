"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

import Link from "@/components/i18n/LocaleLink";
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
  const { t } = useI18n();
  return (
    <figure className={`${styles.recording} ${project.slug === "silos-spain" ? styles.wideRecording : styles.phoneRecording}${project.slug === "apc" ? ` ${styles.apcRecording}` : ""}`}>
      <div className={styles.recordingSurface}>
        <video controls playsInline preload="none" poster={project.poster} aria-label={t("Ver el recorrido de {project}", { project: project.client })}>
          <source src={project.video} type="video/mp4" />{t("Tu navegador no puede reproducir este vídeo. ")}<a href={project.video}>{t("Ver la grabación")}</a>.
        </video>
      </div>
      {project.videoCaption && <figcaption>{t(project.videoCaption)}</figcaption>}
    </figure>
  );
}

function FeatureVisual({ project, index }: { project: ProjectDetail; index: number }) {
  const { t } = useI18n();
  if (project.slug === "silos-spain") {
    return index === 0 ? (
      <figure className={styles.dashboardFigure}>
        <div className={styles.dashboard} role="img" aria-label={t("Dashboard del CRM: solicitudes, contactos, oportunidades y presupuestos")}>
          <CrmDashboard />
        </div>
      </figure>
    ) : <Recording project={project} />;
  }
  if (project.slug === "apc") return null;
  return index === 0 ? <Recording project={project} /> : (
    <figure className={styles.factoryWebFigure}>
      <div className={styles.factoryWeb} role="img" aria-label={t("Espacio personal de La Factory: salas, próximas reservas y tarifa")}>
        <WebHome />
      </div>
    </figure>
  );
}

export function ProjectDetailPage({ project }: { project: ProjectDetail }) {
  const { t } = useI18n();
  return (
    <>
      <Header redesign homeLinks />
      <main className={`${styles.page} ${styles[project.slug] ?? ""}`}>
        <Container className={styles.container}>
          <section className={styles.hero} aria-labelledby="project-title">
            <Link className={styles.back} href="/#proyectos"><span aria-hidden="true">←</span>{t(" Todos los proyectos")}</Link>
            <p className={styles.eyebrow}>{project.client} <span aria-hidden="true">/</span> {t(project.category)}</p>
            <div className={styles.heroCopy}>
              <h1 id="project-title">{t(project.title)}</h1>
              <div className={styles.introduction}>
                <p>{t(project.introduction)}</p>
                <ul className={styles.tags} aria-label={t("Áreas del proyecto")}>
                  {project.tags.map((tag) => <li key={tag}>{t(tag)}</li>)}
                </ul>
              </div>
            </div>
            <figure className={styles.heroFigure}>
              <div className={`${styles.heroStage} ${styles.visual}`} role="img" aria-label={`${project.client}: ${t(project.visualNote)}`}>
                <ProjectVisual slug={project.slug} />
              </div>
              <figcaption>{t("Datos de demostración")}</figcaption>
            </figure>
          </section>

          <section className={styles.context} aria-label={t("El reto y la solución")}>
            <div><p className={styles.sectionLabel}>{t("El reto")}</p><h2>{t(project.challengeTitle)}</h2><p>{t(project.challenge)}</p></div>
            <div><p className={styles.sectionLabel}>{t("La solución")}</p><h2>{t(project.focus)}</h2><p>{t(project.solution)}</p></div>
          </section>

          <section className={styles.inside} aria-labelledby="inside-title">
            <div className={styles.insideHeading}>
              <p className={styles.eyebrow}>{t("El proyecto por dentro")}</p>
              <h2 id="inside-title">{t("La tecnología, en su contexto.")}</h2>
            </div>
            {project.slug === "apc" ? (
              <div className={styles.operationStory}>
                {project.features.map((feature, index) => (
                  <Fragment key={feature.label}>
                    <article className={styles.featureCopy}>
                      <p className={styles.sectionLabel}>{t(feature.label)}</p>
                      <h3>{t(feature.title)}</h3>
                      <p>{t(feature.text)}</p>
                    </article>
                    {index === 0 && <Recording project={project} />}
                  </Fragment>
                ))}
              </div>
            ) : project.features.map((feature, index) => (
              <article className={`${styles.feature} ${index % 2 ? styles.reverse : ""}`} key={feature.label}>
                <div className={styles.featureCopy}>
                  <p className={styles.sectionLabel}>{t(feature.label)}</p>
                  <h3>{t(feature.title)}</h3>
                  <p>{t(feature.text)}</p>
                </div>
                <FeatureVisual project={project} index={index} />
              </article>
            ))}
          </section>

          <section className={styles.contact} id="contacto" aria-labelledby="detail-contact-title">
            <p className={styles.eyebrow}>{t("Tu próximo proyecto")}</p>
            <h2 id="detail-contact-title">{t("Todo empieza por entender cómo trabajas.")}</h2>
            <Link href="/contacto" className={styles.contactLink}>{t("Hablemos de tu proyecto ")}<span aria-hidden="true">↗</span></Link>
          </section>

          <nav className={styles.otherProjects} aria-label={t("Otros proyectos")}>
            <p className={styles.sectionLabel}>{t("Sigue explorando")}</p>
            <div>
              {projectDetails.filter((other) => other.slug !== project.slug).map((other) => (
                <Link href={`/proyectos/${other.slug}`} scroll={false} key={other.slug}>
                  <span>{other.client}<small>{t(other.category)}</small></span><span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </nav>
          <footer className={styles.footer}>
            <Link href="/" aria-label={t("Automatizza, inicio")}>Automatizza</Link>
            <Link href="/#proyectos">{t("Volver a Proyectos ")}<span aria-hidden="true">↑</span></Link>
            <span>© 2026 Automatizza</span>
          </footer>
        </Container>
      </main>
    </>
  );
}
