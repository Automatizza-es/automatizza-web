import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { isPrivacyPolicyReady, privacyPolicy } from "@/content/privacy";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Política de privacidad | Automatizza",
  description: "Cómo trata Automatizza los datos de contacto, sus finalidades, conservación, proveedores y el ejercicio de tus derechos.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/politica-de-privacidad" },
};

function Pending({ value, label }: { value: string; label: string }) {
  return value ? <>{value}</> : <span className={styles.pending}>Pendiente de completar o validar: {label}.</span>;
}

export default function PrivacyPage() {
  const ready = isPrivacyPolicyReady();
  return (
    <>
      <Header redesign homeLinks />
      <main className={styles.page}>
        <Container className={styles.container}>
          <Link className={styles.back} href="/contacto">← Volver al contacto</Link>
          <p className={styles.eyebrow}>INFORMACIÓN LEGAL</p>
          <h1>Política de privacidad</h1>
          {!ready && <div className={styles.draft} role="note"><strong>Versión preparada para revisión final</strong><p>El formulario público permanece desactivado hasta la aprobación de esta versión y la activación del servicio.</p></div>}
          <p className={styles.intro}>Información sobre el tratamiento de los datos que nos facilites para consultar sobre nuestros servicios y sobre los datos técnicos necesarios para utilizar esta web.</p>
          <p className={styles.version}>Última actualización: 20 de octubre de 2026.</p>

          <section aria-labelledby="privacy-controller">
            <h2 id="privacy-controller">01. Quién es responsable de tus datos</h2>
            <p>Automatizza es la marca comercial de <strong>{privacyPolicy.legalName}</strong>, sociedad titular de este sitio web y responsable del tratamiento de los datos personales.</p>
            <dl className={styles.facts}>
              <div><dt>Razón social</dt><dd><Pending value={privacyPolicy.legalName} label="denominación de la sociedad responsable" /></dd></div>
              <div><dt>NIF</dt><dd><Pending value={privacyPolicy.taxId} label="NIF de la sociedad" /></dd></div>
              <div><dt>Domicilio</dt><dd><Pending value={privacyPolicy.address} label="domicilio y dirección para ejercer derechos" /></dd></div>
              <div><dt>Inscripción registral</dt><dd><Pending value={privacyPolicy.registry} label="datos de inscripción de la sociedad" /></dd></div>
              <div><dt>Contacto y ejercicio de derechos</dt><dd><a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a></dd></div>
              {privacyPolicy.dpo && <div><dt>Delegado de protección de datos</dt><dd>{privacyPolicy.dpo}</dd></div>}
            </dl>
          </section>
          <section aria-labelledby="privacy-data">
            <h2 id="privacy-data">02. Qué datos se solicitan</h2>
            <p>Nombre, email, mensaje y aceptación de esta política. Los campos obligatorios permiten responder a tu solicitud. No incluyas datos sensibles ni información de otras personas que no sea necesaria.</p>
            <p>Para prevenir abuso utilizamos identificadores seudonimizados derivados del email y, cuando lo facilita un proxy de confianza, de la dirección IP. El alojamiento puede tratar datos técnicos de las peticiones, como la IP, la ruta solicitada y datos del navegador, para prestar y proteger el servicio. La aplicación no guarda las consultas en una base de datos ni utiliza almacenamiento local del navegador para conservarlas.</p>
          </section>
          <section aria-labelledby="privacy-purpose">
            <h2 id="privacy-purpose">03. Para qué se utilizarán y con qué base</h2>
            <p>Los datos se utilizarán para responder consultas y valorar la solución que solicites. Las consultas generales se basarán en tu consentimiento (art. 6.1.a RGPD); las peticiones de presupuesto o actuaciones previas a una contratación solicitadas por ti, en medidas precontractuales (art. 6.1.b).</p>
            <p>La prevención de envíos abusivos y la seguridad de la web se basan en nuestro interés legítimo de proteger el servicio y las comunicaciones (art. 6.1.f RGPD). Aplicamos controles limitados a esta finalidad, sin utilizarlos para publicidad o perfiles comerciales.</p>
            <p>No se prevé incorporar los contactos a listas comerciales, enviar publicidad por este formulario ni adoptar decisiones automatizadas con efectos jurídicos o elaborar perfiles.</p>
          </section>
          <section aria-labelledby="privacy-retention">
            <h2 id="privacy-retention">04. Durante cuánto tiempo</h2>
            <p><Pending value={privacyPolicy.retention} label="plazo o criterio de conservación de consultas y correos, supresión, bloqueo cuando corresponda y retención de copias y registros de proveedores" /></p>
            <p>Los contadores antispam de la aplicación permanecen solo en memoria del servidor, con ventanas de 15 minutos y caducidad lógica. Se eliminan en la limpieza de las siguientes solicitudes o al reiniciar la instancia. No incluyen el mensaje ni la dirección IP en claro.</p>
            <p>Las copias de seguridad y los registros técnicos de los proveedores siguen sus propios ciclos de conservación y supresión; el plazo del buzón no equivale al borrado inmediato de todas las copias. Resend publica una conservación de mensajes y registros de 30 días en sus planes Free, Pro y Scale. Puedes consultar sus condiciones o solicitar información sobre el tratamiento de tu consulta a nuestro email de contacto.</p>
          </section>
          <section aria-labelledby="privacy-processors">
            <h2 id="privacy-processors">05. Proveedores y posibles destinatarios</h2>
            <p><Pending value={privacyPolicy.processors} label="identidad jurídica de Resend y de los proveedores efectivos de alojamiento y correo, contratos, regiones y subencargados" /></p>
            <p>Puedes consultar las condiciones de tratamiento de <a href="https://vercel.com/legal/dpa">Vercel</a> y <a href="https://resend.com/legal/dpa">Resend</a>, los <a href="https://resend.com/legal/subprocessors">subencargados de Resend</a> y su <a href="https://resend.com/security">información de seguridad y conservación</a>. La información de los subencargados de Vercel está disponible a través de su <a href="https://security.vercel.com/">centro de seguridad</a>.</p>
          </section>
          <section aria-labelledby="privacy-transfers">
            <h2 id="privacy-transfers">06. Transferencias internacionales</h2>
            <p><Pending value={privacyPolicy.transfers} label="países, entidades receptoras y garantías aplicables —decisión de adecuación o, en su caso, cláusulas contractuales y medidas complementarias—, con acceso a la información correspondiente" /></p>
          </section>
          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights">07. Cómo ejercer tus derechos</h2>
            <p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad, cuando procedan, escribiendo al correo de contacto indicado. Si el tratamiento se basa en el consentimiento, puedes retirarlo sin afectar a su licitud anterior. Podremos solicitar información proporcionada para verificar tu identidad si existen dudas razonables.</p>
            <p>Atenderemos tu solicitud, con carácter general, en el plazo de un mes. Cuando la normativa permita una ampliación por la complejidad o el número de solicitudes, te informaremos dentro de ese primer mes.</p>
            <p>También puedes presentar una reclamación ante la <a href="https://www.aepd.es/">Agencia Española de Protección de Datos</a>.</p>
          </section>
          <section aria-labelledby="privacy-security">
            <h2 id="privacy-security">08. Seguridad y alcance</h2>
            <p>Aplicamos validación de campos, controles antispam y envío desde el servidor sin exponer las credenciales del servicio. No incluyas información especialmente sensible en el mensaje. Estas medidas reducen riesgos, pero ningún servicio en Internet puede garantizar seguridad absoluta.</p>
            <p>El marco de referencia es el <a href="https://www.boe.es/buscar/doc.php?id=DOUE-L-2016-80807">Reglamento (UE) 2016/679</a>, la <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673">Ley Orgánica 3/2018</a> y la <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758">Ley 34/2002</a>, en lo que resulte aplicable. Esta información se organiza siguiendo el criterio de <a href="https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion">información por capas de la AEPD</a>.</p>
          </section>
          <section aria-labelledby="privacy-analytics">
            <h2 id="privacy-analytics">09. Medición de visitas y cookies</h2>
            <p>La integración de Google Analytics 4 mediante Google Tag Manager permite medir páginas visitadas y envíos de contacto confirmados únicamente cuando la medición está activada y has aceptado las estadísticas. No enviamos nombre, email, contenido del mensaje ni otros campos del formulario a Analytics. La medición utiliza tu consentimiento (art. 6.1.a RGPD); rechazarla no impide contactar.</p>
            <p>La <Link href="/politica-de-cookies">política de cookies</Link> detalla el panel, los datos y los plazos previstos. La integración bloquea la carga de Google hasta aceptar y permite rechazar o retirar el consentimiento. La aceptación del formulario de contacto es independiente de la elección sobre cookies.</p>
          </section>
          <section id="contacto" className={styles.contact} aria-labelledby="privacy-contact">
            <h2 id="privacy-contact">Una consulta sobre tus datos</h2>
            <p>Puedes escribirnos a <a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a>.</p>
            <Link href="/contacto">Volver al formulario <span aria-hidden="true">→</span></Link>
          </section>
        </Container>
      </main>
      <Footer homeLinks />
    </>
  );
}
