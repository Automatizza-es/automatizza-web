# Revisión SEO técnica — 21/10/2026

**Cambios aprobados, integrados y desplegados el 21/10/2026.**
Merge en `main`: `efdea8dbee639bf65219fb34eccc934fa2ab7ad0`.
La rama `codex/technical-seo-review` se conserva; no había cambios remotos
posteriores a su base que resolver. No se ha reescrito historial.
No se han cambiado JSX, H1/H2, textos visibles, CSS, estructura o lógica del
formulario/consentimiento. Solo metadatos, recursos SEO y reglas HTTP.

## Verificación directa después del despliegue

- Vercel producción **READY**, despliegue `dpl_p9q2to523SvTqQAcg1MPCLjw4MzG`.
  El ID aparece en el HTML público de las cinco páginas y corresponde al
  merge `efdea8d`. Se ha comprobado también mediante la API de Vercel.
  La auditoría completa se repitió correctamente en el despliegue
  `dpl_6L8BNHTM7qEYgdrF6bcHqvcJKLep`, commit `ae391b9`, que añade únicamente
  este informe a ese mismo código.
- Portada, contacto, Silos Spain, APC Europe y La Factory: **HTTP 200**, un
  título y descripción específicos y un canonical correcto por página.
  Las páginas comerciales devuelven `index, follow` y no tienen
  `X-Robots-Tag: noindex`.
- `/robots.txt`: **200**, texto plano, rastreo permitido, `/api/` excluido y
  enlace al sitemap. `/sitemap.xml`: **200**, XML válido y exactamente cinco
  URLs canónicas, sin las páginas legales ni las redirecciones.
- Diez comprobaciones de redirección en `www` y en el alias estable de Vercel:
  **308**, conservando ruta y query, incluidas portada, contacto, un proyecto,
  robots y sitemap.
- `/proyectos`: **308** a `/#proyectos`. Las rutas y proyectos inexistentes
  mantienen **404**. Los documentos legales conservan `noindex, nofollow`.
- El preview real se ha creado desde el mismo código revisado:
  `dpl_9Qjyd7QshwfAaYLWC5NaXKteo3xn`, commit `50f88e2`, entorno preview,
  estado **READY**. La protección original de Vercel exige autenticación:
  sin sesión devuelve **302** al acceso de Vercel y `X-Robots-Tag: noindex`.
  Con acceso temporal expresamente autorizado, las cinco páginas responden
  **200**, sin redirigir a producción, con canonical correcto y meta/cabecera
  `noindex, nofollow`. Robots responde **200** sin anunciar sitemap; el sitemap
  responde **200** con XML válido sin URLs. Son **7 comprobaciones autenticadas**.
  La clave temporal se ha revocado, se ha comprobado su ausencia en el proyecto
  y el preview vuelve a exigir autenticación. No se han desactivado protecciones.
- Auditoría pública: **23 respuestas HTTP**, sin errores. Solo peticiones de
  lectura; no se han enviado formularios ni activado manualmente eventos.

## Producción: diagnóstico previo a la corrección

Las comprobaciones se han realizado contra respuestas HTTP completas de los
dominios públicos, no únicamente con una captura o un resultado de buscador.

| Comprobación | Resultado publicado antes de esta corrección |
| --- | --- |
| `/` | HTTP 200; título `Automatizza`; descripción `Web corporativa de Automatizza.`; sin canonical |
| `/contacto` y tres proyectos | HTTP 200; metadatos propios y canonical ya presentes |
| `/robots.txt`, `/sitemap.xml` | HTTP 404, respuesta HTML de página no encontrada |
| `http://automatizza.es/contacto?...` | 308 a HTTPS, conservando ruta y query |
| `https://www.automatizza.es/contacto?...` | 308 a dominio sin `www`, conservando ruta y query |
| `https://automatizza-web.vercel.app/contacto?...` | HTTP 200, canonical al dominio real, sin `X-Robots-Tag`; alias aún accesible como duplicado |
| `/proyectos` | 307 a `/#proyectos` |
| Ruta y proyecto inexistentes | HTTP 404 y meta `noindex` |
| Páginas legales | HTTP 200, meta `noindex, nofollow` ya existente |
| Páginas comerciales del dominio principal | Sin meta `noindex` ni cabecera `X-Robots-Tag` que impida indexarlas |

Se ha contrastado el ID de despliegue incluido en el HTML con la API de Vercel:

- Proyecto `automatizza-web`, entorno **production**, estado **READY**.
- Despliegue `dpl_3tLebGMPXuRRXoPudSZLAsdiUuea`.
- Commit `e976cad227789f08ab4781c4b83ac3669d884876`, rama `main`.

**No era un despliegue antiguo:** la configuración genérica de la portada y
la ausencia de los recursos SEO también estaban en ese código.

## Correcciones publicadas

### Metadatos

El dominio canónico se fija en `src/lib/seo.ts` a `https://automatizza.es`,
independientemente del host de la petición, del alias o de
`NEXT_PUBLIC_SITE_URL`. Cada página tiene un canonical propio sin query ni
fragmentos. No se hereda un canonical de portada sobre las páginas 404.
Open Graph utiliza los mismos metadatos, conservando las imágenes de proyectos.

