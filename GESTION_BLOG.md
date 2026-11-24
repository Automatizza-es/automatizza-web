# Gestión del blog de Automatizza

## Estado de esta entrega

Lanzamiento autorizado el 24 de noviembre de 2026 desde la rama `codex/blog-editorial`: «CRM conectado» es el único artículo marcado como publicado, con fecha 2026-11-24. Los otros cinco actuales y los trece históricos siguen en borrador. No hay tareas programadas, base de datos ni CMS.

El proyecto sigue usando Next.js, su cabecera, pie, tipografías, consentimiento y mecanismos SEO. El blog está en español; no se inventan traducciones ni equivalentes hreflang. Las URL definitivas no llevan barra final, igual que el resto de la web; la variante con barra se normaliza automáticamente.

## Dónde editar

- `content/blog/actual/<slug>.md`: artículos actuales.
- `content/blog/historico/<slug>.md`: archivo histórico.
- `content/blog/assets/`: portadas WebP, almacenadas una sola vez por contenido.
- `docs/blog/referencias/`: fichas editoriales y documentación original del ZIP, incluyendo hojas de cálculo, informe SEO y futuras ampliaciones. Son referencias, no órdenes de publicación.
- `docs/blog/URLS_Y_MIGRACION.md`: URL definitivas y tabla de migración pendiente.

Cada Markdown contiene una cabecera YAML entre `---` y, debajo, el texto. Edita el texto con un editor normal; admite títulos, negritas, cursivas, listas, enlaces, citas y tablas. No admite scripts ni HTML arbitrario. El título principal y la portada se muestran desde los metadatos; no hace falta repetirlos en el cuerpo. La portada incorporada en los históricos se muestra una sola vez.

Los campos `titulo`, `meta_title`, `meta_description`, `summary`, `categoria`, `categoria_nombre`, `autoria`, `image` e `imageAlt` controlan la ficha, SEO y presentación. `slug` debe coincidir con el nombre del archivo y no debe cambiar después de publicar. Las categorías se generan automáticamente a partir de los artículos visibles.

## Comandos básicos

Desde la carpeta `automatizza-web`, con Node 24.22.3 o posterior de la línea 24 (ver README):

```sh
npm ci
npm run blog -- list
npm run blog -- check
```

`check` valida metadatos, fechas, nombres, estados y existencia de las imágenes. Un error impide continuar la compilación.

Para crear un artículo:

```sh
npm run blog -- new mi-nuevo-articulo
```

Se crea un borrador en `content/blog/actual/mi-nuevo-articulo.md`. Sustituye título, resumen, SEO, categoría, texto e imagen. La imagen inicial es provisional y debe cambiarse antes de aprobarlo.

Para incorporar una portada:

```sh
npm run blog -- image mi-nuevo-articulo /ruta/a/portada.webp
```

Después edita `imageAlt` para describirla. Las imágenes definitivas de esta entrega miden **720 × 700 px**, no 1200 × 630 como sugerían algunas fichas anteriores. Conserva esas dimensiones para nuevas portadas; la plantilla usa un marco horizontal con `object-fit: contain` para mostrar toda la ilustración sin recortarla. Los archivos originales ya son WebP pequeños; en las páginas públicas Next Image puede optimizarlos. La revisión protegida los sirve directamente para evitar problemas con la autenticación de Vercel.

No guardes borradores ni imágenes inéditas en `public/`. El servidor solo entrega una imagen si está asociada a un artículo publicado, o en la revisión protegida. Si varios artículos comparten una portada y uno se publica, esa misma imagen pasa a ser pública; los textos de los demás siguen ocultos.

## Estados y fechas

```yaml
draft: true
published: false
publishedAt: null
scheduledAt: null
updatedAt: null
```

`draft` y `published` deben ser opuestos. Solo aparece un artículo con `draft: false`, `published: true` y `publishedAt` válida, no futura. `publishedAt` es la fecha real de publicación en Automatizza; nunca se toma la fecha de preparación ni la del original para un artículo actual.

`scheduledAt` es exclusivamente una anotación editorial. No se consulta para publicar, no hay cron y no existe publicación automática. Puede indicarse una fecha prevista:

```sh
npm run blog -- schedule crm-conectado-seguimiento-comercial 2026-12-01
npm run blog -- schedule crm-conectado-seguimiento-comercial clear
```

El ejemplo no implica aprobar esa fecha. La entrega deja todas las fechas previstas en `null`.

## Revisar antes de publicar

En local:

```sh
BLOG_REVIEW_ENABLED=true npm run dev -- --hostname 127.0.0.1
```

Abrir `http://127.0.0.1:3000/revision-blog` y `/revision-blog/historico`. El servidor debe permanecer en loopback; la revisión local no tiene contraseña propia. La ruta `/blog` siempre refleja únicamente el contenido publicado, incluso durante la revisión.

En Vercel, `BLOG_REVIEW_ENABLED=true` se configura **solo en Preview y solo para la rama de revisión**. Antes de habilitarlo, comprobar que el proyecto mantiene Vercel Authentication para esas previews y que una petición anónima no puede leer páginas ni imágenes. La revisión se apoya en esa autenticación; no es un panel con cuentas propias. No desactivar Deployment Protection ni compartir enlaces de bypass con terceros.

