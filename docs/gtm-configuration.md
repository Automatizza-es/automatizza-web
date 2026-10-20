# Espacio de trabajo GTM-59RBDRPH — configuración y validación

La titular confirma el 20/10/2026 que ha configurado las tres etiquetas conforme
a esta guía y probado visitas y consentimiento en Tag Assistant y DebugView.
Ha desactivado las visitas automáticas por cambios de historial en GA4 para
eliminar duplicados; la prueba repetida entrega una visita por navegación.
Las tres etiquetas requieren analytics_storage, y los eventos filtran
analytics_consent=granted. Aceptar, retirar, borrar cookies y volver a aceptar
se han comprobado manualmente, con publicidad siempre denegada.

Actualización de lanzamiento: el 20/10/2026 se ha revisado y publicado la
**versión 2** del contenedor con autorización de la titular. Producción activa
con consentimiento básico; Tag Assistant verifica un hit `generate_lead` tras
un envío real confirmado, `form_id=contact`, sin datos del formulario y sin
repetición tras recargar. Configuración y pruebas: [launch.md](launch.md).
Las instrucciones locales siguientes se conservan para futuras modificaciones;
no representan tareas pendientes para esta publicación.

## Prueba del workspace sin publicar ni desplegar

1. En el proyecto, ejecutar `npm run dev:tag-assistant` y mantener la terminal
   abierta. La URL exacta es **http://127.0.0.1:3003/contacto**. El servidor solo
   escucha en loopback y utiliza `.next-tag-assistant`, sin alterar los servidores
   existentes, `.env.local`, main ni la configuración de Vercel.
2. En Chrome, abrir GTM → `GTM-59RBDRPH` → el workspace con los cambios guardados
   → **Vista previa**. Introducir esa URL exacta en Tag Assistant y pulsar
   **Conectar**. Usar la ventana que abre Tag Assistant y el mismo navegador.
   No pulsar Enviar/Publicar. No copiar parámetros privados de una sesión de
   depuración en el código o en variables de entorno.
3. Antes de aceptar estadísticas, la web no carga GTM/GA. Tag Assistant puede
   indicar que no encuentra la etiqueta mientras está bloqueada. Aceptar
   **Aceptar analítica** en esa ventana; después volver a Tag Assistant y
   continuar. Si la detección inicial caducó, reconectar a la misma URL con
   la aceptación ya guardada. Nunca cargar GTM antes de consentir para evitar
   este aviso. La primera visita ya aceptada puede necesitar recarga para
   revisar el inicio completo del contenedor.
4. Revisar la matriz de la sección 6: en Network, cero peticiones GTM/GA de
   la web sin consentimiento; al aceptar, una carga de GTM y una visita;
   navegar a un proyecto y volver a Contacto, sin duplicados. En Consent,
   `analytics_storage=granted`, los tres consentimientos publicitarios
   `denied`. Retirar estadísticas desde Configurar cookies: se guarda rechazo,
   se eliminan cookies estadísticas accesibles y se recarga sin GTM/GA.
   Para repetir desde cero, borrar los datos solo de `http://127.0.0.1:3003`
   en DevTools → Application → Storage; no hace falta borrar datos de producción.
5. Los scripts de depuración/extensión pueden generar sus propias conexiones.
   Para comprobar el bloqueo inicial sin interferencias, abrir también una
   ventana limpia sin Tag Assistant; después ejecutar la prueba conectada.
   Desactivar solo para esta prueba bloqueadores que impidan Google, si existen.

**La vista previa ejecuta etiquetas reales**: los eventos pueden llegar a la
propiedad GA4 aunque el contenedor no se publique. Usar únicamente navegación
de prueba y revisar DebugView; no introducir datos personales en URLs. Las
URL enviadas por la web son las canónicas (`https://automatizza.es/...`), no
localhost, y se excluyen query/hash/referrer. El modo no añade otra instalación
GA4, ni fuerza etiquetas, ni simula el evento de contacto.

El comando establece variables solo para ese proceso:
`ANALYTICS_TAG_ASSISTANT=true`, `ANALYTICS_PREVIEW=false`,
`ANALYTICS_ENABLED=false`, `CONTACT_FORM_ENABLED=false` y
`CONTACT_FORM_TEST_MODE=false`. Los IDs ya están configurados en el código;
no falta una clave secreta de Google ni hay que cambiar variables de Vercel.
El modo de Tag Assistant se ignora en producción y Vercel, y rechaza hosts
públicos o de la red local. El modo anterior `ANALYTICS_PREVIEW=true` continúa
siendo una vista sin red y tiene prioridad si se activan ambos flags.

**Límite del formulario:** la versión de privacidad y aviso legal ya ha sido
aprobada por la titular. El comando local de Tag Assistant mantiene el envío
desactivado por configuración; esta prueba no lo habilita. Tampoco convierte los
envíos con `testMode` en leads. `generate_lead` se comprueba ahora mediante las
pruebas del manejador real con proveedor simulado, sin correos ni Google.
La comprobación extremo a extremo de esa etiqueta en Tag Assistant queda
pendiente de habilitar un envío real autorizado con la configuración de Resend.
No usar clic, visualización de confirmación
ni `dataLayer.push` manual como sustituto de la confirmación del servidor.

