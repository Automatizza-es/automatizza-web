# GA4 mediante Google Tag Manager y consentimiento básico v2

## Estado en rediseño

- GA4: `G-1Y94M3HZRB`; contenedor: `GTM-59RBDRPH`; sitio: `https://automatizza.es`.
  IDs públicos, sustituibles con `GOOGLE_ANALYTICS_ID` y `GOOGLE_TAG_MANAGER_ID`.
- Se ha retirado la instalación directa de `gtag.js`. Solo GTM configura GA4.
- La titular confirma configurados conservación, Signals, personalización,
  ocultación de datos y medición mejorada en GA4. No se ha accedido a su cuenta
  para comprobar los valores concretos o sus opciones de automatización.
- Consulta del recurso público `gtm.js?id=GTM-59RBDRPH` el 19/10/2026: versión 1,
  `tags: []`, `rules: []`. La etiqueta indicada por la titular puede estar en un
  espacio de trabajo sin publicar. No se ha modificado ni publicado el contenedor.
- No se ha modificado main ni desplegado este trabajo. La medición permanece
  cerrada: `cookiePolicy.reviewed=false` y `ANALYTICS_ENABLED=false`.
- `ANALYTICS_PREVIEW=true` solo permite revisar el panel con `next dev` fuera de
  Vercel, sin cargar Google ni generar conversiones. La elección sintética usa
  `automatizza-cookie-consent-preview` y nunca se convierte en consentimiento real.

## Contrato entre web y GTM

La web obtiene consentimiento y emite únicamente dos eventos de dataLayer:

| Evento de la web | Evento GA4 configurado en GTM | Datos permitidos |
| --- | --- | --- |
| `automatizza_page_view` | `page_view` | `page_location`, `page_title`, `page_referrer` |
| `automatizza_contact_success` | `generate_lead` | Los anteriores y `form_id=contact` |

Ambos incluyen `analytics_consent=granted` para el filtro del activador. Las URL
se construyen con el dominio canónico y una lista cerrada de rutas; nunca incluyen
query, hash, rutas arbitrarias o referrer externo. No se transmiten nombre, email,
mensaje, servicio elegido, respuestas de error, identificadores de envío, user_id
ni propiedades de usuario. Los IDs de reintento solo se usan en memoria para
no duplicar la conversión.

El evento de contacto ocurre después de una respuesta HTTP correcta con
`ok === true`: el servidor ya ha validado y recibido confirmación de aceptación
por Resend. Eso no acredita la entrega en el buzón ni una venta. No se emite por
clic, validación, honeypot, rechazo del proveedor, timeout, error o envío local
con `testMode`. Sin consentimiento al completarse, no se guarda para enviarlo
más tarde. La aceptación de privacidad del formulario no concede estadísticas.

## Configuración pendiente dentro de GTM/GA4

Aplicar [gtm-configuration.md](gtm-configuration.md) en el espacio de trabajo,
**sin publicar todavía**. Hay que adaptar la etiqueta principal existente,
no instalar otra. Incluye las dos etiquetas de evento y el filtro de consentimiento.

Es imprescindible desactivar el page view automático de la etiqueta y comprobar
las opciones de medición mejorada en GA4. Los eventos de historial siguen pudiendo
emitirse aunque `send_page_view=false`; los eventos automáticos de formulario
pueden ocurrir sin que Resend confirme el envío. Para esta integración se recomienda
desactivar toda la medición mejorada y conservar solo los eventos controlados.
La ocultación de datos en GA4 no sustituye estas restricciones en origen.

Los parámetros globales conservadores se preparan antes de cargar GTM, pero una
configuración explícita de la etiqueta tiene precedencia: deben repetirse dentro
del contenedor. El código de la web no puede cambiar remotamente la propiedad
ni garantizar lo que publique alguien posteriormente en GTM.

## Consentimiento y ciclo de vida

