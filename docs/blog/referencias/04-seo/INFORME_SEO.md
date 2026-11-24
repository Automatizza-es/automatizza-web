# Informe SEO · Migración de mjlopezz.com a Automatizza

Fecha: 23-11-2026. Estado: **análisis y propuesta**. No se ha activado ninguna redirección ni se ha modificado ninguna web.

## 1. Fuentes y límites

| Fuente | Qué aporta | Límite |
|---|---|---|
| Ahrefs, «Best by links», capturas del 21-11-2026 | 135 URL de mjlopezz.com con enlaces externos: número de dominios, DR máximo, dofollow/nofollow y fecha en que Ahrefs los vio por primera vez. Transcritas en `ahrefs_best_by_links_2026-11-21.csv`. | Las capturas **no muestran qué dominios enlazan** ni los textos de anclaje. «DR máximo» es el del dominio más fuerte, no una medida de la calidad del enlace. |
| SQL de WordPress (leído como texto) | 385 entradas, con título, fecha, slug y contenido. | Las URL `/slug/` y `/?p=ID` de entradas no publicadas son deducciones. |
| `vercel.json` de mjlopezz.com | Las 75 redirecciones vigentes. | — |
| Piwik 2011 | Rutas reales y visitas de enero a julio de 2011. | No representa el tráfico actual. |
| Search Console | — | **Sin datos todavía**: mjlopezz.com se indexó el 22-11-2026 y el paso de Search Console está pendiente. Es la fuente que falta para medir tráfico y enlaces reales. |

## 2. La portada de mjlopezz.com

| Variante | Dominios | Enlaces | Dofollow | Nofollow | DR máximo | Visto desde |
|---|---|---|---|---|---|---|
| `https://mjlopezz.com/` | **878** | 927 | 353 | 574 | 73 | 18-11-2024 |
| `http://mjlopezz.com/` | 18 | 19 | 14 | 5 | 74 | 07-05-2018 |
| `http://www.mjlopezz.com/` | 4 | 10 | 9 | 1 | 46 | 09-08-2013 |
| `https://www.mjlopezz.com/` | 3 | 7 | 1 | 6 | 71 | 23-05-2026 |

**Lectura:**

1. **Los 878 dominios de la variante https no encajan con un perfil editorial.** Ahrefs los ve por primera vez el 18-11-2024, cuando el dominio era todavía el WordPress con aviso de malware y dos años antes de que existiera el sitio actual. El 62 % de los enlaces son nofollow. Un salto de cientos de dominios hacia una portada, en un sitio comprometido, es el patrón habitual de enlaces automáticos o de spam. **No es una conclusión cerrada:** sin la lista de dominios no se puede confirmar.
2. **Las variantes http y www tienen un historial anterior** (desde 2013 y 2018) y son las que con más probabilidad contienen enlaces editoriales reales: unos 20–25 dominios en total.
3. **Los enlaces a una portada personal hablan de una persona, no de un tema.** Su relación con la portada de una consultora de automatización es indirecta.
4. **Una redirección a una página no equivalente no garantiza que se transmita el valor.** La guía de Google para mudanzas de sitio pide redirigir cada URL a su equivalente y evitar enviar muchas URL antiguas a un único destino irrelevante, como la portada; Google puede tratar esas redirecciones como errores 404 suaves.

**Conclusión sobre la portada:** no hay base para suponer que redirigirla a la portada de Automatizza aporte valor SEO. Antes de cualquier decisión hay que exportar de Ahrefs «Referring domains» y «Anchors» de `https://mjlopezz.com/` y `http://mjlopezz.com/`, clasificar los dominios y contrastarlo con el informe de enlaces de Search Console.

## 3. Grupos de enlaces automáticos

98 de las 135 URL de Ahrefs reciben enlaces de cinco patrones que se repiten en muchas URL a la vez: el mismo número de dominios, el mismo DR y la misma fecha. Indican copias del sitio o agregadores, no enlaces editoriales.

