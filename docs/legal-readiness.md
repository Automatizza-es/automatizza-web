# Información pendiente para cerrar los textos legales

Actualización: 16 de octubre de 2026, rama `rediseño`.
Este inventario no es una auditoría del despliegue público ni una aprobación legal.

## Identificación recibida

Datos facilitados directamente por la titular:

- Automatizza: marca comercial de Grain Store Technology, S.L.
- NIF: B56885676.
- Domicilio: Calle Párroco Bartolomé Blanco, 46, 14014 Córdoba, España.
- Contacto: info@automatizza.es.
- Registro Mercantil de Córdoba, hoja CO-45659, tomo 2946, folio 21,
  facilitado en una captura el 16/10/2026. El NIF de la captura coincide con el
  comunicado anteriormente; no se añade un número de inscripción no facilitado.
- Abbas: proveedor de correo indicado por la titular. El enlace facilitado
  conduce a una ficha de Google titulada «ABBAS Servicios de Informática y
  Telecomunicaciones, S.L.». La ficha no acredita la entidad contratada ni
  dónde se aloja el buzón; confirmar estos extremos con su documentación.
- Google Analytics 4 confirmado por la titular mediante el ID `G-1Y94M3HZRB`.
  Integración y panel preparados, con medición real desactivada. La vista local
  permite probar preferencias sin cargar Google. Los detalles de Abbas siguen
  pendientes: la titular aún no dispone de esa información.

Los datos societarios y registrales figuran en los borradores de privacidad y
aviso legal; este último está disponible en `/aviso-legal` y enlazado en el footer.
La información legal del formulario identifica a la sociedad responsable.
La identidad comercial, el hero y los demás textos comerciales siguen igual.
No se atribuye a estos datos una comprobación independiente en registros oficiales.

## Datos o decisiones que debe confirmar la empresa

| Pendiente | Qué necesitamos | Para qué sirve |
| --- | --- | --- |
| Proveedor del buzón | Abbas está identificado como proveedor: confirmar entidad contratada, si aloja el correo o utiliza a otro proveedor, países de servidores/copias, conservación y contrato de encargo. No necesita disponer de web. | Identificar quién recibe y conserva realmente las consultas. |
| Alojamiento | El despliegue actual está en Vercel. Confirmar cuenta/plan, condiciones aplicables y región de ejecución; sin enviar contraseñas o claves. | Comprobar el acuerdo que cubre el plan concreto, subencargados, logs, retención y posibles transferencias. |
| Resend | Confirmar entidad contratada, acuerdos, retención y subencargados. Región técnica `eu-west-1` y seguimiento de aperturas/clics desactivado, comprobados por API el 15/10/2026. | Completar los proveedores y garantías; las credenciales ya están configuradas de forma privada. La región de envío no cierra por sí sola la revisión de transferencias. |
| Conservación de consultas | Propuesta: máximo 12 meses desde el último contacto para consultas sin contratación, con supresión o bloqueo cuando corresponda. Aprobar el plazo y acordar su aplicación al buzón y las copias. | Aplicar un criterio real; los expedientes de clientes se valoran por separado. Véase [propuesta de conservación](legal-retention-proposal.md). |
| Atención de derechos y DPD | Mantener info@automatizza.es como canal y organizar quién lo atiende. Valorar por separado si procede designar DPD; no se presume que lo sea. | El ejercicio de derechos debe informarse y atenderse aunque todavía no haya solicitudes; no exige un buzón nuevo. |
| Medición | ID GA4 recibido. Revisar los ajustes de la propiedad, conservación, términos y transferencias antes de aprobar la política de cookies y activar el interruptor. | El bloqueo previo y el panel están preparados; véase [analytics.md](analytics.md). No se usa el consentimiento del formulario para medición. |

Con el proveedor y la configuración definitivos se revisarán los acuerdos de
encargo, países, subencargados y garantías de transferencias. No basta con que
una región se denomine europea para concluir que no hay accesos internacionales.

## Resultado de la revisión del código sobre cookies

- El panel de cookies preparado utiliza `localStorage` para recordar la
  elección durante 180 días. Su vista de prueba usa una clave independiente
  que nunca habilita la medición real. No hay almacenamiento de consultas allí.
- Se ha preparado la carga condicional de GA4 tras aceptar. Está bloqueada por
  revisión legal e interruptor; la vista local no carga la etiqueta de Google.
- No se han añadido publicidad, iframes de mapas o vídeos externos ni chat.
- Las demos de proyectos son componentes propios. El formulario solo llama a
  `/api/contacto`; la comunicación con Resend está en el servidor. El formulario
  público sigue bloqueado; hay un modo de prueba local con datos ficticios que
  no puede activarse en Vercel ni en producción.
- Las tipografías se incorporan con `next/font`; comprobar también los recursos
  realmente servidos por el despliegue final.

Esta revisión permite describir el código actual, no asegurar que el CDN,
alojamiento, una configuración externa o futuras integraciones no añadan cookies.
Antes del cierre hay que revisar las respuestas HTTP, solicitudes y almacenamiento
del navegador en una sesión limpia del despliegue definitivo, incluyendo las
páginas de proyectos y el formulario, sin confundir herramientas de desarrollo
con servicios para visitantes.

Si se confirma que no hay tecnologías sujetas a consentimiento, no hace falta
añadir un banner de aceptación por defecto. Las cookies estrictamente necesarias
están exceptuadas en los términos que explica la AEPD. Si se incorporan tecnologías
no exentas, documentar nombre, proveedor, finalidad y duración, implementar su
bloqueo previo y permitir aceptar, rechazar, configurar y retirar el consentimiento.

## Cierre pendiente

1. Completar y revisar el borrador de privacidad con la información anterior.
2. Revisar el borrador de `/aviso-legal`, ya preparado con los datos registrales.
3. Revisar `/politica-de-cookies` y el panel ya preparados. Contrastar el
   inventario previsto con la propiedad y las cookies efectivas al activarla.
4. Revisar el tratamiento de consultas, seguridad y gestión de derechos con la
   empresa; aprobar expresamente la versión definitiva.
5. El dominio de Resend ya está verificado y se ha comprobado un envío real
   local con entrega y Reply-To correctos el 15/10/2026. Validar su configuración
   en el alojamiento definitivo. Mantener desactivado el envío público hasta
   la aprobación; esta prueba técnica no aprueba la política.

La configuración técnica del formulario está en [contact-form.md](contact-form.md).

Fuentes oficiales:

- [LSSI, art. 10 y 22](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758).
- [AEPD: derecho de información](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion).
- [AEPD: guía de cookies](https://www.aepd.es/guias/guia-cookies.pdf).
- [AEPD: garantías de transferencias](https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/garantias-transferencias-datos-personales).
- [Vercel: DPA y planes incluidos](https://vercel.com/legal/dpa).
- [Resend: DPA](https://resend.com/legal/dpa).
