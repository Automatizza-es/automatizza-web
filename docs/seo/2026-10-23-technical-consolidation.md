# Automatizza — consolidación técnica y datos estructurados

Fecha de revisión: 23 de octubre de 2026. Rama: `codex/seo-structured-data`.
Base y producción comprobada: `b13b8e39b4a7f8802d691de454cf6aa4017f593f`.
Entrega inicial local, posteriormente aprobada por la titular para integrar y
publicar. Esta actualización incorpora su confirmación de Search Console,
Bing y LinkedIn corporativo; la evidencia inicial de producción se conserva
como baseline anterior al despliegue de esta fase.

La auditoría «Auditoría SEO + GEO/AEO · Automatizza · Octubre 2026», facilitada
como HTML, se ha tratado como una hoja de ruta. Sus propuestas no sustituyen las
decisiones posteriores aprobadas ni acreditan el estado actual de las cuentas.

## 1. Lo que ya está resuelto — no se rehace

| Área | Evidencia de código y producción | Decisión |
| --- | --- | --- |
| FAQ | Siete preguntas y sus siete respuestas completas en el HTML inicial de cada una de las cuatro portadas. H2 de sección, H3 de preguntas y acordeón semántico. Sin `FAQPage`. | Mantener el contenido y diseño aprobados; no sustituirlos por las nueve propuestas de la hoja de ruta. |
| Idiomas | 20 páginas comerciales con HTTP 200: portada, contacto y tres proyectos en ES, EN, FR y PT-PT. Los enlaces del selector conservan el equivalente y el idioma de la URL. | No crear `/es`, nuevas páginas de servicios ni redirecciones de idioma. |
| Canonical y metadatos | Títulos y descripciones específicos, canonical propio con `https://automatizza.es` e idioma correcto en el HTML inicial de las 20 páginas. Sin noindex en ellas. | Conservar. |
| Hreflang | Conjunto recíproco es/en/fr/pt-PT y x-default español en las cinco familias de páginas. En este proyecto está correctamente tanto en head como en sitemap. | No se considera obligatorio usar ambos mecanismos ni un fallo usar solo el sitemap si es completo y recíproco; no hay nada que corregir aquí. |
| Sitemap | HTTP 200, 20 URLs finales y 100 referencias alternativas, sin legales ni alias que redirigen. | Conservar. |
| Search Console | Propiedad verificada y sitemap enviado correctamente, confirmado por la titular. | Completado. La revisión de cobertura, canonical elegida y rastreo dentro de la cuenta se mantiene como comprobación posterior distinta. |
| Bing Webmaster Tools | Sitio verificado y sitemap enviado correctamente, confirmado por la titular. | Completado. La revisión de cobertura e inspección dentro de la cuenta es un seguimiento posterior. |
| Robots | HTTP 200. Producción permite `/`, excluye `/api/` e indica el sitemap. Sin reglas específicas de bloqueo para los tres User-Agent probados. | Sin cambios de política de bots. |
| Legales | Las 12 páginas ES/EN/FR/PT-PT responden 200 con canonical propio y `noindex, nofollow`; no están en sitemap ni hreflang. | Conservar. La revisión lingüística del revisor es un trabajo distinto de esta fase. |
| Dominios y barras finales | `www` y `automatizza-web.vercel.app` redirigen 308 al dominio principal, conservando ruta e información de consulta. `/en/`, `/fr/`, `/pt/` y `/contacto/` normalizan 308 sin barra; `/` sigue 200 en español y `/es` es 404. | Conservar todas las URLs y su política actual. |
| Previews | La preview existente consultada devuelve 302 a SSO de Vercel y `X-Robots-Tag: noindex`. Los builds aislados de preview conservan noindex, sitemap vacío y sus URLs sin redirección al dominio real. | No modificar protección, generar bypass ni publicar una preview de esta rama. |
| Formulario y medición | Se mantienen código, activación, validación, antispam y envío. Pruebas de consentimiento, publicidad denegada, retirada, deduplicación de page_view y conversión solo tras éxito confirmado. | Sin cambios de integración ni pruebas de envío real. |

El baseline previo corresponde al despliegue
`dpl_GecbZAVrESTQDM672vt3XWLLmZZx`, coincidente con el estado correcto de Vercel
para el commit base. En esa comprobación inicial, las cuatro portadas publicadas
tenían cero bloques `application/ld+json`. Esa fue la carencia técnica concreta
detectada y el objeto del cambio aprobado; no se presenta este baseline como
una comprobación del despliegue posterior.

