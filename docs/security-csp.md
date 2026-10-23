# CSP de Automatizza — fase 1 (Report-Only)

Fecha: 2026-10-23. Rama independiente `codex/security-csp`, basada en `main` (`54d55d3`). No incorpora ni publica la página de servicio de la otra rama.

## Estado y límite de esta PR

Producción `https://automatizza.es/` devuelve HTTP 200, HTML estático servido por Vercel y HSTS `max-age=63072000`, pero no CSP ni CSP Report-Only. No se ha cambiado la configuración externa de Vercel ni se ha desplegado esta rama a producción.

No hay `vercel.json` ni un proyecto `.vercel` enlazado en este checkout. La revisión de Vercel se basa en el flujo Next.js del repositorio y las respuestas HTTP públicas; no se ha inspeccionado el panel privado de ajustes/WAF/variables de la cuenta.

Esta PR añade **Content-Security-Policy-Report-Only**. No bloquea recursos ni resuelve todavía por sí sola la alerta de Aikido: falta validar la política efectiva, desplegarla y volver a escanear. No se cambia automáticamente a enforcement porque se ha reproducido una incompatibilidad real en el GTM publicado.

### Bloqueo comprobado: variables JavaScript de GTM

Se ha inspeccionado el recurso público `gtm.js?id=GTM-59RBDRPH`, versión 2. Contiene dos macros `__jsm` (no se conocen sus nombres del workspace):

- Una devuelve el booleano `false`. La etiqueta de Google la usa para `send_page_view`, `allow_google_signals`, `allow_ad_personalization_signals` y `cookie_update`.
- Otra devuelve el número `15552000`, utilizado en `cookie_expires`.

Google documenta que las variables Custom JavaScript necesitan `unsafe-eval`; sin él pueden devolver `undefined`. En una build local optimizada, aceptar estadísticas ha producido un informe real:

```json
{"directive":"script-src","blocked":"eval","page":"/","disposition":"report"}
```

**No activar CSP efectiva ni añadir unsafe-eval para ocultar el aviso.** Sustituir esas dos variables por alternativas sin eval, por ejemplo plantillas de variable personalizadas con JavaScript aislado que devuelvan los mismos booleanos/números. No sustituirlas por cadenas `"false"` o `"15552000"` sin comprobar los tipos. Revisar el workspace en Tag Assistant antes de publicar una nueva versión del contenedor. Esta PR no modifica ni publica GTM/GA4.

## Inventario real

| Recurso | Uso y tratamiento CSP |
| --- | --- |
| HTML, chunks Next.js, CSS, JSON-LD | Mismo origen. Next incluye scripts bootstrap/Flight inline. |
| Inter y Space Grotesk | `next/font` descarga en build y sirve WOFF2 locales; no hay Google Fonts en ejecución. |
| Imágenes, iconos, logo y vídeos MP4 | Recursos de `public`, optimizador `/_next/image` y reproducción con HTTP Range, mismo origen. |
| Formulario | El navegador envía a `/api/contacto`, mismo origen. Resend se utiliza exclusivamente en el servidor, no se añade a connect-src del navegador. |
| GTM/GA4 | `www.googletagmanager.com` carga GTM y el Google tag después de consentir; GA4 utiliza dominios Google Analytics y Google sin funciones publicitarias. |
| LinkedIn, AEPD y otros enlaces legales | Navegación mediante enlaces, no scripts/embeds; no requieren permisos de carga CSP. |
| Tag Assistant y Vercel Toolbar | Herramientas de depuración, no dependencias del sitio comercial. No se añaden globalmente sus hosts por anticipado. Report-Only permite revisar sus avisos sin romper previews ni debilitar producción. |

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

No se autorizan orígenes arbitrarios con `https:`, Ads, DoubleClick, datos como scripts ni `unsafe-eval` en builds de producción. El modo `next dev` permite eval y WebSockets loopback para el depurador/HMR; esas excepciones no están en las builds optimizadas.

### Excepciones deliberadas y alternativas evaluadas

Esta política basada en orígenes **no es una CSP estricta basada en nonces/hashes**. Permitir scripts inline limita la protección frente a XSS y debe seguir figurando como deuda de endurecimiento.

