import Link from "@/components/i18n/LocaleLink";
import { legalTranslator } from "@/lib/i18n/legal";
import type { Locale } from "@/lib/i18n/routes";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { privacyPolicy } from "@/content/privacy";
import styles from "./LegalPage.module.css";

export default function LegalNoticePage({ locale = "es" }: { locale?: Locale }) {
  const t = legalTranslator(locale);
  return (
    <>
      <Header redesign homeLinks />
      <main className={styles.page}>
        <Container className={styles.container}>
          <Link className={styles.back} href="/">{t("← Volver al inicio")}</Link>
          <p className={styles.eyebrow}>{t("INFORMACIÓN LEGAL")}</p>
          <h1>{t("Aviso legal")}</h1>
          {!privacyPolicy.reviewed && <div className={styles.draft} role="note">
            <strong>{t("Versión preparada para revisión final")}</strong>
            <p>{t("Los datos de identificación han sido facilitados por la titular. Esta versión se presenta para su aprobación antes del lanzamiento.")}</p>
          </div>}
          <p className={styles.version}>{t("Última actualización: 20 de octubre de 2026.")}</p>
          <section aria-labelledby="legal-owner">
            <h2 id="legal-owner">{t("01. Titular del sitio web")}</h2>
            <p>{t("Automatizza es la marca comercial de ")}<strong>{privacyPolicy.legalName}</strong>{t(", titular de este sitio web.")}</p>
            <dl className={styles.facts}>
              <div><dt>{t("Razón social")}</dt><dd>{privacyPolicy.legalName}</dd></div>
              <div><dt>{t("NIF")}</dt><dd>{privacyPolicy.taxId}</dd></div>
              <div><dt>{t("Domicilio")}</dt><dd>{t(privacyPolicy.address)}</dd></div>
              <div><dt>{t("Inscripción registral")}</dt><dd>{t(privacyPolicy.registry)}</dd></div>
              <div><dt>{t("Contacto")}</dt><dd><a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a></dd></div>
            </dl>
          </section>
          <section aria-labelledby="legal-purpose">
            <h2 id="legal-purpose">{t("02. Actividad y contacto")}</h2>
            <p>{t("Este sitio presenta los servicios de Automatizza en automatización, software a medida, inteligencia artificial y desarrollo web, así como ejemplos de proyectos.")}</p>
            <p>{t("Para consultar sobre estos servicios puedes escribir al correo indicado. Las condiciones de cada proyecto se concretan en su propuesta y acuerdo correspondiente; el envío de una consulta no formaliza por sí mismo una contratación.")}</p>
          </section>
          <section aria-labelledby="legal-content">
            <h2 id="legal-content">{t("03. Uso de los contenidos")}</h2>
            <p>{t("El uso del sitio debe respetar la legislación aplicable y los derechos de sus titulares. Los contenidos, marcas e imágenes pueden estar protegidos por derechos de propiedad intelectual o industrial; su consulta no concede una licencia para utilizarlos fuera de los usos permitidos legalmente.")}</p>
          </section>
          <section id="contacto" className={styles.contact} aria-labelledby="legal-privacy">
            <h2 id="legal-privacy">{t("04. Protección de datos")}</h2>
            <p>{t("La información sobre el tratamiento de datos personales y el ejercicio de derechos se detalla en la ")}<Link href="/politica-de-privacidad">{t("política de privacidad")}</Link>{t(".")}</p>
            <p>{t("Las consultas sobre este aviso pueden dirigirse a ")}<a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a>{t(".")}</p>
          </section>
        </Container>
      </main>
      <Footer homeLinks />
    </>
  );
}
