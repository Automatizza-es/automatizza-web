# Información pendiente para cerrar los textos legales

Actualización: 20 de octubre de 2026, rama `rediseño`.
Este inventario no es una auditoría del despliegue público ni una aprobación legal.

**Estado de lanzamiento:** ver [launch.md](launch.md), que recoge las comprobaciones
del 20/10/2026, el plan Pro/Enterprise confirmado por la titular, los textos
concretos preparados y los pasos de dominio, entorno y GTM. Los pendientes
históricos de esta tabla se actualizan con las resoluciones siguientes; no
deben volver a solicitarse como datos aún desconocidos.

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
  Telecomunicaciones, S.L.». La ficha no acredita por sí sola la entidad
  contratada; contrastar la denominación con la factura o contrato.
- Respuesta de Abbas trasladada por la titular el 20/10/2026: los datos se
  tratan en sus instalaciones de Córdoba, España; las copias se hacen en otras
  instalaciones próximas también en Córdoba. Ubicación e infraestructura
  propias confirmadas por el proveedor, sin verificación técnica independiente.
  No hace falta volver a pedirles el país de servidores y copias. La respuesta
  no facilita contrato de encargo, plazos de borrado/copias/registros ni detalle
  de posibles subencargados. No extender esta confirmación a Vercel, Resend o Google.
- Decisión de la titular el 20/10/2026: cerrar por ahora la recopilación de
  información de Abbas con lo recibido y no solicitar más documentación en
  esta fase. Se conserva la confirmación de ubicación; los contratos y plazos
  no aportados quedan anotados como documentación pendiente, sin darlos por
  formalizados ni inventar condiciones. Este cierre de la recopilación no
  aprueba la política ni cambia los interruptores del formulario o la analítica.
- Google Analytics 4 confirmado por la titular mediante el ID `G-1Y94M3HZRB`.
  Integración y panel preparados, con medición real desactivada. La vista local
  sin red permite probar preferencias sin cargar Google. Existe además una
  prueba real de Tag Assistant exclusiva de localhost y tras aceptar estadísticas;
  no activa la medición pública. Véase [analytics.md](analytics.md).

Los datos societarios y registrales figuran en los borradores de privacidad y
aviso legal; este último está disponible en `/aviso-legal` y enlazado en el footer.
La información legal del formulario identifica a la sociedad responsable.
La identidad comercial, el hero y los demás textos comerciales siguen igual.
No se atribuye a estos datos una comprobación independiente en registros oficiales.

## Datos o decisiones que debe confirmar la empresa

| Pendiente | Qué necesitamos | Para qué sirve |
| --- | --- | --- |
| Proveedor del buzón | Recopilación cerrada por ahora por decisión de la titular. Abbas confirma infraestructura propia y copias en Córdoba (España). Quedan anotados como no aportados, sin solicitar más en esta fase: documentación de la entidad contratada, contrato de encargo, posibles subencargados y plazos de supresión, copias y registros. | Conservar lo confirmado y distinguirlo de las condiciones todavía sin documentar; no equivale a una aprobación legal. |
| Alojamiento | La titular confirma Pro/Enterprise el 20/10/2026. Revisadas las condiciones oficiales de Vercel Inc. para esos planes, subencargados y garantías publicadas. Se informa de posibles tratamientos internacionales, sin afirmar residencia exclusivamente europea. | Resuelta la duda sobre el plan. Queda la conexión del dominio y la comprobación del entorno privado de producción, al que no se ha accedido. |
| Resend | Identificado Plus Five Five, Inc. y revisados términos, DPA, conservación publicada y subencargados. Revalidación por API el 20/10: dominio verificado, región `eu-west-1`, envío habilitado y tracking desactivado. | Preparado para el lanzamiento; comprobar las variables privadas en Vercel y un envío real autorizado después del despliegue. No requiere solicitar nuevas credenciales en el chat. |
| Conservación de consultas | Incorporado al texto de lanzamiento un máximo de 12 meses desde el último contacto para consultas sin contratación; otras obligaciones por expediente y bloqueo cuando corresponda. Procedimiento mensual manual en `launch.md`. | Aprobar la versión concreta y aplicar el procedimiento al buzón. No se promete que las copias de Abbas ya tengan un plazo confirmado ni un borrado automático configurado. |
| Atención de derechos y DPD | Canal establecido: info@automatizza.es. El texto explica derechos y plazo general de un mes. No se inventa un DPD y se muestra su contacto solo si se facilita. | La ausencia de un campo DPD no bloquea por sí sola la preparación de los textos. La obligación de designarlo se valora por las actividades de la sociedad. |
| Medición | La titular confirma las tres etiquetas configuradas y pruebas reales locales de visitas y consentimiento en Tag Assistant/DebugView. Duplicados por historial corregidos y prueba repetida sin duplicados; retirada, borrado de cookies, nueva aceptación y publicidad denegada comprobados. | Esta validación está realizada según su informe. Quedan una conversión tras éxito real no indicada en el informe, publicación si sigue pendiente y activación/comprobación final en producción. Véanse [analytics.md](analytics.md) y [gtm-configuration.md](gtm-configuration.md). |