- La portada publicada contiene bootstrap y Flight inline de Next, distintos según página/build. Un nonce fijo o hashes copiados de un despliegue son incorrectos.
- Un nonce por petición requiere renderizado dinámico y afecta a la generación estática y caché CDN actuales. No se impone ese cambio sin una decisión expresa sobre rendimiento.
- SRI experimental comprueba los chunks externos; no autoriza por sí solo los scripts inline bootstrap/Flight. No se añade una opción experimental presentándola como solución completa.
- Hashes generados por página/build son una posible fase posterior, con integración de despliegue y pruebas de navegación/404. No se parchean manifiestos privados de Next ni se añaden hashes caducables a mano.
- `style-src 'unsafe-inline'` conserva los estilos dinámicos y variables CSS de React usados por las animaciones, progreso de scroll y calculadora. Los manejadores inline de JavaScript se prohíben por separado con `script-src-attr 'none'`.
- No se añade `upgrade-insecure-requests` en Report-Only, donde no se aplica. Evaluarlo para el despliegue efectivo HTTPS.

Se añaden `X-Content-Type-Options: nosniff` y `Referrer-Policy: strict-origin-when-cross-origin`. HSTS queda en Vercel, que ya lo envía; no se duplica. No se cambian caché, CORS, X-Robots-Tag, canonical, sitemap, redirecciones ni protecciones de previews.

## Informes y privacidad

`POST /api/csp-report` acepta CSP clásico y Reporting API. Responde sin caché. Tamaño máximo 16 KiB, hasta 30 peticiones/minuto por instancia y diez informes por lote; límites contra amplificación de logs, no sustituyen un WAF distribuido.

Solo registra directiva conocida, origen bloqueado (sin credenciales/ruta/query/hash), ruta de página del registro público y disposición. No registra cuerpo original, IP, User-Agent, referrer, source-file, script-sample ni valores del formulario. Descarta contenido inválido. Los informes son datos no autenticados y no prueban por sí solos un ataque. No se incorpora un recolector externo ni una base de datos. Aplican el acceso y la conservación de logs del alojamiento existente.

El endpoint relativo evita mandar informes locales/previews a producción. Se mantiene `report-uri` por compatibilidad entre navegadores; no se declara un report-to absoluto que apunte erróneamente a producción desde un preview.

## Validación realizada

- Lint correcto.
- 8 pruebas de seguridad: directivas, separación desarrollo/producción, cabeceras únicas, saneamiento, formatos, límites y protección de logs.
- 23 pruebas de contacto, 24 de analítica, 7 multilingües y 5 de datos estructurados correctas.
- 124 escenarios HTTP/SEO correctos en builds aisladas de producción y preview. CSP Report-Only presente y sin CSP efectiva duplicada, sin unsafe-eval de producción; páginas siguen estáticas y los previews conservan noindex.
- Build optimizada real adicional con analítica habilitada y correo desactivado, sin copiar credenciales.
- Navegador: antes de consentir y después de rechazar, cero scripts de Google; al aceptar carga GTM/Google tag; retirar recarga sin scripts de Google. Se reproduce el aviso eval descrito arriba. No se certifica recepción de eventos en DebugView desde esta cuenta.
- Imágenes de la escena de oficina cargadas y animaciones activas; navegación a APC y Contacto conservada. Vídeo APC reproducido con teclado, readyState 4, avance de currentTime y sin error. HTTP Range devuelve 206 y `video/mp4`.
- Formulario visible con envío local desactivado; validación, errores, éxito y generate_lead comprobados mediante el manejador con proveedor simulado. No se ha enviado otro email real ni se ha emitido una conversión ficticia a Google.

Vista local de esta build: `http://127.0.0.1:3010/`. La vista del servicio en el puerto 3007 sigue siendo independiente.

## Pendientes antes de activar y cerrar Aikido

1. Sustituir las dos variables Custom JavaScript de GTM por equivalentes sin eval y validar tipos, consentimiento y una visita por navegación con Tag Assistant/DebugView. Comprobar generate_lead con un envío autorizado confirmado, sin datos personales ni duplicados.
2. Revisar informes en el preview Vercel de la PR, incluyendo el navegador real de escritorio/móvil y las herramientas de depuración que se quieran soportar. Esta PR no cambia el control de acceso de previews ni la configuración de Vercel.
3. Resolver avisos restantes de dependencias reales, sin ampliar fuentes por avisos de extensiones o entrada manipulada. Decidir/aceptar explícitamente la excepción inline de Next, o implementar una integración de hashes que la elimine manteniendo las páginas estáticas.
4. Solo tras estas comprobaciones cambiar la constante del nombre de cabecera a `Content-Security-Policy`, repetir las pruebas y aprobar el despliegue efectivo. La PR permanece en Report-Only y no se mezcla automáticamente con main.
5. Verificar la cabecera efectiva en `https://automatizza.es` y ejecutar de nuevo Aikido. La alerta sigue pendiente hasta entonces.

Referencias primarias: [Next.js y CSP](https://nextjs.org/docs/app/guides/content-security-policy), [Google Tag Manager y CSP](https://developers.google.com/tag-platform/security/guides/csp), [MDN: despliegue CSP](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP).
