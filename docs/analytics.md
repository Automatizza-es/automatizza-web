# Google Analytics 4 y consentimiento

ID facilitado por la titular el 16/10/2026: `G-1Y94M3HZRB`. Es un identificador
público de medición, no una credencial privada. Se puede sustituir mediante
`GOOGLE_ANALYTICS_ID` en el entorno del servidor.

## Estado

- Código preparado en `rediseño`, sin publicar este cambio.
- `cookiePolicy.reviewed=false` y `ANALYTICS_ENABLED=false`: medición real apagada.
- `.env.local`: `ANALYTICS_PREVIEW=true` permite revisar el panel con `next dev`.
  Solo funciona en desarrollo y fuera de Vercel. No carga Google ni envía datos,
  ni siquiera al aceptar. No demuestra recepción de eventos en la propiedad.
- La elección de prueba utiliza `automatizza-cookie-consent-preview`; no se
  reutiliza como consentimiento real al desactivar la vista de prueba.
- `/politica-de-cookies` y la sección de medición de privacidad son borradores.
  La falta de detalles de Abbas no se resuelve suponiendo un país o proveedor.

## Comportamiento preparado

El panel se incorpora al layout de todas las rutas. Usa las mismas opciones
visuales para aceptar/rechazar y un diálogo nativo con controles de teclado,
sin librerías nuevas. «Configurar cookies» permanece disponible tras elegir.

En modo real, la biblioteca de Google se solicita solo después de aceptar
(consent mode básico). Sin decisión, con rechazo o con preferencia caducada no
se carga. Publicidad, datos publicitarios y personalización siguen denegados;
se desactivan Google Signals y señales de personalización en la etiqueta.

Las preferencias se guardan 180 días sin renovarlas por visita. Se sincronizan
entre pestañas, caducan durante la navegación y se vuelven a solicitar si cambia
la versión de consentimiento. Si falla el almacenamiento, solo duran en memoria
de la página. El consentimiento de contacto es independiente.

Los page views son manuales en una lista cerrada de rutas públicas: sin query,
hash, referrer, nombres, emails ni campos del formulario. No se añaden eventos
de envío del formulario. Para evitar eventos automáticos o duplicados, hay que
desactivar la medición mejorada en la propiedad antes de la activación real.

Las cookies `_ga` y `_ga_1Y94M3HZRB` se configuran a 180 días sin renovar el plazo
por visita. Retirar el consentimiento activa la exclusión de GA, vacía la cola,
retira la etiqueta y elimina estas cookies en los dominios accesibles. No promete
borrar datos ya enviados a Google. El inventario debe verificarse en el navegador
contra la configuración real antes de aprobar el texto definitivo.

## Antes de activar en Vercel

1. Comprobar la propiedad y el flujo correctos. Desactivar por completo Medición
   mejorada (especialmente navegación por historial y formularios), Google
   Signals y funciones publicitarias; revisar que no haya conexiones con Ads.
2. Configurar conservación de usuario/eventos a 2 meses y sin reinicio por
   nueva actividad. No afecta a informes agregados estándar; es un ajuste en
   Google que no se puede aplicar con el identificador de medición.
3. Revisar condiciones, entidad contratada, subencargados y garantías de
   transferencias. Completar y aprobar la información de cookies correspondiente.
4. Marcar `cookiePolicy.reviewed=true`, versionar el consentimiento si cambian
   sus condiciones y establecer `ANALYTICS_ENABLED=true` en el servidor.
5. Reconstruir y desplegar: la configuración se renderiza en servidor. Revisar
   en sesión limpia que no haya solicitudes a Google antes de aceptar o tras
   rechazar, verificar cookies, retirada, navegación y recepción en GA4.

Esto no activa el formulario público ni aprueba sus pendientes de privacidad.

## Comprobación

`npm run test:analytics` usa un navegador simulado sin red para comprobar el
bloqueo, caducidad, configuración, retirada y exclusión de URLs arbitrarias.
Se comprueba también el panel real en escritorio/móvil: rechazo, aceptación,
recarga y cambio de preferencias en la vista sin medición. Lint/build y las
pruebas del formulario deben seguir pasando.

Fuentes oficiales:

- [Consent mode básico](https://developers.google.com/tag-platform/security/guides/consent?consentmode=basic).
- [Configuración GA4](https://developers.google.com/analytics/devguides/collection/ga4/reference/config).
- [Cookies GA4](https://support.google.com/analytics/answer/11397207?hl=es).
- [Conservación](https://support.google.com/analytics/answer/7667196?hl=es).
- [AEPD: guía de cookies](https://www.aepd.es/guias/guia-cookies.pdf).
