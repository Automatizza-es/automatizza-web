import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { privacyPolicy } from "@/content/privacy";
import styles from "../politica-de-privacidad/privacy.module.css";

export const metadata: Metadata = {
  title: "Aviso legal | Automatizza",
  description: "Identificación de Grain Store Technology, S.L., titular de Automatizza, y condiciones de uso del sitio web.",
  robots: { index: false, follow: false },
};

export default function LegalNoticePage() {
  return (
    <>
      <Header redesign homeLinks />
      <main className={styles.page}>
        <Container className={styles.container}>
          <Link className={styles.back} href="/">← Volver al inicio</Link>
          <p className={styles.eyebrow}>INFORMACIÓN LEGAL</p>
          <h1>Aviso legal</h1>
          {!privacyPolicy.reviewed && <div className={styles.draft} role="note">
            <strong>Versión preparada para revisión final</strong>
            <p>Los datos de identificación han sido facilitados por la titular. Esta versión se presenta para su aprobación antes del lanzamiento.</p>
          </div>}
          <p className={styles.version}>Última actualización: 20 de octubre de 2026.</p>
          <section aria-labelledby="legal-owner">
            <h2 id="legal-owner">01. Titular del sitio web</h2>
            <p>Automatizza es la marca comercial de <strong>{privacyPolicy.legalName}</strong>, titular de este sitio web.</p>
            <dl className={styles.facts}>
              <div><dt>Razón social</dt><dd>{privacyPolicy.legalName}</dd></div>
              <div><dt>NIF</dt><dd>{privacyPolicy.taxId}</dd></div>
              <div><dt>Domicilio</dt><dd>{privacyPolicy.address}</dd></div>
              <div><dt>Inscripción registral</dt><dd>{privacyPolicy.registry}</dd></div>
              <div><dt>Contacto</dt><dd><a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a></dd></div>
            </dl>
          </section>
          <section aria-labelledby="legal-purpose">
            <h2 id="legal-purpose">02. Actividad y contacto</h2>
            <p>Este sitio presenta los servicios de Automatizza en automatización, software a medida, inteligencia artificial y desarrollo web, así como ejemplos de proyectos.</p>
            <p>Para consultar sobre estos servicios puedes escribir al correo indicado. Las condiciones de cada proyecto se concretan en su propuesta y acuerdo correspondiente; el envío de una consulta no formaliza por sí mismo una contratación.</p>
          </section>
          <section aria-labelledby="legal-content">
            <h2 id="legal-content">03. Uso de los contenidos</h2>
            <p>El uso del sitio debe respetar la legislación aplicable y los derechos de sus titulares. Los contenidos, marcas e imágenes pueden estar protegidos por derechos de propiedad intelectual o industrial; su consulta no concede una licencia para utilizarlos fuera de los usos permitidos legalmente.</p>
          </section>
          <section id="contacto" className={styles.contact} aria-labelledby="legal-privacy">
            <h2 id="legal-privacy">04. Protección de datos</h2>
            <p>La información sobre el tratamiento de datos personales y el ejercicio de derechos se detalla en la <Link href="/politica-de-privacidad">política de privacidad</Link>.</p>
            <p>Las consultas sobre este aviso pueden dirigirse a <a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a>.</p>
          </section>
        </Container>
      </main>
      <Footer homeLinks />
    </>
  );
}
