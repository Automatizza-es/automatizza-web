# Migración editorial y SEO · mjlopezz.com → Automatizza

Para Eva y para Codex. Este paquete reúne lo necesario para integrar en automatizza.es los contenidos aprovechables de mjlopezz.com y para decidir qué hacer con las URL del dominio antiguo.

> **Estado: preparado, nada ejecutado.** No se ha publicado nada, no se ha modificado mjlopezz.com ni automatizza.es y no hay ninguna redirección activa hacia Automatizza. Las URL de Automatizza son propuestas: Eva comprueba que encajan en el proyecto.

## Qué hay en el paquete

```
migracion-automatizza/
├── README.md                     ← este archivo
├── INDICE_MIGRACION.md           ← los 19 artículos, con URL actual y propuesta
├── MAPA_REDIRECCIONES.xlsx       ← mapa SEO propuesto (222 URL + 267 del resto del histórico)
├── 01-blog-actual/               ← 6 artículos para /blog/, aprobados el 22-11-2026
│   ├── articulos/NN-tema/articulo.md + ficha.md
│   ├── INDICE_EDITORIAL.md       ← orden de publicación, decisiones, datos que caducan
│   ├── HOJA_DE_RUTA_FASE2.md     ← los otros seis temas
│   └── LEEME_BLOG_ACTUAL.md      ← instrucciones originales de este bloque
├── 02-historico/                 ← 13 artículos completos para /blog/historico/
│   ├── NN-slug/articulo.md + ficha.md + imágenes
│   └── INVENTARIO_IMAGENES.md    ← las 20 imágenes, con su uso recomendado
├── 03-historico-adicional/       ← propuesta de otros artículos que conservar (no preparados)
│   ├── SELECCION_HISTORICO_ADICIONAL.md
│   ├── candidatos_historico.xlsx ← los 99 artículos con enlaces externos, valorados
│   └── automatizza_seleccion_historico.xlsx ← selección anterior de temas para el blog
└── 04-seo/
    ├── INFORME_SEO.md            ← portada, URL de interés, casos sin equivalente y recomendación
    └── ahrefs_best_by_links_2026-11-21.csv
```

## Estructura propuesta en automatizza.es

| Ruta | Contenido |
|---|---|
| `/blog/` | Publicaciones actuales: los 6 artículos de `01-blog-actual/`. |
| `/blog/<slug>/` | Cada artículo actual, con el `slug` de su front matter. |
| `/blog/historico/` | Índice del archivo recuperado de mjlopezz.com. |
| `/blog/historico/<slug>/` | Cada artículo histórico, con el último segmento de su URL actual como slug. |

## Orden de trabajo recomendado

1. **Integrar y publicar el blog actual** (`01-blog-actual/`), siguiendo su `LEEME_BLOG_ACTUAL.md` y el orden de `INDICE_EDITORIAL.md`. Es independiente de la migración del dominio.
2. **Preparar el archivo histórico** (`02-historico/`) en un entorno de pruebas, con `noindex`, sin publicarlo.
3. **No publicar el archivo histórico en producción** hasta que María José López apruebe la migración. Los 13 artículos siguen publicados en mjlopezz.com; tenerlos en los dos dominios crearía contenido duplicado. Si se aprueba, se publican y se activan sus 301 el mismo día.

## Integración del archivo histórico

### Formato de `articulo.md`

Cada artículo empieza con un bloque YAML:

| Campo | Uso |
|---|---|
| `titulo` | Título original (H1). No incluido en el cuerpo. |
| `slug` | Slug propuesto. Es el mismo que en mjlopezz.com, para facilitar las redirecciones uno a uno. |
| `url_actual` | URL pública actual en mjlopezz.com. |
| `url_propuesta` | URL propuesta en automatizza.es. |
| `fecha_original` | Fecha de publicación original. **Es la fecha que debe mostrarse**, no la de importación. |
| `autoria` | Autoría original: María José López. |
| `categoria`, `categoria_nombre` | Categoría del archivo: `tecnologia`, `marketing`, `tendencias` o `recursos`. |
| `descripcion` | Descripción para la meta description (máx. 220 caracteres). |
| `wp_id` | ID del WordPress original, para trazabilidad. |
| `nota_historica` | Texto que debe mostrarse **antes del cuerpo**, separado visualmente. |
| `notas_archivo` | Notas de 2026 sobre servicios desaparecidos. Se muestran debajo de la nota histórica, precedidas de «Nota del archivo (2026):». |
| `destacado_en_mjlopezz`, `estado` | Metadatos internos. No publicar. |

### Cuerpo

- Markdown estándar con el texto íntegro, **saneado y sin reescribir**. No corregir, resumir ni actualizar el contenido.
- Las imágenes se enlazan en relativo (`./01-imagen.jpg`) y están en la misma carpeta.
- Hay dos elementos HTML del archivo que conviene estilizar:
  - `<p class="nota-editorial">…</p>` (6 casos): sustituye un vídeo o una presentación en Flash que ya no existe. En mjlopezz.com se muestra en letra pequeña, gris, con un borde izquierdo y fondo suave.
  - `<span class="no-disponible">(recurso no disponible)</span>` (19 casos): marca un enlace original que ya no funciona. Se muestra en letra pequeña y gris.
