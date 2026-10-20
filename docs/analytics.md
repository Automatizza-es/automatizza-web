# GA4 mediante Google Tag Manager y consentimiento básico v2

## Estado comprobado el 20/10/2026

- El formulario se encuentra en `/contacto`; conserva `form_id=contact` y el
  mismo evento de éxito confirmado. La ruta está en la lista de páginas
  permitidas. La antigua entrada `/#contacto` no registra una visita intermedia
  a la home antes de redirigir. No se han añadido etiquetas ni integraciones.

- GA4: `G-1Y94M3HZRB`; contenedor: `GTM-59RBDRPH`; sitio: `https://automatizza.es`.
  IDs públicos, sustituibles con `GOOGLE_ANALYTICS_ID` y `GOOGLE_TAG_MANAGER_ID`.
- Se ha retirado la instalación directa de `gtag.js`. Solo GTM configura GA4.
- La titular confirma configurados conservación, Signals, personalización,
  ocultación de datos y medición mejorada en GA4. Además comunica la validación
  manual del workspace con Tag Assistant y DebugView, detallada abajo. No se
  ha accedido a su cuenta para inspeccionarla de forma independiente.
- Producción activada el 20/10/2026: `cookiePolicy.reviewed=true` y
  `ANALYTICS_ENABLED=true`, commit `fb84daa` desplegado correctamente.
  Credenciales y flags de producción configurados en Vercel; modos locales
  de vista previa y Tag Assistant desactivados en producción.
- GTM versión 2 publicada y revisada directamente: tres etiquetas, eventos
  filtrados por consentimiento, sin detección de datos proporcionados por
  usuarios, cookies 180 días sin renovación y `send_page_view=false`.
- Prueba real en https://automatizza.es/contacto: envío aceptado y entregado
  por Resend, un `automatizza_contact_success` y etiqueta `generate_lead`
  completada. Tag Assistant muestra el hit enviado al endpoint GA4 con
  `form_id=contact` y sin campos del formulario. Recargar no repite el lead.
- Tag Assistant confirma estadísticas concedidas y publicidad denegada.
  Antes de consentir no se cargan scripts Google; retirarlo recarga el
  documento sin scripts Google, también durante la navegación posterior.
  Detalles en [launch.md](launch.md).
- `ANALYTICS_PREVIEW=true` solo permite revisar el panel con `next dev` fuera de
  Vercel, sin cargar Google ni generar conversiones. La elección sintética usa
  `automatizza-cookie-consent-preview` y nunca se convierte en consentimiento real.
- `npm run dev:tag-assistant` permite una prueba real local en
  `http://127.0.0.1:3003/contacto`, en rediseño sin desplegar. Activa únicamente
  para ese proceso `ANALYTICS_TAG_ASSISTANT=true` con la vista sin red desactivada;
  el permiso solo funciona en desarrollo fuera de Vercel y sobre loopback.
  Conserva consentimiento explícito y publicidad denegada. No cambia la revisión
  legal ni habilita envíos. Instrucciones y límites en
  [gtm-configuration.md](gtm-configuration.md#prueba-del-workspace-sin-publicar-ni-desplegar).

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

## Validación manual comunicada por la titular el 20/10/2026

Se da por realizada esta configuración y estas pruebas locales conforme al
informe de la titular; no se requiere rehacer el workspace ni repetirlas como
si estuvieran pendientes:

- Tres etiquetas: Google principal con Initialization - All Pages y variable
  de ajustes que incluye `send_page_view=false`; `GA4 - page_view` con
  `automatizza_page_view`; `GA4 - generate_lead` con
  `automatizza_contact_success`.
- Las dos etiquetas de evento filtran `analytics_consent=granted`; las tres
  requieren `analytics_storage`. Página y `form_id` usan las variables DLV
  previstas en `gtm-configuration.md`.
- DebugView recibe visitas y URL de página esperadas. Detectados duplicados,
  se desactivaron las visitas automáticas por cambios de historial en GA4;
  la repetición de la prueba confirma una visita por navegación.
- Al aceptar: `analytics_storage=granted`, con `ad_storage`, `ad_user_data`
  y `ad_personalization=denied`.
- Al retirar: recarga de la web, cese de visitas y eliminación de `_ga` y
  `_ga_1Y94M3HZRB`. Al volver a aceptar, se reanuda la medición; DebugView
  muestra un dispositivo nuevo después de borrar cookies, según lo observado.

El informe acredita las pruebas locales de la titular. La comprobación propia
posterior en producción añade publicación, envío real y hit de conversión,
como se detalla al inicio. No se confunde un hit enviado con una venta ni con
una comprobación independiente de todos los informes agregados de GA4.

## Configuración que debe conservarse al publicar

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

Los plazos analíticos publicados en GTM son 180 días con
`cookie_update=false`; los navegadores pueden imponer duraciones inferiores. El panel,
la aprobación de cookies y la activación del formulario siguen siendo independientes.
Los borradores legales no se han aprobado automáticamente por recibir los IDs.

## Comprobaciones y límites

- Auditoría local del 20/10/2026: 43 pruebas (20 de analítica y 23 de contacto),
  lint y build correctos. En el navegador local: ningún script Google antes
  de aceptar; un único `gtm.js` tras aceptar y durante navegación interna;
  tras retirar, documento recargado sin scripts Google y envío bloqueado.
  Estas pruebas propias verifican el cargador y el consentimiento. La titular
  aporta además la validación manual real de las etiquetas de visitas y su
  recepción en GA4, recogida arriba; no se confunden ambas procedencias.
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

La activación de producción y el envío real se completaron el 20/10/2026.
Conservar estas restricciones al modificar GTM. Las métricas agregadas y la
clasificación de `generate_lead` como evento clave se administran en GA4; no
se ha modificado esa clasificación desde esta auditoría. No existe API secret,
Measurement Protocol ni bypass de consentimiento por servidor.

## Fuentes oficiales

- [Consent mode básico](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic).
- [dataLayer: conservar su identidad](https://developers.google.com/tag-platform/tag-manager/datalayer).
- [Page views manuales y medición mejorada](https://developers.google.com/analytics/devguides/collection/ga4/views).
- [Medición de aplicaciones SPA](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications).
- [Eventos de medición mejorada](https://support.google.com/analytics/answer/9216061?hl=es).
- [Precedencia de parámetros](https://developers.google.com/tag-platform/gtagjs/reference).