1. Sin elección o con rechazo: no se incluye ningún script, iframe noscript,
   preload ni petición de GTM/GA. Las cookies de esta integración se limpian al
   resolver el rechazo; un estado de hidratación aún desconocido no borra las
   cookies de una aceptación previamente guardada.
2. Tras aceptar: se encolan los cuatro consentimientos denegados por defecto;
   se concede solo `analytics_storage` y se mantienen `ad_storage`, `ad_user_data`
   y `ad_personalization` denegados. Después se carga una única vez `gtm.js`.
3. Cada cambio de ruta pública en Next.js emite una visita, incluida la inicial
   y la carga con consentimiento recordado. Repetir el mismo efecto/ruta no
   duplica la visita. Los cambios de ancla no son visitas nuevas.
4. Retirada: se guarda primero el rechazo, se activa `ga-disable-G-1Y94M3HZRB`,
   se actualiza consentimiento denegado, se elimina el script propio y se borran
   `_ga` y `_ga_1Y94M3HZRB` en dominios y rutas accesibles. Se recarga la página
   para descargar los listeners y temporizadores ya ejecutados por Google.
   Quitar solo el elemento script no los detendría. No se sustituye dataLayer
   mientras GTM está vivo ni se promete borrar datos ya enviados o cancelar
   peticiones que hubieran salido antes de retirar el consentimiento.
5. La elección dura 180 días sin renovación por visita. Se sincroniza entre
   pestañas, se revisa la caducidad durante la navegación y antes de emitir,
   y se solicita de nuevo si cambia la versión del consentimiento. Si el
   almacenamiento no está disponible, la elección dura solo en este documento.

Los plazos analíticos de cookies deben fijarse en GTM a 180 días con
`cookie_update=false`; aún deben verificarse las cookies efectivas. El panel,
la aprobación de cookies y la activación del formulario siguen siendo independientes.
Los borradores legales no se han aprobado automáticamente por recibir los IDs.

## Comprobaciones y límites

- `npm run test:analytics`: carga inicial, navegación, orden del consentimiento,
  una sola carga de GTM, exclusión de datos personales, caducidad, retirada,
  rechazo entre pestañas, recarga y conversión solo tras éxito confirmado.
- Una prueba integra el manejador real de contacto con un proveedor simulado:
  validación, honeypot, servicio desactivado, dominio sin verificar, fallo de
  red/proveedor, respuesta sin ID y aceptación. No envía correos reales.
- `npm run test:contact`, `npm run lint` y `npm run build`.
- Panel local sin red: aceptar, rechazar, preferencias, navegación y móvil.
  Esa vista no demuestra recepción en la propiedad ni ejecuta el contenedor.
- Consulta del contenedor público, sin ejecutar su código ni acceder a cuentas.

Antes de producción: terminar/revisar contenedor y textos, publicar los ajustes
remotos cuando se autorice, establecer `cookiePolicy.reviewed=true` y
`ANALYTICS_ENABLED=true`, reconstruir/desplegar y comprobar con Tag Assistant y
la pestaña Network: cero Google antes de aceptar y tras rechazar, GA inicial y
SPA sin duplicados, cookies reales, retirada/recarga y `generate_lead` solo tras
éxito. Validar recepción en DebugView/tiempo real y marcar `generate_lead` como
evento clave. No hay API secret ni Measurement Protocol ni bypass por servidor.

## Fuentes oficiales

- [Consent mode básico](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic).
- [dataLayer: conservar su identidad](https://developers.google.com/tag-platform/tag-manager/datalayer).
- [Page views manuales y medición mejorada](https://developers.google.com/analytics/devguides/collection/ga4/views).
- [Medición de aplicaciones SPA](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications).
- [Eventos de medición mejorada](https://support.google.com/analytics/answer/9216061?hl=es).
- [Precedencia de parámetros](https://developers.google.com/tag-platform/gtagjs/reference).
