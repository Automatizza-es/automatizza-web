import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { isPrivacyPolicyReady, privacyPolicy } from "@/content/privacy";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Política de privacidad | Automatizza",
  description: "Borrador de la política de privacidad del formulario de contacto de Automatizza, pendiente de completar y revisar.",
  robots: { index: false, follow: false },
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
          <Link className={styles.back} href="/#contacto">← Volver al contacto</Link>
          <p className={styles.eyebrow}>INFORMACIÓN LEGAL</p>
          <h1>Política de privacidad</h1>
          {!ready && <div className={styles.draft} role="note"><strong>Borrador pendiente de revisión</strong><p>El formulario permanece desactivado. Los datos de la sociedad ya están incorporados; quedan pendientes las validaciones sobre conservación, proveedores y las demás cuestiones señaladas.</p></div>}
          <p className={styles.intro}>Información sobre el tratamiento previsto de los datos que nos facilites para hablar sobre automatización, software a medida, inteligencia artificial o desarrollo web.</p>
          <p className={styles.version}>Versión del borrador: 15 de octubre de 2026 · {privacyPolicy.version}</p>

          <section aria-labelledby="privacy-controller">
            <h2 id="privacy-controller">01. Quién es responsable de tus datos</h2>
            <p>Automatizza es la marca comercial de <strong>{privacyPolicy.legalName}</strong>, sociedad titular de este sitio web y responsable del tratamiento de los datos personales.</p>
            <dl className={styles.facts}>
              <div><dt>Razón social</dt><dd><Pending value={privacyPolicy.legalName} label="denominación de la sociedad responsable" /></dd></div>
              <div><dt>NIF</dt><dd><Pending value={privacyPolicy.taxId} label="NIF de la sociedad" /></dd></div>
              <div><dt>Domicilio</dt><dd><Pending value={privacyPolicy.address} label="domicilio y dirección para ejercer derechos" /></dd></div>
              <div><dt>Correo de contacto</dt><dd><a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a>{!ready && " · confirmar su uso para protección de datos"}</dd></div>
              <div><dt>Delegado de protección de datos</dt><dd><Pending value={privacyPolicy.dpo} label="si procede designarlo y, en su caso, sus datos de contacto" /></dd></div>
            </dl>
          </section>
          <section aria-labelledby="privacy-data">
            <h2 id="privacy-data">02. Qué datos se solicitan</h2>
            <p>Nombre, email, área de interés —opcional—, mensaje y aceptación de esta política. Los campos obligatorios permiten responder a tu solicitud. No incluyas datos sensibles ni información de otras personas que no sea necesaria.</p>
            <p>Para prevenir abuso se prevén identificadores seudonimizados derivados del email y, cuando lo facilite un proxy de confianza, de la dirección IP. La aplicación no guarda las consultas en una base de datos ni utiliza almacenamiento local del navegador para conservarlas.</p>
          </section>
          <section aria-labelledby="privacy-purpose">
            <h2 id="privacy-purpose">03. Para qué se utilizarán y con qué base</h2>
            <p>Los datos se utilizarán para responder consultas y valorar la solución que solicites. Las consultas generales se basarán en tu consentimiento (art. 6.1.a RGPD); las peticiones de presupuesto o actuaciones previas a una contratación solicitadas por ti, en medidas precontractuales (art. 6.1.b).</p>
            <p>La prevención de envíos abusivos se plantea sobre el interés legítimo de mantener la seguridad del servicio (art. 6.1.f). {!ready && <span className={styles.pending}>Pendiente de documentar su ponderación y confirmar la información técnica con el alojamiento definitivo.</span>}</p>
            <p>No se prevé incorporar los contactos a listas comerciales, enviar publicidad por este formulario ni adoptar decisiones automatizadas con efectos jurídicos o elaborar perfiles.</p>
          </section>
          <section aria-labelledby="privacy-retention">
            <h2 id="privacy-retention">04. Durante cuánto tiempo</h2>
            <p>Las comunicaciones se conservarán durante la gestión de la consulta y conforme al plazo o criterio que se defina a continuación. Si se formaliza una relación contractual, deberán concretarse las obligaciones legales de conservación que correspondan.</p>
            <p><Pending value={privacyPolicy.retention} label="plazo o criterio de conservación de consultas y correos, supresión, bloqueo cuando corresponda y retención de copias y registros de proveedores" /></p>
            <p>Los contadores antispam de la aplicación permanecen solo en memoria del servidor, con ventanas de 15 minutos y caducidad lógica. Se eliminan en la limpieza de las siguientes solicitudes o al reiniciar la instancia. No incluyen el mensaje ni la dirección IP en claro.</p>
          </section>
          <section aria-labelledby="privacy-processors">
            <h2 id="privacy-processors">05. Proveedores y posibles destinatarios</h2>
            <p>El envío se ha preparado para Resend y el buzón de contacto de Automatizza. El alojamiento y el proveedor del buzón también pueden intervenir en el tratamiento. Antes de la activación deben confirmarse las entidades contratadas, sus funciones y los acuerdos de encargo del tratamiento aplicables.</p>
            <p><Pending value={privacyPolicy.processors} label="identidad jurídica de Resend y de los proveedores efectivos de alojamiento y correo, contratos, regiones y subencargados" /></p>
            <p>No se prevén cesiones para fines comerciales. Podrán existir comunicaciones cuando las exija una obligación legal.</p>
          </section>
          <section aria-labelledby="privacy-transfers">
            <h2 id="privacy-transfers">06. Transferencias internacionales</h2>
            <p>No se afirma que los datos permanezcan exclusivamente en el Espacio Económico Europeo. Hay que revisar la ubicación y el acceso por parte de cada proveedor y sus subencargados.</p>
            <p><Pending value={privacyPolicy.transfers} label="países, entidades receptoras y garantías aplicables —decisión de adecuación o, en su caso, cláusulas contractuales y medidas complementarias—, con acceso a la información correspondiente" /></p>
          </section>
          <section aria-labelledby="privacy-rights">
            <h2 id="privacy-rights">07. Cómo ejercer tus derechos</h2>
            <p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación y portabilidad, cuando procedan, escribiendo al correo de contacto indicado. Si el tratamiento se basa en el consentimiento, puedes retirarlo sin afectar a su licitud anterior. Podremos solicitar información proporcionada para verificar tu identidad si existen dudas razonables.</p>
            <p>También puedes presentar una reclamación ante la <a href="https://www.aepd.es/">Agencia Española de Protección de Datos</a>. {!ready && <span className={styles.pending}>Debe confirmarse el canal definitivo de ejercicio de derechos antes de publicar la versión aprobada.</span>}</p>
          </section>
          <section aria-labelledby="privacy-security">
            <h2 id="privacy-security">08. Seguridad y alcance</h2>
            <p>El formulario contempla validación en cliente y servidor, controles antispam y envío desde el servidor sin exponer sus credenciales. No realiza altas comerciales ni añade cookies publicitarias. {!ready && <span className={styles.pending}>Antes de aprobar este borrador deben revisarse los registros, las cookies y la analítica del alojamiento y de la web efectiva, así como sus medidas de seguridad y plazos de conservación.</span>}</p>
            <p>El marco de referencia es el <a href="https://www.boe.es/buscar/doc.php?id=DOUE-L-2016-80807">Reglamento (UE) 2016/679</a>, la <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673">Ley Orgánica 3/2018</a> y la <a href="https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758">Ley 34/2002</a>, en lo que resulte aplicable. Esta información se organiza siguiendo el criterio de <a href="https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion">información por capas de la AEPD</a>.</p>
          </section>
          <section id="contacto" className={styles.contact} aria-labelledby="privacy-contact">
            <h2 id="privacy-contact">Una consulta sobre tus datos</h2>
            <p>Puedes escribirnos a <a href={`mailto:${privacyPolicy.rightsEmail}`}>{privacyPolicy.rightsEmail}</a>.</p>
            <Link href="/#contacto">Volver al formulario <span aria-hidden="true">→</span></Link>
          </section>
        </Container>
      </main>
      <Footer homeLinks />
    </>
  );
}
