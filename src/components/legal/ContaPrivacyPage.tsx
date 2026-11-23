import Link from "@/components/i18n/LocaleLink";
import { Container } from "@/components/layout/Container";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import styles from "./LegalPage.module.css";

export default function ContaPrivacyPage() {
  return (
    <>
      <Header redesign homeLinks />
      <main className={styles.page}>
        <Container className={styles.container}>
          <Link className={styles.back} href="/politica-de-privacidad">← Volver a la política de privacidad web</Link>
          <p className={styles.eyebrow}>INFORMACIÓN LEGAL · AUTOMATIZZA CONTA</p>
          <h1>Privacidad de Automatizza Conta</h1>
          <p className={styles.intro}>Esta política explica cómo se tratan los datos personales en Automatizza Conta, el servicio de gestión contable y documental de Automatizza. Se aplica al uso del servicio por empresas clientes y sus usuarios autorizados; la política de privacidad web regula, por separado, los datos recogidos en este sitio web.</p>
          <p className={styles.version}>Última actualización: 23 de noviembre de 2026.</p>

          <section aria-labelledby="conta-roles">
            <h2 id="conta-roles">01. Roles y responsabilidad</h2>
            <p>Con carácter general, la empresa cliente determina para qué y cómo se tratan los datos incorporados a Automatizza Conta y actúa como responsable del tratamiento. Automatizza actúa como encargado del tratamiento, siguiendo las instrucciones documentadas del cliente y lo previsto en el contrato aplicable, incluido en su caso el acuerdo de encargo.</p>
            <p>El cliente es responsable de contar con una base jurídica adecuada, facilitar la información exigible a las personas afectadas y gestionar sus solicitudes de derechos. Automatizza prestará la asistencia razonable que corresponda al encargado para que el cliente pueda cumplir sus obligaciones.</p>
          </section>

          <section aria-labelledby="conta-data">
            <h2 id="conta-data">02. Datos tratados</h2>
            <p>El servicio puede tratar datos incluidos en facturas, justificantes y otros documentos contables: datos de proveedores, clientes y contactos, como nombre, identificación fiscal, dirección, datos de contacto, referencias de pago, importes, conceptos y otra información necesaria para la gestión contable y documental.</p>
            <p>También se tratan los datos de los usuarios autorizados por el cliente, como nombre, correo electrónico, empresa, rol, credenciales y registros de acceso o actividad necesarios para administrar y proteger el servicio.</p>
          </section>

          <section aria-labelledby="conta-purposes">
            <h2 id="conta-purposes">03. Finalidades del tratamiento</h2>
            <p>Automatizza trata los datos únicamente para prestar y mantener Automatizza Conta conforme al contrato y a las instrucciones del cliente. Esto incluye la recepción, organización y consulta de documentación; la gestión contable y documental; la autenticación y administración de usuarios; la seguridad y prevención de usos indebidos; el soporte técnico; las copias de seguridad y la continuidad y recuperación del servicio.</p>
            <p>Cuando resulte aplicable, los datos también podrán tratarse para atender obligaciones legales o requerimientos válidos de autoridades competentes. No se utilizan para publicidad, creación de perfiles comerciales ni para fines propios incompatibles con la prestación del servicio.</p>
          </section>

          <section aria-labelledby="conta-providers">
            <h2 id="conta-providers">04. Proveedores y subencargados</h2>
            <p>Para prestar el servicio, Automatizza puede utilizar proveedores que actúan como subencargados bajo las garantías contractuales aplicables:</p>
            <dl className={styles.facts}>
              <div><dt>Supabase</dt><dd>Infraestructura, base de datos y almacenamiento de archivos (Storage) necesarios para operar Automatizza Conta.</dd></div>
              <div><dt>Google Drive</dt><dd>Destino adicional de copias cifradas de la base de datos y de los documentos originales, cuando esté configurado para la continuidad y recuperación del servicio.</dd></div>
              <div><dt>OpenAI</dt><dd>Solo podrá utilizarse si el cliente lo activa expresamente para una empresa concreta. Su uso estará sujeto a revisión humana, límites de gasto y la exclusión de documentos especialmente sensibles.</dd></div>
            </dl>
            <p>Automatizza selecciona y gestiona estos proveedores para la prestación del servicio y puede actualizar los subencargados cuando resulte necesario, de acuerdo con el contrato aplicable.</p>
          </section>

          <section aria-labelledby="conta-backups">
            <h2 id="conta-backups">05. Copias de seguridad</h2>
            <p>Las copias de seguridad se cifran antes de su envío al destino de copia. Su acceso se limita a las personas responsables de las tareas de recuperación y solo se permite cuando sea necesario para asegurar la continuidad del servicio, investigar una incidencia o restaurar información.</p>
            <p>Las copias no se usan para publicidad, elaboración de perfiles ni para ninguna finalidad distinta de la continuidad y recuperación. Los originales y las copias se tratan con las medidas técnicas y organizativas acordes con su naturaleza y con el contrato aplicable.</p>
          </section>

          <section aria-labelledby="conta-transfers">
            <h2 id="conta-transfers">06. Transferencias internacionales</h2>
            <p>Según la ubicación de los proveedores o de sus subencargados, pueden producirse transferencias internacionales de datos. Cuando sean necesarias, se realizarán con las garantías exigidas por la normativa aplicable, incluidas las cláusulas contractuales tipo u otros mecanismos válidos, junto con las medidas complementarias que correspondan.</p>
          </section>

          <section aria-labelledby="conta-retention">
            <h2 id="conta-retention">07. Conservación</h2>
            <p>Los datos se conservarán durante la vigencia de la relación con el cliente y, una vez finalizada, durante el periodo previsto en el contrato, salvo que una obligación legal exija su conservación durante más tiempo. Las copias de seguridad se eliminarán conforme a sus ciclos de retención y podrán persistir temporalmente hasta que se sobrescriban o expiren de forma segura.</p>
          </section>

          <section aria-labelledby="conta-rights">
            <h2 id="conta-rights">08. Derechos y contacto</h2>
            <p>Las personas afectadas pueden ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad, cuando procedan. Si sus datos se tratan por cuenta de una empresa cliente, deben dirigirse primero a esa empresa como responsable del tratamiento. Automatizza colaborará con el cliente en los términos previstos en el contrato aplicable.</p>
            <p>Para consultas sobre privacidad relacionadas con Automatizza Conta, puedes escribir a <a href="mailto:info@automatizza.es">info@automatizza.es</a>. También puedes presentar una reclamación ante la <a href="https://www.aepd.es/">Agencia Española de Protección de Datos</a>.</p>
          </section>
        </Container>
      </main>
      <Footer homeLinks />
    </>
  );
}