Evidencia de las 32 páginas, metadatos, alternativas, peticiones de prueba,
logo y redirecciones: [baseline JSON](2026-10-23-production-baseline.json).
La preview muestreada corresponde a un commit anterior, `50f88e2`; no se
presenta como una preview del código nuevo ni se ha inspeccionado la aplicación
detrás del acceso protegido.

## 2. Cambio preparado

Un componente de servidor, `SiteIdentityStructuredData`, incluido una sola vez
en la vista compartida de las cuatro portadas. Se genera en el HTML inicial,
sin JavaScript ejecutable, cookies, nuevas conexiones o dependencias. Las
páginas interiores no repiten el bloque de identidad de la portada.

| Identificador estable | Tipo y función |
| --- | --- |
| `https://automatizza.es/#website` | WebSite: Automatizza, dominio principal, idiomas es/en/fr/pt-PT; publisher apunta a la sociedad y about a la marca. |
| `https://automatizza.es/#organization` | Organization: Grain Store Technology, S.L., misma razón social legal, NIF, contacto y domicilio social publicados; brand apunta a Automatizza. |
| `https://automatizza.es/#brand` | Brand: Automatizza, marca de la sociedad según el aviso legal aprobado; no una segunda sociedad. sameAs apunta únicamente al LinkedIn corporativo confirmado de Automatizza. |
| `https://automatizza.es/#logo` | ImageObject del PNG público existente, 1909 × 280 px. Se comparte por referencia; no se crean otras imágenes. |

Se mantiene el mismo grafo y los mismos IDs en los cuatro idiomas. No hay
cuatro WebSite, cuatro sociedades ni cuatro marcas. Las referencias repetidas
por `@id` apuntan al mismo nodo; no redefinen la entidad en cada componente.

