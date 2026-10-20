# Lanzamiento de Automatizza — 20/10/2026

Preparación realizada en `rediseño`. La titular ha aprobado expresamente la
versión de privacidad y aviso legal el 20/10/2026. Esta aprobación se registra
en el código; no equivale a una certificación legal ni a firmar contratos de
proveedores. No se ha hecho merge, publicado GTM ni desplegado este trabajo.
La activación del formulario y la analítica siguen siendo independientes.

## Resuelto

- Sociedad, NIF, domicilio, registro y email de derechos incorporados.
- Abbas confirma buzón y copias en Córdoba; recopilación cerrada por decisión
  de la titular. No volver a solicitar datos en esta fase. El contrato y los
  ciclos de borrado no aportados se mantienen como documentación interna
  pendiente; no se presentan como firmados, verificados o legalmente dispensados.
- La titular confirma que el proyecto Vercel está en Pro o Enterprise.
  Sus condiciones publicadas cubren estos planes. No se ha comprado ni cambiado
  ningún plan ni aceptado términos en nombre de la empresa.
- Resend comprobado por API el 20/10: dominio `automatizza.es` verificado,
  envío habilitado, región `eu-west-1`, tracking de aperturas y clics desactivado.
  Todas las variables locales de envío existen; no se han expuesto sus valores.
- Privacidad, aviso legal y cookies preparados con textos de lanzamiento.
  Notas operativas fuera de los textos principales. Los avisos de revisión
  de privacidad y aviso legal desaparecen al aprobar la versión.
- Se mantiene `info@automatizza.es` para derechos. No se inventa un DPD ni se
  exige un contacto de DPD para completar el texto si no se ha facilitado uno.
  Esta decisión de presentación no sustituye la evaluación de si la sociedad
  debe designarlo por sus actividades reales.
- Configuración y pruebas de consentimiento básico, publicidad denegada y
  conversión solo tras éxito confirmado conservadas.
- La titular comunica la configuración de las tres etiquetas y pruebas locales
  reales en Tag Assistant/DebugView: visitas y URL correctas, duplicados por
  historial corregidos, una visita por navegación, aceptación/retirada y nueva
  aceptación operativas, cookies borradas y publicidad siempre denegada. Esta
  parte de la validación está realizada; no se vuelve a pedir como pendiente.
- Comprobaciones de esta preparación: 43 pruebas (23 de contacto y 20 de
  analítica), lint y build correctos. Privacidad y cookies revisadas en el
  navegador a 1280 px y 390 px sin desbordamiento horizontal; sin scripts
  Google con estadísticas rechazadas. Enlaces entre páginas legales y retorno
  a Contacto comprobados. No se ha enviado ningún email real en esta auditoría.

## Versión aprobada por la titular

- Texto preparado: `src/content/privacy.ts`, versión
  `2026-10-20-prelanzamiento-1`, y páginas `/politica-de-privacidad`,
  `/aviso-legal` y `/politica-de-cookies`.
- Consultas sin contratación: conservar durante su gestión y como máximo
  12 meses desde el último contacto, con borrado anterior si dejan de ser
  necesarias. Documentación contractual por sus obligaciones aplicables;
  bloqueo únicamente cuando corresponda. No se promete un plazo de borrado
  inmediato de copias de los proveedores que no esté confirmado.
- La persona que gestione el buzón debe revisar mensualmente las consultas
  vencidas, suprimirlas o separarlas para el bloqueo que proceda y dejar
  constancia de la revisión sin duplicar el contenido de los mensajes.
  No se ha configurado un borrado automático en el correo de Abbas.
- Atender derechos desde el buzón habitual; plazo general de un mes, con las
  ampliaciones legales e información a la persona solicitante cuando proceda.
- La analítica utiliza consentimiento separado; la conservación prevista es
  de 2 meses para datos de usuario/evento y 180 días para cookies, sin renovación.
  Verificar valores efectivos en las cuentas antes de activarla.

La titular responde «Sí, apruebo esta versión» a la revisión de
`2026-10-20-prelanzamiento-1` el 20/10/2026. Se ha establecido
`privacyPolicy.reviewed=true`; el contacto de DPD sigue sin inventarse.
La activación requiere además `CONTACT_FORM_ENABLED=true` y configuración
válida de Resend en el entorno de despliegue.

## Dominio definitivo: paso de configuración pendiente

Comprobación DNS el 20/10/2026:

- `automatizza.es`: respuesta DNS NOERROR sin dirección A.
- `www.automatizza.es`: NXDOMAIN.
- Nameservers: `ns1.abbastelecom.net` y `ns2.abbastelecom.net`.
- Existen MX de Abbas. No cambiar nameservers, MX, SPF, DKIM ni DMARC para
  conectar la web. El envío verificado de Resend ya funciona.
- `https://automatizza-web.vercel.app/contacto`: HTTP 200.

En Vercel → proyecto `automatizza-web` → Settings → Domains, añadir
`automatizza.es` y `www.automatizza.es`; mantener como principal el dominio
sin `www`, coherente con el canonical, y redirigir `www` al principal.
Copiar los valores exactos que muestre Vercel (A/CNAME y TXT si lo solicita).
No usar una IP de ejemplo ni cambiar el DNS del correo.

