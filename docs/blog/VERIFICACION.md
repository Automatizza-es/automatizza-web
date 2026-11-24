# Verificación del blog — 24 de noviembre de 2026

## Alcance

Implementación en `Automatizza-es/automatizza-web`, rama `codex/blog-editorial`, basada en `origin/main` sin divergencia al empezar. El directorio inicialmente abierto era `mjlopezz`; solo se inspeccionó para identificarlo. No se modificó ese repositorio, el dominio antiguo, DNS ni redirecciones. El archivo ajeno `docs/.Rhistory` se ha dejado intacto y fuera de los commits.

## Resultado editorial

- 6 artículos actuales y 13 históricos, todos `draft: true`, `published: false`, `publishedAt: null`, `scheduledAt: null`.
- Comparación con el ZIP: los cuerpos Markdown de los 19 artículos son idénticos al material recibido. Se añaden campos de gestión en la cabecera, sin reescribir el texto.
- Portadas definitivas: 19 referencias a 16 archivos únicos (tres duplicados exactos eliminados por hash). Dimensiones reales comprobadas: 720 × 700 px. Alt definitivos conservados.
- Nota histórica, notas editoriales, fechas originales y atribuciones visibles en revisión. La etiqueta de archivo diferencia expresamente los históricos.
- Tabla de 19 URL finales y 84 filas de URL antiguas relacionadas extraídas del mapa XLSX. Ninguna redirección activada.
- Documentación de fase 2 y candidatos adicionales conservada, sin redactar contenidos nuevos.

## Pruebas

- Compilación Next.js con Node 24.22.3 y comprobación TypeScript: correcta.
- ESLint sobre los componentes, rutas, biblioteca y scripts nuevos: correcto.
- Pruebas existentes: contacto (25), analítica (35), idiomas (12), datos estructurados (5), seguridad (9): 86 correctas. No se enviaron correos reales.
- Pruebas del modelo editorial (5): estados coherentes, publicación individual, fechas, migración y bloqueo de revisión en producción.
- Batería SEO: **180 escenarios HTTP/página** correctos, con compilaciones aisladas de producción y preview; canonical, robots, sitemap, enlaces, dominios y páginas existentes.
- HTTP de producción con todos en borrador: 19 URL de artículo y sus 19 referencias de imagen devuelven 404; los índices no muestran borradores; sitemap sin artículos; revisión 404 incluso con la variable de revisión activada.
- HTTP de revisión local: 19 artículos e imágenes correctos, un H1 por artículo, canonical definitivo, `noindex, nofollow`, cero `BlogPosting` y sitemap de preview vacío.
- Ensayo de publicación en copia temporal: solo CRM devuelve 200 y entra en índice y sitemap; otros 18 artículos siguen 404. Fecha de Automatizza, autoría, canonical, imagen social y `BlogPosting` correctos. Imagen optimizada por Next devuelve 200. La revisión sigue cerrada en producción. Este ensayo no modificó los Markdown de trabajo ni publicó nada.
- Navegador Chrome: índices, CRM y Manual de Google Analytics; comprobación visual en escritorio y a 1024, 390 y 320 px. Sin desbordamiento horizontal en los tamaños comprobados. Menú móvil, enlace al blog, portadas y notas históricas comprobados.

Para repetir el ensayo de publicación: `npm run test:blog:publication`. Crea y elimina una copia temporal; no hace despliegues ni envíos de formularios.

## Preview y protección

Vercel conserva `ssoProtection.deploymentType = all_except_custom_domains` y rama de producción `main`. Se configura `BLOG_REVIEW_ENABLED=true` exclusivamente para el entorno Preview de `codex/blog-editorial`. La revisión depende de Vercel Authentication; no debe activarse en un alojamiento sin esa protección.

Las rutas públicas `/blog` no muestran borradores ni siquiera en preview. Para revisar los textos hay que abrir `/revision-blog` y `/revision-blog/historico` con una sesión Vercel autorizada. Las rutas de revisión también llevan cabecera y metadatos noindex y quedan bloqueadas por código en producción.

## Incidencias y límites

- Las fichas sugerían originalmente 1200 × 630; los WebP definitivos son 720 × 700. Se conserva el material recibido y se muestra completo dentro de un marco horizontal, sin deformación ni recorte.
- Los enlaces históricos externos se conservan por su valor documental; no se certifica que todos sus recursos sigan disponibles. No se han alterado ni reescrito las notas heredadas.
- La revisión inicial encontró 11 avisos preexistentes de dependencias. **Resueltos posteriormente, por autorización de Eva**, mediante Next.js 16.4.6 y actualizaciones compatibles: auditoría con cero avisos. Ver [corrección de dependencias](../security/2026-11-24-dependencias.md). La corrección está en la rama de revisión; no se ha desplegado en producción.
- La batería SEO necesitó incorporar los nuevos índices al inventario de enlaces y una página de privacidad ya existente (`/privacidad-automatizza-conta`) que antes no estaba auditada. No se modificó esa página.
- GTM, Google Analytics y consentimiento no se han editado. La lista de rutas que admite la analítica actual se conserva: no se han añadido eventos ni ampliado la medición a nuevas rutas editoriales.
- Las capturas y pruebas locales no equivalen a una auditoría de todos los navegadores. La frecuencia quincenal está documentada, no programada.

## Resultado remoto en Vercel

Preview completada (`READY`) del commit `a3e93c8`, sin destino de producción:

- [Revisión de artículos actuales](https://automatizza-26m7j5a4d-mjlopezzs-projects.vercel.app/revision-blog).
- [Revisión del archivo histórico](https://automatizza-26m7j5a4d-mjlopezzs-projects.vercel.app/revision-blog/historico).
- [Vista del blog público, sin artículos publicados](https://automatizza-26m7j5a4d-mjlopezzs-projects.vercel.app/blog).

Verificación HTTP autenticada del despliegue: los 19 artículos de revisión y sus imágenes responden 200; las 19 URL públicas y sus imágenes inéditas responden 404; ambos índices públicos están limpios; sitemap de preview vacío; canonical, H1 y noindex correctos, sin `BlogPosting` en borradores. Las peticiones anónimas a los índices de revisión y a una portada quedan interceptadas por Vercel Authentication (302 a su inicio de sesión).

Se utilizó `vercel curl`, el mecanismo oficial de comprobación de deployments protegidos. El acceso técnico temporal generado por la CLI se revocó al terminar las pruebas; no se han compartido secretos ni creado excepciones públicas.

El navegador abierto estaba conectado a una cuenta sin pertenencia al equipo del proyecto y mostró «You Need Access». Para abrir la preview se debe usar una cuenta Vercel autorizada del proyecto. No se solicitó acceso en nombre de esa cuenta ni se cambiaron miembros/permisos.

La producción permanece en el commit `d2eb442` de `main`. No se hizo merge ni se promovió ninguna preview.