Guía oficial: [Vista previa de contenedores](https://support.google.com/tagmanager/answer/6107056?hl=es).

## 1. Variables de capa de datos (versión 2)

Crear estas cinco variables con los nombres de campo exactos:

| Nombre sugerido de variable | Nombre de campo en dataLayer |
| --- | --- |
| DLV - analytics_consent | `analytics_consent` |
| DLV - page_location | `page_location` |
| DLV - page_title | `page_title` |
| DLV - page_referrer | `page_referrer` |
| DLV - form_id | `form_id` |

No usar las variables integradas Page URL, Referrer o títulos dinámicos de
terceros: las anteriores ya están filtradas por la web.

## 2. Adaptar la etiqueta principal existente

- Tipo: **Google tag**; ID `G-1Y94M3HZRB`.
- Mantener su activador **Initialization - All Pages**. La web no carga el
  contenedor hasta aceptar; nunca añadir otro snippet directo de GA4.
- En configuración, añadir parámetros con valores booleanos/números reales,
  no cadenas que contengan las palabras `false` o `true`:

| Parámetro | Valor |
| --- | --- |
| `send_page_view` | `false` |
| `allow_google_signals` | `false` |
| `allow_ad_personalization_signals` | `false` |
| `cookie_expires` | `15552000` |
| `cookie_update` | `false` |
| `cookie_path` | `/` |
| `page_location` | `{{DLV - page_location}}` |
| `page_title` | `{{DLV - page_title}}` |
| `page_referrer` | `{{DLV - page_referrer}}` |

Los valores seguros de la página inicial se encolan antes de `gtm.js`. Añadir
comprobación adicional de consentimiento **analytics_storage** en todas las
etiquetas de medición. No añadir etiquetas Ads ni conceder consentimientos
publicitarios; la web mantiene los tres denegados.

## 3. Visitas controladas

- Activador: **Custom Event**, nombre exacto `automatizza_page_view`.
- Condición adicional: `{{DLV - analytics_consent}}` equals `granted`.
- Etiqueta: **Google Analytics: GA4 Event**, ID `G-1Y94M3HZRB`.
- Nombre del evento enviado a Google: `page_view`.
- Parámetros: `page_location`, `page_title`, `page_referrer`, cada uno desde
  su variable DLV. Sin user properties, datos proporcionados por usuarios
  ni parámetros automáticos añadidos manualmente.
- Consentimiento adicional: `analytics_storage`.
- No añadir activadores de historial, DOM Ready, All Pages o Window Loaded
  para esta etiqueta: la web ya emite cada navegación real una sola vez.

## 4. Contacto confirmado

- Activador: **Custom Event**, nombre exacto `automatizza_contact_success`.
- Condición adicional: `{{DLV - analytics_consent}}` equals `granted`.
- Etiqueta: **Google Analytics: GA4 Event**, ID `G-1Y94M3HZRB`.
- Nombre enviado a Google: `generate_lead`.
- Parámetros: las tres variables de página anteriores y
  `form_id={{DLV - form_id}}` (solo el identificador fijo `contact`).
- Consentimiento adicional: `analytics_storage`.
- No usar activador de clic, Form Submission, `form_submit` ni `form_start`.
- En GA4, marcar `generate_lead` como evento clave. No crear un segundo evento
  derivado del mismo envío ni importar otra conversión duplicada.

## 5. Medición mejorada y revisión de privacidad

En GA4, comprobar que **Interacciones con formularios** está desactivado y
que **Cambios de página basados en eventos del historial del navegador** está
desactivado. Recomendación conservadora para este sitio: desactivar toda la
medición mejorada. `send_page_view=false` no desactiva por sí solo las visitas
automáticas por historial. No activar captura de datos proporcionados por
usuarios, user_id, variables DOM ni custom JS que lea los campos.

Confirmar los ajustes ya realizados por la titular: Signals y personalización
publicitaria desactivados, ocultación de datos personales y conservación
coherente con el texto legal. Los parámetros de la web no pueden sobreescribir
con garantías una opción diferente publicada en la cuenta.

## 6. Revisión antes de publicar

El resultado esperado es **una** etiqueta principal y **dos** etiquetas de
evento, sin otras etiquetas de GA4, trackers ni activadores de formularios.
Comprobar también destinos vinculados, variables compartidas, plantillas,
etiquetas en pausa y versiones antiguas. No importar un contenedor nuevo encima
del existente sin revisar primero el diff y resolver duplicados.

Cuando se autorice la activación, validar estas situaciones en sesión limpia:

| Situación | Resultado esperado |
| --- | --- |
| Sin decidir / rechazo / visita posterior con rechazo | Ninguna petición GTM/GA ni cookies estadísticas |
| Aceptar | Una carga GTM; una visita GA4; anuncios denegados |
| Recargar con aceptación | Una visita por carga, consentimiento conservado |
| Cambiar de página dentro de Next.js | Una visita por ruta, sin query/hash/referrer |
| Cambiar solo el ancla o rerenderizar | Ninguna visita adicional |
| Clic en enviar / datos inválidos / error / timeout / honeypot | Ningún `generate_lead` |
| Resend confirma y el servidor responde `ok: true` con consentimiento | Un `generate_lead`, sin valores del formulario |
| Retirar estadísticas | Rechazo guardado, cookies borradas, recarga, ninguna medición nueva |
| Volver a aceptar tras retirar | Una nueva carga GTM y una visita; ningún envío anterior se recupera |

El navegador puede mostrar solicitudes previas ya finalizadas; comprobar solo
las posteriores a la acción y distinguir solicitudes iniciadas antes de la
retirada. Ningún cambio de la web puede eliminar información ya enviada.
