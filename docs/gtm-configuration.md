# Espacio de trabajo GTM-59RBDRPH — configuración para revisar

No está aplicada a la cuenta ni publicada. Preparar como cambios de workspace,
revisar en Preview/Tag Assistant y no publicar sin autorización. La versión
pública consultada el 19/10/2026 estaba vacía (v1); no acredita el contenido
pendiente de publicar del workspace de la titular.

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