| Página | `<title>` propuesto |
| --- | --- |
| `/` | Automatizza \| Automatización de procesos e IA para empresas |
| `/contacto` | Contacto \| Automatizza |
| `/proyectos/silos-spain` | Silos Spain \| CRM y gestión comercial a medida \| Automatizza |
| `/proyectos/apc` | APC Europe \| App para logística y recogidas \| Automatizza |
| `/proyectos/la-factory-coworking` | La Factory Coworking \| App de reservas de salas \| Automatizza |

Metadescripciones:

- **Portada:** Automatizamos tareas repetitivas, conectamos herramientas y
  desarrollamos soluciones a medida para que tu empresa trabaje mejor.
- **Contacto:** Cuéntanos cómo trabaja tu empresa y qué te gustaría mejorar.
  En Automatizza te ayudamos a encontrar una solución práctica y adaptada a tu negocio.
- **Silos Spain:** Una plataforma a medida para centralizar solicitudes,
  oportunidades y presupuestos de Silos Spain, conectando su gestión comercial
  y reduciendo tareas manuales.
- **APC Europe:** Aplicación web para APC Europe que permite registrar recogidas
  y viajes desde el móvil y centralizar la información de sus operaciones de transporte.
- **La Factory Coworking:** Aplicación web para La Factory Coworking que reúne
  reservas de salas, usuarios y servicios para simplificar la gestión diaria del espacio.

Los metadatos legales y su `noindex, nofollow` se conservan y se añade canonical
a cada página legal. No se incluyen en el sitemap.

### Recursos y dominios

- `src/app/robots.ts`: en producción permite el rastreo, excluye `/api/` e indica
  `Sitemap: https://automatizza.es/sitemap.xml`.
- `src/app/sitemap.ts`: cinco URLs canónicas, tomadas de la portada, contacto
  y los proyectos existentes. No contiene redirecciones, anclas, páginas
  legales, errores ni fechas `lastmod` inventadas en cada build.
- `/proyectos`: redirección permanente 308 al mismo destino `/#proyectos`.
- En un deployment con `VERCEL_ENV=production`, únicamente los hosts
  `www.automatizza.es` y `automatizza-web.vercel.app` redirigen 308 al dominio
  principal. Se conservan ruta y query. No se aplica un comodín a `*.vercel.app`.
- Cualquier host distinto del principal recibe `X-Robots-Tag: noindex, nofollow`.
  Los hosts generados de producción siguen accesibles para revisión, sin indexarse.
- Preview/desarrollo: meta y cabecera `noindex, nofollow`, sin redirección a
  producción, sin URLs en sitemap ni anuncio de sitemap en robots. También
  cubre previews con dominio propio. Robots permite rastrear para que el
  buscador pueda leer el `noindex`; un `Disallow: /` impediría verlo.
- Solo se permite indexar si `VERCEL_ENV` es exactamente `production`.
  Vercel proporciona esa variable automáticamente; no hace falta una credencial
  SEO ni añadir variables al proyecto. En local se mantiene el bloqueo.

## Validación reproducible

```sh
npm run lint
npm run test:seo
npm run test:analytics
npm run test:contact
```

`test:seo` crea una copia temporal aislada sin `.env.local`, ejecuta
`next build --webpack` y un servidor real para **production** y **preview**.
No modifica los servidores de desarrollo abiertos. Las pruebas hacen solo GET;
no envían correos ni eventos a Google, no acceden a proveedores ni despliegan.

Se comprueban 38 escenarios HTTP/página: título, descripción y canonical únicos
en el `<head>` inicial; indexación por entorno/host; robots y XML del sitemap;
redirecciones 308 con query; páginas legales; 404 reales; enlaces internos,
anclas y existencia de archivos públicos enlazados. Se prueba incluso un
`NEXT_PUBLIC_SITE_URL` deliberadamente incorrecto para descartar canónicos de preview.
Los H1/H2 de las cinco páginas indexables se han comparado con producción:
coinciden. Las 43 pruebas existentes de consentimiento/contacto también pasan.

## Tareas externas posteriores

1. En **Google Search Console**, enviar `https://automatizza.es/sitemap.xml`
   y usar Inspección de URLs para la portada y páginas relevantes. Si aún no
   existe una propiedad verificada del dominio, la titular debe verificarla
   con los valores exactos que proporcione Google. No se han cambiado DNS ni
   añadido verificaciones ficticias.
2. Revisar después el canonical elegido y la indexación en Search Console.
   El cambio no actualiza instantáneamente los resultados ya almacenados.

No se ha detectado una cabecera externa que requiera desbloquear el dominio
principal, ni falta un ajuste DNS para esta corrección. Las redirecciones HTTPS
y `www` de Vercel ya son correctas. Como medida opcional de privacidad, puede
mantenerse Deployment Protection en previews; `noindex` no es control de acceso.

## Referencias oficiales

- [Next.js: metadatos](https://nextjs.org/docs/app/api-reference/functions/generate-metadata).
- [Next.js: robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots).
- [Next.js: sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap).
- [Google: canonical y redirecciones](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
- [Google: robots no sustituye a noindex](https://developers.google.com/search/docs/crawling-indexing/robots/intro).
- [Vercel: noindex en previews y excepción de dominios propios](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines).
