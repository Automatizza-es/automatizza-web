import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cookiePolicy } from "@/lib/analytics/config";
import { privacyPolicy } from "@/content/privacy";
import styles from "../politica-de-privacidad/privacy.module.css";

export const metadata: Metadata = {
  title: "Política de cookies | Automatizza",
  description: "Borrador de la información sobre cookies y preferencias de medición de Automatizza.",
  robots: { index: false, follow: false },
};

export default function CookiePolicyPage() {
  return <>
    <Header redesign homeLinks />
    <main className={styles.page}>
      <Container className={styles.container}>
        <Link className={styles.back} href="/">← Volver al inicio</Link>
        <p className={styles.eyebrow}>INFORMACIÓN LEGAL</p>
        <h1>Política de cookies</h1>
        {!cookiePolicy.reviewed && <div className={styles.draft} role="note"><strong>Borrador pendiente de revisión</strong><p>La integración de Google Analytics 4 está preparada para {cookiePolicy.measurementId}, pero la medición real permanece desactivada. La vista local del panel permite probar preferencias sin enviar datos a Google. Quedan pendientes la configuración de la propiedad, la revisión de proveedores y transferencias y la comprobación de las cookies reales antes de activar la medición.</p></div>}
        <p className={styles.version}>Versión: 16 de octubre de 2026 · {cookiePolicy.version}</p>
        <section aria-labelledby="cookies-owner">
          <h2 id="cookies-owner">01. Responsable y finalidad</h2>
          <p>Automatizza es una marca de {privacyPolicy.legalName}, con NIF {privacyPolicy.taxId}. Puedes escribirnos a <a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a>. Los demás datos de identificación figuran en el <Link href="/aviso-legal">aviso legal</Link>.</p>
          <p>Las cookies y tecnologías similares permiten guardar información en el navegador. La configuración prevista distingue las preferencias necesarias para recordar tu decisión y la medición opcional del uso del sitio.</p>
        </section>
        <section aria-labelledby="cookies-inventory">
          <h2 id="cookies-inventory">02. Almacenamiento previsto</h2>
          <dl className={styles.facts}>
            <div><dt>automatizza-cookie-consent</dt><dd>Almacenamiento local propio: guarda aceptación o rechazo de la analítica, fecha y versión de la elección durante 180 días. Necesario para recordar tu preferencia; no se envía a Google. Si el navegador impide guardarlo, la elección dura solo en la página actual.</dd></div>
            <div><dt>_ga</dt><dd>Cookie de Google Analytics para distinguir navegadores. Solo tras aceptar y cuando la medición esté activada. Caducidad configurada: 180 días desde su creación, sin renovación por cada visita.</dd></div>
            <div><dt>_ga_1Y94M3HZRB</dt><dd>Cookie de Google Analytics para mantener el estado de la sesión. Solo tras aceptar y cuando la medición esté activada, con la misma caducidad configurada de 180 días. Los navegadores pueden imponer plazos inferiores.</dd></div>
          </dl>
          <p>El inventario de cookies analíticas debe comprobarse con la configuración real de la propiedad antes de su activación. No se han añadido cookies de publicidad ni conexiones con Google Ads.</p>
        </section>
        <section aria-labelledby="cookies-choice">
          <h2 id="cookies-choice">03. Tu elección</h2>
          <p>Al activarse la medición, el panel permitirá aceptar la analítica, rechazarla o configurarla. Las opciones de aceptar y rechazar tendrán la misma visibilidad. Rechazar no impedirá usar la web.</p>
          <p>La etiqueta de Google se cargará únicamente después de aceptar. La elección se recordará durante 180 días sin ampliar el plazo por nuevas visitas. Podrás cambiarla desde «Configurar cookies», disponible en todas las páginas. Retirarla detendrá la medición de esta integración y eliminará sus cookies accesibles en este navegador; no borra automáticamente los datos ya enviados.</p>
          <p>La elección de cookies es independiente del consentimiento del formulario de contacto. También puedes gestionar cookies y almacenamiento desde tu navegador.</p>
        </section>
        <section aria-labelledby="cookies-google">
          <h2 id="cookies-google">04. Google Analytics y conservación</h2>
          <p>La finalidad prevista es medir visitas a páginas públicas para mejorar el sitio. La integración no envía campos del formulario, emails, nombres, búsquedas ni fragmentos de URL. Se han desactivado en la etiqueta Google Signals y la personalización publicitaria.</p>
          <p>Se propone conservar datos de usuario y eventos durante 2 meses, sin reiniciar el plazo por nueva actividad. Este ajuste debe aplicarse en la propiedad de Google Analytics y no limita los informes agregados estándar. La caducidad de las cookies es un ajuste distinto de la conservación en Google.</p>
          <p>Google puede intervenir en el tratamiento y sus servicios pueden implicar transferencias internacionales. Antes de activar la medición deben comprobarse la entidad contratada, los términos aplicables, subencargados y garantías de transferencias. Consulta los <a href="https://business.safety.google/adsprocessorterms/">términos de tratamiento de Google</a>, su <a href="https://policies.google.com/technologies/partner-sites?hl=es">información sobre sitios que utilizan sus servicios</a> y la <a href="https://support.google.com/analytics/answer/7667196?hl=es">conservación en Analytics</a>.</p>
        </section>
        <section id="contacto" aria-labelledby="cookies-rights">
          <h2 id="cookies-rights">05. Protección de datos</h2>
          <p>Puedes consultar cómo ejercer tus derechos en la <Link href="/politica-de-privacidad">política de privacidad</Link> o escribir a <a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a>.</p>
        </section>
      </Container>
    </main>
    <Footer homeLinks />
  </>;
}
