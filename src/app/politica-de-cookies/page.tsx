import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cookiePolicy, getAnalyticsConfig } from "@/lib/analytics/config";
import { privacyPolicy } from "@/content/privacy";
import styles from "../politica-de-privacidad/privacy.module.css";

export const metadata: Metadata = {
  title: "Política de cookies | Automatizza",
  description: "Cookies y almacenamiento de Automatizza: finalidad, duración y opciones para aceptar, rechazar o retirar la medición estadística.",
  robots: { index: false, follow: false },
};

export default function CookiePolicyPage() {
  const analyticsEnabled = getAnalyticsConfig().enabled;
  return <>
    <Header redesign homeLinks />
    <main className={styles.page}>
      <Container className={styles.container}>
        <Link className={styles.back} href="/">← Volver al inicio</Link>
        <p className={styles.eyebrow}>INFORMACIÓN LEGAL</p>
        <h1>Política de cookies</h1>
        {!analyticsEnabled && <div className={styles.draft} role="note"><strong>Las estadísticas están desactivadas en la web pública</strong><p>Google Analytics y Google Tag Manager no se cargan para los visitantes. Esta política explica también el funcionamiento previsto cuando se active la medición, que requerirá tu consentimiento.</p></div>}
        <p className={styles.version}>Última actualización: 20 de octubre de 2026 · {cookiePolicy.version}</p>
        <section aria-labelledby="cookies-owner">
          <h2 id="cookies-owner">01. Responsable y finalidad</h2>
          <p>Automatizza es una marca de {privacyPolicy.legalName}, con NIF {privacyPolicy.taxId}. Puedes escribirnos a <a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a>. Los demás datos de identificación figuran en el <Link href="/aviso-legal">aviso legal</Link>.</p>
          <p>Las cookies y tecnologías similares permiten guardar información en el navegador. Distinguimos el almacenamiento necesario para recordar tu decisión y la medición opcional del uso del sitio. No utilizamos cookies publicitarias.</p>
        </section>
        <section aria-labelledby="cookies-inventory">
          <h2 id="cookies-inventory">02. Cookies y almacenamiento</h2>
          <dl className={styles.facts}>
            <div><dt>automatizza-cookie-consent</dt><dd>Almacenamiento local propio: cuando está disponible el panel, guarda aceptación o rechazo de la analítica, fecha y versión de la elección durante 180 días. Necesario para recordar tu preferencia; no se envía a Google. Si el navegador impide guardarlo, la elección dura solo en la página actual.</dd></div>
            <div><dt>_ga</dt><dd>Cookie de Google Analytics para distinguir navegadores. Solo tras aceptar y cuando la medición esté activada. La configuración limita su duración a 180 días desde su creación, sin renovación por cada visita.</dd></div>
            <div><dt>_ga_1Y94M3HZRB</dt><dd>Cookie de Google Analytics para mantener el estado de la sesión. Solo tras aceptar y cuando la medición esté activada, con la misma caducidad de 180 días. Los navegadores pueden imponer plazos inferiores.</dd></div>
          </dl>
          <p>Estas cookies analíticas no se instalan mientras la medición está desactivada o no has aceptado. No se han añadido conexiones con Google Ads.</p>
        </section>
        <section aria-labelledby="cookies-choice">
          <h2 id="cookies-choice">03. Tu elección</h2>
          <p>Cuando la medición está activada, el panel permite aceptar la analítica, rechazarla o configurarla. Las opciones de aceptar y rechazar tienen la misma visibilidad. Rechazar no impide usar la web.</p>
          <p>Google Tag Manager y la etiqueta de Analytics se cargan únicamente después de aceptar y cuando la medición está activada. La elección se recuerda durante 180 días sin ampliar el plazo por nuevas visitas. Puedes cambiarla desde «Configurar cookies», disponible en todas las páginas cuando el panel está activado. Retirarla detiene la medición de esta integración, elimina sus cookies accesibles y recarga la página para descargar el código de medición; no borra automáticamente los datos ya enviados.</p>
          <p>La elección de cookies es independiente del consentimiento del formulario de contacto. También puedes gestionar cookies y almacenamiento desde tu navegador.</p>
        </section>
        <section aria-labelledby="cookies-google">
          <h2 id="cookies-google">04. Google Analytics y conservación</h2>
          <p>La finalidad es medir visitas a páginas públicas y envíos de contacto confirmados para mejorar el sitio, con tu consentimiento. Google puede tratar identificadores de cookies y datos técnicos de navegación, del dispositivo y de la conexión. La integración no envía campos del formulario, emails, nombres, búsquedas ni fragmentos de URL. Los consentimientos publicitarios se mantienen denegados; Google Signals y la personalización publicitaria están desactivados según la configuración comunicada por la titular.</p>
          <p>La conservación configurada de datos de usuario y eventos es de 2 meses, sin reiniciar el plazo por nueva actividad. Este plazo no limita los informes agregados estándar y es distinto de la duración de las cookies.</p>
          <p>Google puede tratar datos fuera del Espacio Económico Europeo. Sus condiciones contemplan mecanismos para las transferencias internacionales, incluidas cláusulas contractuales cuando resulten aplicables. Puedes consultar los <a href="https://business.safety.google/adsprocessorterms/">términos de tratamiento de Google</a>, sus <a href="https://business.safety.google/adssubprocessors/">subencargados</a>, la <a href="https://policies.google.com/technologies/partner-sites?hl=es">información sobre sitios que utilizan sus servicios</a> y la <a href="https://support.google.com/analytics/answer/7667196?hl=es">conservación en Analytics</a>.</p>
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