Las rutas `/revision-blog/...` llevan `noindex, nofollow`, no se incluyen en sitemap y no emiten `BlogPosting`. Las previews completas mantienen además las protecciones SEO que ya tenía el proyecto. La revisión devuelve 404 en producción aunque la variable se activase por error. No exportar estos borradores a un hosting estático público.

## Publicar un artículo aprobado

Solo cuando Eva autorice la publicación y el despliegue:

1. Revisar contenido, fuentes, fecha, imagen y notas de su ficha editorial en preview.
2. El día del despliegue autorizado, ejecutar el comando del artículo concreto:

```sh
npm run blog -- publish crm-conectado-seguimiento-comercial --approved
```

El comando cambia únicamente ese Markdown a publicado y fija la fecha del día en **Europe/Madrid**. No despliega, no hace commit ni merge y no activa otros artículos. Si el despliegue se pospone a otro día, corregir `publishedAt` antes de publicar para que refleje el día real.

3. Ejecutar `npm run blog -- check`, `npm run test:blog`, `npm run build` y revisar `git diff`.
4. Revisar la preview resultante y comprobar título, canonical, fecha, imagen social, enlaces y sitemap de la compilación de producción.
5. Hacer merge/desplegar únicamente con autorización. Comprobar después la URL pública y el sitemap.

Orden aprobado y separación inicial propuesta, contada desde la primera publicación que se autorice:

| Orden | Artículo | Intervalo orientativo |
|---|---|---|
| 1 | CRM conectado | Día de lanzamiento |
| 2 | Automatización preventiva | +14 días |
| 3 | Datos y cuadros de mando | +28 días |
| 4 | Aplicaciones web progresivas | +42 días |
| 5 | Nube para pymes | +56 días |
| 6 | Analítica web cualitativa | +70 días |

Este calendario no está activado. Cada publicación requiere su revisión y despliegue individual.

## Actualizar o retirar

Editar el Markdown o sustituir su portada. Para señalar una actualización sustancial:

```sh
npm run blog -- touch crm-conectado-seguimiento-comercial
```

Se cambia `updatedAt`; se conserva `publishedAt` y la URL. Tras revisar y desplegar, se actualizan página, metadatos y sitemap.

Para volver a borrador:

```sh
npm run blog -- draft crm-conectado-seguimiento-comercial
```

Se conserva la primera fecha para no falsearla si se restaura. Tras el despliegue la URL devuelve 404 y desaparece del sitemap y los listados. Las cachés externas ya existentes pueden tardar en reflejar la retirada; retirar un contenido antes público no garantiza borrarlo de terceros.

## Histórico: autorización separada

Conservar `fecha_original`, autoría, notas, atribuciones y contenido. `publishedAt` documentará la migración a Automatizza, mientras la fecha visible y `datePublished` de `BlogPosting` seguirán siendo la fecha original. `migrationApproved` empieza en `false` y bloquea la publicación accidental.

Únicamente tras aprobar la migración de un artículo y coordinar su 301 desde mjlopezz.com:

```sh
npm run blog -- publish manual-de-google-analytics --approved --migration-approved
```

Este comando **no configura redirecciones**. Las 301 del dominio antiguo se realizarán aparte, con autorización, hacia las URL de `docs/blog/URLS_Y_MIGRACION.md`. No añadirlas al proyecto Automatizza. No publicar el histórico duplicado en ambos dominios.

Los enlaces entre históricos apuntan a sus nuevas URL solo si el destino está publicado (o dentro de la revisión). En otro caso remiten al dominio original. No se modifican sus enlaces externos antiguos: forman parte del archivo y pueden haber dejado de funcionar.

## Dependencias y comprobaciones

Se incorporan únicamente `gray-matter` (metadatos Markdown), `react-markdown` (renderizado seguro) y `remark-gfm` (tablas y enlaces). No se ejecuta MDX ni código de los archivos editoriales.

```sh
npm run test:blog
npm run test:contact
npm run test:analytics
npm run test:i18n
npm run test:structured-data
npm run test:security
npm run test:seo
npm run build
```

La batería SEO verifica compilaciones locales de producción y preview sin enviar formularios ni desplegar. Ver `docs/blog/VERIFICACION.md` para la evidencia de esta entrega.

## Enlaces de esta entrega

- [Preview protegida: seis artículos actuales](https://automatizza-web-git-codex-blog-editorial-mjlopezzs-projects.vercel.app/revision-blog).
- [Preview protegida: trece históricos](https://automatizza-web-git-codex-blog-editorial-mjlopezzs-projects.vercel.app/revision-blog/historico).

Son enlaces de la última preview de la rama, incluida la corrección de dependencias. Requieren entrar con la cuenta de Vercel que tenga acceso al proyecto. Si aparece «You Need Access», usa «Switch Account» para entrar con esa cuenta; no desactives la protección. Cada push posterior a la rama genera su nueva preview.

## Medición de visitas

El blog usa la instalación existente de Google Analytics a través de GTM, solo después de aceptar las cookies analíticas. La lista de artículos medibles se genera automáticamente con cada compilación, usando únicamente los publicados. No es necesario tocar Analytics al publicar el próximo artículo. No se mide la revisión privada ni los borradores.

Las visitas se consultan en GA4 en páginas y pantallas, filtrando las rutas `/blog`. Ver `docs/analytics.md` para los límites y pruebas. No se han añadido eventos de conversión ni seguimiento de scroll o clics.