| Grupo | URL | Patrón |
|---|---|---|
| A | 35 | 2 dominios (DR máx. 74) desde el 23-05-2023. Enlazan a la vez unas 40 URL, muchas mal formadas (`/2011/12/2011/05/…`), que reproducen los enlaces relativos de la página «35 charlas imperdibles» (#4046). |
| B | 32 | Dominios de DR 9–13 desde 05-2024 y 09-2025, con los mismos 3 enlaces a decenas de entradas de estudios de 2012, en http y https. |
| C | 15 | 1 dominio de DR 12 desde el 23-05-2023, con 1 enlace a cada entrada. |
| D | 12 | 1 dominio de DR 13, nofollow, desde el 27-05-2022. Enlaza entradas de 2011 y URL mal formadas generadas a partir de #4177. |
| E | 4 | 1 dominio de DR 74 desde el 19-03-2025 que enlaza #4046, su categoría, una imagen de `uploads` y `/wp-comments-post.php`. |

Las URL mal formadas no son páginas reales. Las tres que apuntan a artículos publicados ya redirigen a su artículo; el resto se deja en 404.

## 4. URL con mayor interés SEO

Ordenadas por la solidez de sus enlaces, no solo por el número de dominios:

| # | URL | Dominios | Dofollow | DR máx. | Desde | Lectura | Situación |
|---|---|---|---|---|---|---|---|
| 1 | `/2012/01/31-libros-guias-y-manuales-gratuitos/` (#4177) | 21 | 17 | 79 | 2016 | **El activo más sólido del dominio**: enlaces antiguos, mayoría dofollow y fuera de los grupos automáticos. | Publicado en mjlopezz.com |
| 2 | `http://mjlopezz.com/` y `www` | 18 + 4 + 3 | 14 + 9 + 1 | 74 | 2013–2018 | Enlaces a la marca personal, probablemente editoriales. | Portada |
| 3 | `/2012/02/los-elementos-clave-del-community-management/` (#4576) | 25 | 0 | 59 | 2020 | Muchos dominios, **todos nofollow**. El texto se publicó también en atcreativa.com. | Publicado |
| 4 | `https://mjlopezz.com/` | 878 | 353 | 73 | 2024 | Volumen alto, origen dudoso (ver apartado 2). | Portada |
| 5 | `/2012/03/manual-de-google-analytics/` (#4413) | 3 | 3 | 30 | 2025 | Pocos, pero dofollow e independientes. | Publicado |
| 6 | `/2013/01/39-libros-…-marketing-social-media/` (#6528) | 2 | 1 | 82 | 2024 | Fuera de los grupos automáticos. | Candidato A |
| 7 | `/2011/12/35-charlas-imperdibles/` (#4046) | 2 (+1) | 2 (+3) | 82 | 2024 | Página índice que copian los grupos A y E. | Candidato A |
| 8 | `/2012/03/the-end-of-business-as-usual-brian-solis/` (#4888) | 2 | 1 | 73 | 2023 | Reseña cercana a Automatizza. | Candidato A |
| 9 | `/2012/02/10-tendencias-de-mobile-marketing-para-2012-iab-spain/` (#4467) | 2 | 1 | 67 | 2019 | Los enlaces más antiguos fuera de los artículos publicados. | Candidato B |
| 10 | `/2011/01/44-libros-…/` (#24) | 2 (+1) | 2 | 47 | 2018 | Más la variante `/index.php/…`. | Publicado |

El artículo de analítica cualitativa (#6422), reescrito para Automatizza, tiene 1 dominio de DR 2,4: su valor SEO es mínimo y se mantiene la decisión de no redirigirlo.

## 5. Casos sin equivalente adecuado

No tienen un destino equivalente en automatizza.es y no deben redirigirse:

- **La portada y «Sobre mí»**: Automatizza no tiene hoy una página sobre María José López. Si se migrara el dominio, habría que crear esa página antes de redirigir.
- **Los artículos de marketing y redes sociales no seleccionados** (unos 90 con enlaces registrados en Ahrefs y 267 sin ellos): no hay contenido equivalente en Automatizza. Redirigirlos a la portada o al blog sería una redirección masiva sin equivalencia.
- **Las URL mal formadas** de los grupos automáticos que no apuntan a un artículo publicado.
- **Recursos de WordPress**: `/wp-comments-post.php`, `/wp-content/uploads/…`, búsquedas `?s=` y el ID `?p=4471`, que no corresponde a ninguna entrada. Proceden del sitio comprometido: 410 si se decide retirarlos expresamente.
- **Los orígenes de los cuatro artículos reescritos** (#7169, #7458, #6414 y #2663) y de los seis temas de la fase 2: el nuevo texto no es equivalente.

## 6. Recomendación sobre la redirección completa de mjlopezz.com

**Recomendación: no redirigir el dominio completo ahora.** Mantener mjlopezz.com como archivo personal, publicar en Automatizza los seis artículos del blog y decidir la migración del archivo con datos de Search Console.

**Por qué:**

1. **El valor SEO comprobable es pequeño y está concentrado.** Sin contar la portada, solo #4177 (17 dominios dofollow) y #4576 (25 dominios, todos nofollow) superan los 3 dominios. El 73 % de las URL con enlaces dependen de copias o agregadores automáticos.
2. **El gran volumen de la portada es dudoso.** Los 878 dominios aparecieron después del compromiso del WordPress y no se han podido identificar.
3. **La temática no coincide.** El archivo trata de marketing y redes sociales de 2011–2014; Automatizza, de automatización, software a medida e IA para empresas. Las redirecciones solo transmiten valor cuando el destino es equivalente, y mezclar ese archivo con el blog técnico puede diluir el enfoque temático de automatizza.es.
4. **mjlopezz.com acaba de relanzarse bien.** Desde el 22-11-2026 está indexado, con 13 artículos, redirecciones uno a uno y enlaces visibles a Automatizza en la portada, «Sobre mí» y el pie. Ya cumple la función de puente hacia Automatizza sin riesgo.
5. **Un mismo artículo no puede estar en los dos dominios.** Publicar el archivo en `/blog/historico/` y dejarlo en mjlopezz.com crearía contenido duplicado. Publicarlo en Automatizza solo tiene sentido como parte de una migración, con su 301 el mismo día.

**Qué haría falta para reconsiderarlo:**

1. Exportar de Ahrefs los dominios de referencia y anclajes de la portada (https y http) y de #4177 y #4576, y clasificarlos.
2. Verificar mjlopezz.com en Search Console y esperar unos tres meses de datos: clics, impresiones, consultas y enlaces.
3. Decidir el papel de la marca personal: si debe seguir existiendo como sitio propio.
4. Si se migra, tener publicada en Automatizza una página sobre María José López como destino de la portada y de «Sobre mí».

**Si finalmente se aprueba la migración**, el `MAPA_REDIRECCIONES.xlsx` ya recoge la acción para ese escenario (columna «Si se migra el dominio»):

- 301 uno a uno de los 13 artículos, de sus 75 variantes y de `/archivo/` a `/blog/historico/`, sin cadenas.
- Los candidatos del histórico adicional solo si se recuperan y publican.
- 404/410 para todo lo que no tenga equivalente; nunca redirección a la portada.
- Herramienta de cambio de dirección de Search Console, mantener las redirecciones al menos un año y renovar el dominio.

## Fuentes

- Google Search Central, mudanzas de sitio con cambios de URL: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- Google Search Central, redirecciones y Google Search: https://developers.google.com/search/docs/crawling-indexing/301-redirects
- Ahrefs, «Best by links» de mjlopezz.com, capturas del 21-11-2026 (transcritas en `ahrefs_best_by_links_2026-11-21.csv`).
