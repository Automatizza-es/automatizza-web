# CSP de Automatizza — implementación finalizada en producción

Cierre documental: **2026-10-26**. Implementación integrada mediante la
[PR #1](https://github.com/Automatizza-es/automatizza-web/pull/1), fusionada en
`main` el 23/10/2026 a las 14:03 UTC. Commit de integración y despliegue:
`1b1b2face12c286b46a6c9d2af43b5b68c5eb2e9`.

## Estado final

La titular confirma que la implementación está desplegada y comprobada en
`https://automatizza.es`: cabecera **Content-Security-Policy efectiva**, GTM y
GA4 funcionando, consentimiento de cookies validado y formulario enviado con
éxito, con correo recibido en `info@automatizza.es`. La implementación CSP se da
por finalizada.

La ausencia de CSP y CSP Report-Only detectada al inicio de la revisión del
23/10/2026 corresponde al estado anterior al despliegue; no describe el estado
actual. La política efectiva se aplica a las builds optimizadas; `next dev`
conserva Report-Only para las herramientas de desarrollo.

La integración en GitHub y su registro de despliegue se han contrastado durante
este cierre. Las comprobaciones funcionales finales en producción son las
confirmadas por la titular; no se repiten envíos ni pruebas de conversión en
esta actualización exclusivamente documental. No se cambia código,
configuración externa ni se realiza un nuevo despliegue.

**Único pendiente de esta implementación:** el próximo análisis automático de
Aikido debe confirmar que desaparece la alerta «Content Security Policy (CSP)
header not set». No se afirma que el escáner ya haya cerrado la alerta ni se
solicita un nuevo análisis manual.

### Incompatibilidad con eval resuelta en GTM versión 3

En la revisión inicial, el recurso público `gtm.js?id=GTM-59RBDRPH`, versión 2, contenía dos macros `__jsm`:

- Una devuelve el booleano `false`. La etiqueta de Google la usa para `send_page_view`, `allow_google_signals`, `allow_ad_personalization_signals` y `cookie_update`.
- Otra devuelve el número `15552000`, utilizado en `cookie_expires`.

Google documenta que las variables Custom JavaScript necesitan `unsafe-eval`; sin él pueden devolver `undefined`. En una build local optimizada, aceptar estadísticas ha producido un informe real:

```json
{"directive":"script-src","blocked":"eval","page":"/","disposition":"report"}
```

La titular ha sustituido y publicado ambas variables, y confirma en Tag Assistant los tipos correctos (`CONST - false`: boolean; `CONST - cookie expires`: number) y el consentimiento granted. La inspección del contenedor público **versión 3** confirma:

- No quedan macros `__jsm` ni etiquetas Custom HTML.
- Las nuevas plantillas compiladas devuelven `false` y `15552000`, con los tipos adecuados.
- La tabla de ajustes de la etiqueta de Google sigue apuntando a esas variables para los mismos parámetros.
- Primero se repitieron aceptación y navegación con Report-Only; después con la política efectiva exacta de producción. GTM y el Google tag cargaron y no aparecieron nuevos informes CSP ni errores del navegador en las rutas probadas.

No se ha añadido `unsafe-eval` a las builds optimizadas. La declaración de una función que contiene `eval` en el runtime genérico de GTM no equivale a su ejecución; la validación comprueba también el comportamiento en el navegador. La implementación no modificó ni publicó GTM/GA4; las plantillas compatibles fueron publicadas por la titular.

## Inventario real

| Recurso | Uso y tratamiento CSP |
| --- | --- |
| HTML, chunks Next.js, CSS, JSON-LD | Mismo origen. Next incluye scripts bootstrap/Flight inline. |
| Inter y Space Grotesk | `next/font` descarga en build y sirve WOFF2 locales; no hay Google Fonts en ejecución. |
| Imágenes, iconos, logo y vídeos MP4 | Recursos de `public`, optimizador `/_next/image` y reproducción con HTTP Range, mismo origen. |
| Formulario | El navegador envía a `/api/contacto`, mismo origen. Resend se utiliza exclusivamente en el servidor, no se añade a connect-src del navegador. |
| GTM/GA4 | `www.googletagmanager.com` carga GTM y el Google tag después de consentir; GA4 utiliza dominios Google Analytics y Google sin funciones publicitarias. |
| LinkedIn, AEPD y otros enlaces legales | Navegación mediante enlaces, no scripts/embeds; no requieren permisos de carga CSP. |
| Tag Assistant y Vercel Toolbar | Herramientas de depuración, no dependencias del sitio comercial. Sus fuentes oficiales se permiten únicamente cuando `VERCEL_ENV=preview`, no en la política de producción; no se cambia su activación ni el acceso a previews. |

## Política configurada

Fuente única: `src/lib/security-policy.ts`, aplicada por `next.config.ts` en todas las rutas. No hay un segundo CSP en meta ni una política contradictoria.

| Directiva | Fuentes |
| --- | --- |
| default-src | `'self'` |
| script-src | `'self' 'unsafe-inline' https://www.googletagmanager.com` |
| script-src-attr | `'none'` |
| style-src | `'self' 'unsafe-inline'` |
| img-src | `'self' data: https://www.googletagmanager.com https://*.google-analytics.com` |
| font-src / media-src / manifest-src | `'self'` |
| connect-src | `'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com` |
| frame-src | `https://www.googletagmanager.com` |
| worker-src / object-src / base-uri / frame-ancestors | `'none'` |
| form-action | `'self'` |
| report-uri | `/api/csp-report` |

La tabla anterior corresponde a producción. Los previews añaden los orígenes de depuración documentados por Vercel/Google: scripts `vercel.live` y `tagmanager.google.com`; estilos de esos hosts y `fonts.googleapis.com`; imágenes `vercel.live`, `vercel.com`, `ssl.gstatic.com`, `www.gstatic.com` y `blob:`; fuentes `vercel.live`, `assets.vercel.com`, `fonts.gstatic.com` y `data:`; conexión `vercel.live` y `wss://ws-us3.pusher.com`; iframe `vercel.live`. No se añaden a producción. La separación se comprueba por pruebas y cabeceras reales de ambas builds.

No se autorizan orígenes arbitrarios con `https:`, Ads, DoubleClick, datos como scripts ni `unsafe-eval` en builds de producción. El modo `next dev` usa Report-Only y permite eval y WebSockets loopback para el depurador/HMR; esas excepciones no están en las builds optimizadas.

### Excepciones deliberadas y alternativas evaluadas

Esta política basada en orígenes **no es una CSP estricta basada en nonces/hashes**. Permitir scripts inline limita la protección frente a XSS. Es una excepción técnica documentada de la implementación actual, no una tarea pendiente de este cierre.

- La portada publicada contiene bootstrap y Flight inline de Next, distintos según página/build. Un nonce fijo o hashes copiados de un despliegue son incorrectos.
- Un nonce por petición requiere renderizado dinámico y afecta a la generación estática y caché CDN actuales. No se impone ese cambio sin una decisión expresa sobre rendimiento.
- SRI experimental comprueba los chunks externos; no autoriza por sí solo los scripts inline bootstrap/Flight. No se añade una opción experimental presentándola como solución completa.
- Hashes generados por página/build son una posible fase posterior, con integración de despliegue y pruebas de navegación/404. No se parchean manifiestos privados de Next ni se añaden hashes caducables a mano.
- `style-src 'unsafe-inline'` conserva los estilos dinámicos y variables CSS de React usados por las animaciones, progreso de scroll y calculadora. Los manejadores inline de JavaScript se prohíben por separado con `script-src-attr 'none'`.
- No se añade `upgrade-insecure-requests`: no hay subrecursos HTTP en la aplicación, y las cargas permitidas de terceros usan HTTPS explícito. Se evita alterar la prueba local HTTP; HSTS en Vercel sigue activo.

Se añaden `X-Content-Type-Options: nosniff` y `Referrer-Policy: strict-origin-when-cross-origin`. HSTS queda en Vercel, que ya lo envía; no se duplica. No se cambian caché, CORS, X-Robots-Tag, canonical, sitemap, redirecciones ni protecciones de previews.

## Informes y privacidad

`POST /api/csp-report` acepta CSP clásico y Reporting API. Responde sin caché. Tamaño máximo 16 KiB, hasta 30 peticiones/minuto por instancia y diez informes por lote; límites contra amplificación de logs, no sustituyen un WAF distribuido.

Solo registra directiva conocida, origen bloqueado (sin credenciales/ruta/query/hash), ruta de página del registro público y disposición. No registra cuerpo original, IP, User-Agent, referrer, source-file, script-sample ni valores del formulario. Descarta contenido inválido. Los informes son datos no autenticados y no prueban por sí solos un ataque. No se incorpora un recolector externo ni una base de datos. Aplican el acceso y la conservación de logs del alojamiento existente.

El endpoint relativo evita mandar informes locales/previews a producción. Se mantiene `report-uri` por compatibilidad entre navegadores; no se declara un report-to absoluto que apunte erróneamente a producción desde un preview.

## Validación previa a la integración (23/10/2026)

- Lint correcto.
- 9 pruebas de seguridad: directivas, separación desarrollo/producción, cabeceras únicas, saneamiento, formatos, límites y protección de logs.
- 23 pruebas de contacto, 24 de analítica, 7 multilingües y 5 de datos estructurados correctas.
- 124 escenarios HTTP/SEO correctos en builds aisladas de producción y preview. CSP efectiva presente y sin Report-Only duplicada, sin unsafe-eval en builds optimizadas, fuentes de depuración solo en preview; páginas siguen estáticas y los previews conservan noindex.
- Builds optimizadas adicionales con GTM real y correo desactivado, sin copiar credenciales: primero Report-Only en puerto 3011 y después política efectiva de producción en puerto 3012.
- Navegador: antes de consentir y después de rechazar, cero scripts de Google; al aceptar carga GTM/Google tag; retirar recarga sin scripts de Google. Con GTM versión 3 no se reproduce el aviso eval ni llegan nuevos informes CSP durante aceptación, navegación, cambio de idioma y retirada probados. Una instancia `#automatizza-gtm` por documento. La recepción en DebugView no se certifica desde esta cuenta; la titular aporta su comprobación en Tag Assistant y las pruebas automatizadas mantienen la deduplicación de visitas y conversiones.
- Imágenes de la escena de oficina cargadas y animaciones activas; navegación a APC y Contacto conservada. Vídeo APC reproducido con teclado, readyState 4, avance de currentTime y sin error. HTTP Range devuelve 206 y `video/mp4`.
- Formulario visible con envío local desactivado; validación, errores, éxito y generate_lead comprobados mediante el manejador con proveedor simulado. No se ha enviado otro email real ni se ha emitido una conversión ficticia a Google.

Direcciones utilizadas durante la revisión local (registro histórico, no enlaces de revisión pendientes): política efectiva de producción: `http://localhost:3012/`. Report-Only se comprobó en `http://localhost:3011/`. La vista del servicio en el puerto 3007 sigue siendo independiente. Se ha probado también móvil de 390 px, cambio de idioma ES → EN y retirada desde preferencias traducidas, sin desbordamiento.

## Archivos de la PR integrada

- `next.config.ts`: aplicación de cabeceras y separación de previews.
- `src/lib/security-policy.ts`: política central, efectiva en builds optimizadas y Report-Only en desarrollo.
- `src/lib/csp-report.ts` y `src/app/api/csp-report/route.ts`: receptor saneado y limitado de informes.
- `scripts/test-security.mjs`, `tests/security.test.mjs`, `scripts/test-seo.mjs`: pruebas de seguridad y cabeceras reales.
- `package.json`: comando test:security, sin dependencias nuevas.
- `docs/security-csp.md`: evidencia, excepciones y límites de la validación.

## Verificación final y cierre (26/10/2026)

| Comprobación | Estado y evidencia |
| --- | --- |
| Integración en `main` | Completada: PR #1 fusionada; commit `1b1b2face12c286b46a6c9d2af43b5b68c5eb2e9`, contrastado en GitHub. |
| Despliegue | Completado: registro Production de GitHub para ese commit, creado el 23/10/2026 a las 14:03:53 UTC; despliegue confirmado por la titular. |
| CSP efectiva en `automatizza.es` | Verificada mediante las cabeceras HTTP por la titular. |
| GTM y GA4 | Funcionamiento confirmado por la titular con el contenedor publicado compatible con CSP, sin añadir `unsafe-eval` a producción. |
| Consentimiento | Comprobado por la titular; se conserva la carga de medición solo tras aceptar estadísticas y la publicidad denegada. |
| Formulario | Envío real correcto y recepción en `info@automatizza.es`, confirmados por la titular. |
| Pruebas previas | Lint, builds y comprobaciones de seguridad, SEO, contacto, analítica, navegación y recursos completadas según el registro anterior. No se vuelven a ejecutar por este cambio solo documental. |
| Próximo análisis automático de Aikido | **Único pendiente:** confirmar que desaparece la alerta de ausencia de cabecera CSP. |

La revisión local y sus límites descritos arriba se conservan como historial;
no representan tareas de validación aún abiertas. No se cambian las
protecciones de previews ni se requiere otro despliegue para cerrar esta fase.

Referencias primarias: [Next.js y CSP](https://nextjs.org/docs/app/guides/content-security-policy), [Google Tag Manager y CSP](https://developers.google.com/tag-platform/security/guides/csp), [Vercel Toolbar y CSP](https://vercel.com/docs/vercel-toolbar/managing-toolbar), [MDN: despliegue CSP](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP).