- Los enlaces entre artículos del archivo ya apuntan a `/blog/historico/<slug>/` (4 enlaces en #3887 y #4177). Si cambia la ruta, ajustarlos.
- Hay 79 enlaces externos de la época. Muchos llevarán a páginas que ya no existen: es parte del carácter de archivo y lo advierte la nota histórica.

### Imágenes

Las 20 imágenes son JPEG re-codificados y comprobados durante la migración de mjlopezz.com. Ninguna procede directamente del `uploads` del WordPress antiguo. **Ninguna tiene licencia documentada**: `02-historico/INVENTARIO_IMAGENES.md` las clasifica por riesgo en un blog corporativo:

- **Utilizable como cita (11):** reproduce la obra que el texto comenta. Mantener la atribución.
- **Condicionada (7):** autoría no documentada. Publicar solo si se confirma el origen o el permiso; si no, publicar el artículo sin ella.
- **No utilizar en Automatizza (2):** una foto de origen desconocido y un fotograma de TED (licencia no comercial).

Los dos archivos de #3887 (`01-tim-oreilly.jpg` y `02-tim-oreilly1.jpg`) son idénticos: usar solo uno.

### Requisitos de cada página histórica

- Fecha original y autoría visibles.
- Nota histórica antes del texto.
- Etiqueta canónica a sí misma, solo cuando el artículo se publique en producción.
- Incluir en el sitemap de Automatizza solo los que estén publicados.

## Mapa de redirecciones

`MAPA_REDIRECCIONES.xlsx` es una **propuesta**. Nada se activa sin aprobación.

| Hoja | Contenido |
|---|---|
| Resumen | Cifras y escenario recomendado. |
| Mapa | 222 URL: portada y páginas del sitio, los 13 artículos, las 75 redirecciones vigentes, las URL de los 6 artículos reescritos y otras 108 URL con enlaces en Ahrefs. Incluye URL exacta, ID, título, dominios de referencia, destino actual, destino propuesto, tipo de destino, acción propuesta, acción si se migra el dominio, justificación, nivel de confianza y comprobaciones pendientes. |
| Portada | Análisis separado de la portada y sus variantes. |
| Ahrefs (135) | Las 135 URL de Ahrefs con su grupo de enlaces y su acción en el mapa. |
| Grupos de enlaces | Los cinco patrones de enlaces automáticos detectados. |
| Resto del histórico | Las 267 entradas restantes del WordPress, sin enlaces conocidos: 404/410. |
| Criterios | Definición de cada acción y de los niveles de confianza. |

Dos columnas de acción:

- **«Acción propuesta»**: el escenario recomendado (mjlopezz.com se mantiene como archivo).
- **«Si se migra el dominio»**: lo que habría que hacer si se aprueba la migración completa.

Las redirecciones se configurarían en el proyecto de **mjlopezz.com** (su `vercel.json`), no en automatizza.es. Reglas: 301 uno a uno solo hacia contenido equivalente publicado, sin cadenas, y nunca de forma masiva a la portada.

## Recomendación SEO, en resumen

No redirigir el dominio completo por ahora. El valor SEO comprobable es pequeño y está concentrado en pocas URL; los 878 dominios de la portada aparecieron después del compromiso del WordPress y no se han podido verificar; y la temática del archivo no coincide con la de Automatizza. El razonamiento completo y las condiciones para reconsiderarlo están en `04-seo/INFORME_SEO.md`.

## Lo que no incluye el paquete

No incluye bases de datos, SQL, archivos PHP, credenciales, copias de seguridad, archivos del WordPress antiguo ni documentación interna del proyecto mjlopezz.com.

## No hacer sin autorización expresa

- Publicar contenidos.
- Activar redirecciones en cualquiera de los dos dominios.
- Cambiar DNS o Search Console.
- Publicar en producción los artículos de `02-historico/` o recuperar los de `03-historico-adicional/`.


## Anexo — versión de entrega con ilustraciones nuevas

Esta versión del paquete **sustituye** las instrucciones anteriores que proponían reutilizar los 20 JPEG antiguos. **No se incluyen esos JPEG**: tenían licencias no documentadas.

- Se proporcionan **19 ilustraciones originales WebP**, una para cada artículo (6 del blog actual y 13 del histórico).
- Cada artículo actual incluye `imagen-portada.webp`, con alt definido en `ficha.md`. Incluir como portada/card del blog.
- Cada artículo histórico incluye su nueva ilustración dentro del Markdown. Las imágenes del artículo original se describen en notas, sin reproducir sus archivos.
- Las ilustraciones del histórico son actuales y simbólicas, no evidencias fotográficas de hechos pasados ni reproducciones de tablas/datos.
- Ningún documento debe presentar cifras, nombres o fotografías que no estén respaldados por los textos originales.
- **Publicación:** Eva puede integrar directamente los archivos y preparar el despliegue, pero debe comprobar visualmente el resultado y validar las URL finales antes de activar las redirecciones externas.
- **SEO:** mantener el escenario de migración sin ejecutar. Los 13 artículos siguen en mjlopezz.com hasta la coordinación de publicación y 301 uno a uno.