Con el proveedor y la configuración definitivos se revisarán los acuerdos de
encargo, países, subencargados y garantías de transferencias. No basta con que
una región se denomine europea para concluir que no hay accesos internacionales.

La observación de Abbas sobre una web visible «al mundo» se refiere a la
publicación de contenido y a la seguridad de la aplicación. No se interpreta
como autorización para publicar consultas ni como afirmación de que el formulario
exponga los datos enviados. El código no muestra las consultas en páginas públicas;
las tramita desde el servidor hacia los proveedores del servicio de contacto.

## Resultado de la revisión del código sobre cookies

- El panel de cookies preparado utiliza `localStorage` para recordar la
  elección durante 180 días. Su vista de prueba usa una clave independiente
  que nunca habilita la medición real. No hay almacenamiento de consultas allí.
- Se ha preparado la carga condicional de GA4 tras aceptar. Está bloqueada por
  revisión legal e interruptor en producción. La vista local sin red no carga
  Google; la prueba específica de Tag Assistant solo lo carga en localhost
  tras consentimiento, sin aprobar los textos ni activar el formulario.
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

## Cierre y activación

1. Privacidad completada y aprobada expresamente por la titular el 20/10/2026,
   versión `2026-10-20-prelanzamiento-1`; `privacyPolicy.reviewed=true`.
2. Aviso legal aprobado en la misma revisión, con los datos registrales facilitados.
3. Revisar `/politica-de-cookies` y el panel ya preparados. Contrastar el
   inventario previsto con la propiedad y las cookies efectivas al activarla.
4. Aplicar el criterio aprobado de conservación y la gestión de derechos
   documentados en `launch.md`; no queda pendiente pedir de nuevo esos datos.
5. El dominio de Resend ya está verificado y se ha comprobado un envío real
   local con entrega y Reply-To correctos el 15/10/2026. Validar su configuración
   en el alojamiento definitivo y activar mediante el interruptor de entorno
   cuando esté preparado el despliegue autorizado. El dominio está en proceso
   de conexión: la titular ya ha remitido a Abbas los registros web de Vercel.

La configuración técnica del formulario está en [contact-form.md](contact-form.md).

Fuentes oficiales:

- [LSSI, art. 10 y 22](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758).
- [AEPD: derecho de información](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion).
- [AEPD: contrato entre responsable y encargado](https://www.aepd.es/preguntas-frecuentes/2-tus-obligaciones-como-responsable-del-tratamiento/8-responsable-y-encargado-del-tratamiento/FAQ-0252-sobre-relacion-entre-responsable-y-encargado).
- [AEPD: guía de cookies](https://www.aepd.es/guias/guia-cookies.pdf).
- [AEPD: garantías de transferencias](https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/garantias-transferencias-datos-personales).
- [Vercel: DPA y planes incluidos](https://vercel.com/legal/dpa).
- [Resend: DPA](https://resend.com/legal/dpa).