Aplicar esos registros web en el DNS de Abbas, o entregar a quien lo gestione
los valores generados por Vercel. No se han modificado DNS ni añadido dominios
porque el panel disponible solicita iniciar sesión y no hay acceso al DNS.
Después verificar Valid Configuration, certificado HTTPS y redirecciones.

La titular comunica que ya ha enviado a Abbas los valores que le muestra Vercel:

| Tipo | Nombre | Valor facilitado por la titular |
| --- | --- | --- |
| A | `@` | `216.150.1.1` |
| CNAME | `www` | `ce229caec7430d66.vercel-dns-016.com` |

Ha solicitado conservar los registros de correo/Resend y nameservers actuales,
y sustituir únicamente los registros web incompatibles. No volver a pedir los
valores ni reenviar el correo; verificar su aplicación cuando estén disponibles.
La comunicación de estos valores no demuestra que el cambio DNS ya esté aplicado.

Mensaje preparado para quien gestione el DNS:

> Queremos conectar únicamente la web de automatizza.es al proyecto de Vercel.
> Adjuntamos los registros A/CNAME y, si corresponde, TXT indicados por el
> panel de ese proyecto. Conservad los nameservers actuales y todos los
> registros de correo existentes (MX, SPF, DKIM y DMARC). El correo debe seguir
> funcionando con Abbas. No hay que cambiar la configuración de Resend.

## Variables de producción y activación del formulario

No se ha accedido al entorno privado de Vercel. Comprobar allí los valores
ya existentes sin copiarlos en chats ni commits:

- `NEXT_PUBLIC_SITE_URL=https://automatizza.es`.
- `RESEND_API_KEY`, `RESEND_VERIFY_API_KEY` si se usa una clave separada,
  `RESEND_DOMAIN_ID`, `RESEND_FROM_EMAIL` y `CONTACT_TO_EMAIL`: valores privados
  existentes. Destinatario previsto: `info@automatizza.es`.
- `CONTACT_ALLOWED_ORIGINS`: solo los orígenes propios que vayan a utilizar
  realmente el formulario, por ejemplo `https://automatizza.es` y el alias
  propio `https://automatizza-web.vercel.app` durante la prueba. Sin comodines.
- `CONTACT_FORM_ENABLED=true` únicamente tras aprobar privacidad.
- `CONTACT_FORM_TEST_MODE=false`.
- `ANALYTICS_PREVIEW=false` y `ANALYTICS_TAG_ASSISTANT=false`.
- Mantener `ANALYTICS_ENABLED=false` hasta completar la revisión de GTM.

Los flags de desarrollo nunca habilitan un envío o GTM en producción. Tras
aprobar el texto y configurar el entorno, un merge/push a main autorizado
debe generar el nuevo despliegue. No modificar Vercel ni desplegar en este paso
de preparación. Una vez desplegado, realizar un único envío con datos ficticios
autorizado, comprobar respuesta real del servidor, recepción y Reply-To.

## Activación de estadísticas

El workspace ya está configurado y sus visitas/consentimiento han sido probados
por la titular con Vista previa y DebugView; véase `analytics.md`. En particular,
las visitas automáticas de historial de GA4 se desactivaron y se repitió la
prueba sin duplicados. No repetir la configuración ni tratar estas pruebas
como trabajo por hacer. Conservar desactivada la medición automática de
formularios conforme a `gtm-configuration.md`.

Queda la prueba no indicada en el informe: un envío real confirmado por el
servidor, con consentimiento estadístico, debe producir exactamente un
`generate_lead` con `form_id=contact` en GA4. El comando de prueba de Tag Assistant
no habilita envíos; no simular la conversión ni cambiarla a un activador de clic.

Tras las comprobaciones y autorización, publicar el workspace de GTM,
aprobar `cookiePolicy.reviewed` y establecer `ANALYTICS_ENABLED=true` en el
despliegue correspondiente. Después comprobar en el dominio definitivo:
cero GTM/GA sin aceptación o tras rechazo; una visita inicial y por ruta;
publicidad siempre denegada; retirada con borrado y recarga; un `generate_lead`
con `form_id=contact` únicamente tras éxito real y consentimiento vigente,
sin datos personales ni duplicados. No usar un evento manual como prueba de envío.

No se han publicado ni inspeccionado las etiquetas privadas desde aquí; su
configuración y la validación manual se acreditan mediante el informe de la
titular. El informe no confirma publicación ni conversión tras envío real.
No deducir el estado actual del workspace de la antigua consulta pública vacía.
Lanzar la web y el contacto puede separarse de activar estadísticas; no se activa
la medición hasta superar las comprobaciones restantes.

## Fuentes revisadas

- [Vercel DPA, planes Pro/Enterprise y transferencias](https://vercel.com/legal/dpa).
- [Conectar dominio usando los registros del proyecto](https://vercel.com/docs/domains/working-with-domains/add-a-domain).
- [Resend: términos y entidad](https://resend.com/legal/terms-of-service).
- [Resend: contrato de tratamiento y transferencias](https://resend.com/legal/dpa).
- [Resend: seguridad y conservación](https://resend.com/security).
- [Google: condiciones de tratamiento](https://business.safety.google/adsprocessorterms/).
- [AEPD: información a las personas](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion).
- [AEPD: ejercicio de derechos y plazos](https://www.aepd.es/derechos-y-deberes/ejerce-tus-derechos).