La relación usa `Organization.brand → Brand`, de acuerdo con
[Schema.org](https://schema.org/brand), y `WebSite.publisher → Organization`.
No se interpreta la marca como una filial ni se inventa un `parentOrganization`.
El uso de un único nombre del sitio por dominio y su presencia en la raíz sigue
la documentación de [Google sobre nombres del sitio](https://developers.google.com/search/docs/appearance/site-names).

### Procedencia de los datos y omisiones

- Dominio definitivo, verificado por HTTPS y canonical de producción.
- Sociedad, NIF y email: se reutilizan directamente de `src/content/privacy.ts`.
- Domicilio social: Calle Párroco Bartolomé Blanco, 46, 14014 Córdoba, España.
  Se desglosa como PostalAddress y una prueba verifica su igualdad con la
  dirección aprobada. No se presenta como local abierto al público ni se
  añaden horarios o un área comercial de servicio.
- Logo: `https://automatizza.es/brand/automatizza-logo.png`, HTTP 200,
  `image/png`, disposición inline y dimensiones verificadas contra el archivo.
- Perfil corporativo de la marca confirmado expresamente por la titular:
  `https://www.linkedin.com/company/automatizza-es/`. Se incluye como `sameAs`
  únicamente en Brand, con la URL limpia, sin `/home/`, consulta ni fragmento.
  Organization no contiene sameAs: esta página no identifica a Grain Store
  Technology, S.L. Los LinkedIn personales tampoco se atribuyen a la sociedad.
- Se omiten teléfono, fecha de fundación, personas/cargos, reconocimientos,
  reseñas, puntuaciones, empleados, precios, VAT/VIES, horarios, resultados y
  relaciones empresariales adicionales por no existir evidencia para ellos.
  El NIF conocido se expresa como taxID, sin afirmar una validación VIES.

No se cambian ni se vuelven a aprobar los datos legales. El contraste usa los
datos facilitados por la titular y su aviso legal publicado; no equivale a una
consulta independiente al Registro Mercantil.

## 3. Validación

- Lint correcto.
- Dos builds Next.js completos y aislados, uno con configuración de producción
  y otro de preview, mediante `npm run test:seo`.
- 124 escenarios HTTP/SEO correctos, ampliados para comprobar un único bloque
  JSON-LD inicial en cada portada, el mismo grafo entre idiomas, ausencia de
  duplicados en interiores y legales, e IDs del dominio real en previews.
- 59 pruebas: 23 contacto, 24 analítica, 7 idiomas y 5 datos
  estructurados. Comprueban relaciones resueltas, datos legales y dirección,
  PNG original, propiedades no confirmadas ausentes, serialización segura y
  atribución exclusiva del LinkedIn limpio al nodo Brand.
- Schema.org Validator, modo fragmento de código, sobre una muestra generada
  por el módulo real: **0 errores y 0 advertencias**. Reconoce WebSite con
  Organization, Brand e ImageObject relacionados por ID. [Captura del resultado](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/seo-phase1/schema-validation.png).
- Comparación del texto visible de las cuatro portadas locales frente al HTML
  publicado: idéntico. No cambian CSS, cabecera, FAQ, textos comerciales, rutas,
  formulario, proveedor de email, condiciones de activación o consentimiento.

La serialización escapa `<` antes de incluir el JSON en el script, siguiendo la
[guía de JSON-LD de Next.js](https://nextjs.org/docs/app/guides/json-ld).
Validar sintaxis y vocabulario no garantiza que Google muestre un resultado
específico o adopte inmediatamente los datos. La [guía de Organization de Google](https://developers.google.com/search/docs/appearance/structured-data/organization)
recomienda validar y comprobar después la URL publicada con sus herramientas.

Comandos ejecutados:

```sh
npm run lint
npm run test:structured-data
npm run test:contact
npm run test:analytics
npm run test:i18n
npm run test:seo
```

## 4. Qué falta realmente y qué acceso requiere

| Comprobación o decisión | Estado y acceso necesario |
| --- | --- |
| Publicación de esta fase | Aprobada expresamente por la titular. La integración y comprobación del despliegue se realizan mediante el flujo habitual, conservando los cambios posteriores de main. |
| Search Console | Verificación y envío correcto del sitemap completados según confirmación de la titular. Pendiente solo de seguimiento dentro de la cuenta: URLs descubiertas/rastreadas/indexadas, canonical elegida, cobertura y prueba de URL en directo. No se repite el alta ni el envío. |
| Bing Webmaster Tools | Verificación y envío correcto del sitemap completados según confirmación de la titular. El seguimiento de inspección y cobertura requiere acceso a la cuenta. No se configura IndexNow ni se generan claves. |
| Rastreo real | Registros de Vercel/CDN y verificación de IP/DNS o rangos oficiales; Search Console/Bing aportan además su evidencia propia. No se solicita reducir ninguna protección. |
| GA4 | Acceso a informes para una línea base de tráfico orgánico, páginas de entrada, idiomas y conversiones confirmadas. No falta reinstalar GA4/GTM ni cambiar el consentimiento: esa integración ya existe y sus pruebas pasan. |
| Perfiles corporativos | LinkedIn de Automatizza confirmado e incorporado a Brand. No se necesita ningún perfil adicional para completar esta fase ni se atribuye ese perfil a la sociedad titular. |
| Contenido futuro | Páginas de servicios, nueva página corporativa, calculadora independiente y ampliación de casos quedan fuera de este alcance; no se han creado. |

### Límite de la comprobación de bots

Se hicieron peticiones de lectura desde este entorno con los User-Agent
`Googlebot`, `bingbot` y `OAI-SearchBot` a `/` y `/robots.txt`; las seis
devolvieron 200. La portada no devolvió `X-Robots-Tag: noindex` y mantuvo su
canonical correcta.

**Cambiar el User-Agent no demuestra que la petición venga de un rastreador
real ni que una página esté indexada.** No se dispone de esos registros o de
acceso a las cuentas de buscadores en esta revisión. La comprobación real
requiere, por ejemplo, [verificar la IP y el DNS de las peticiones de Google](https://developers.google.com/crawling/docs/crawlers-fetchers/verify-google-requests).
No se modifican robots, políticas de acceso a bots, WAF, DNS, Vercel, GA4 o GTM.

## 5. Coordinación con la futura página de automatización

Se revisaron ramas locales, remotas, worktrees y PR abiertos: todavía no existe
una rama o PR de esa página en este repositorio. No se ha creado una rama vacía
ni iniciado la página dentro de esta integración.

El siguiente trabajo debe partir de `origin/main` actualizado después de esta
publicación. Si se ha creado una rama en otro entorno mientras tanto, debe
incorporar `origin/main` mediante merge, conservando sus cambios, sin reescribir
historia publicada. Debe mantener:

- La inclusión única de `SiteIdentityStructuredData` en la portada compartida.
- Los IDs `/#website`, `/#organization`, `/#brand` y `/#logo` del dominio real.
- El sameAs de LinkedIn exclusivamente en Brand.
- El registro de rutas, metadatos, noindex legal, consentimiento y pruebas
  existentes. Las nuevas URLs solo se incorporarán a sitemap/hreflang cuando
  sus equivalentes estén completos e indexables; no se deben restaurar archivos
  completos de una base antigua ni perder este grafo al editar la portada.

Este protocolo permite que la nueva página incorpore la fase publicada sin
sobrescribirla. No autoriza a publicar la futura página antes de su revisión.
