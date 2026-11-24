# Paquete de contenidos · Blog de Automatizza · Fase 1

Para Eva y para Codex. Este paquete contiene seis artículos preparados para el futuro blog de automatizza.es, escritos a partir del archivo histórico de mjlopezz.com.

> **Estado:** versión final revisada y aprobada por María José López el 22-11-2026, pendiente de maquetación y publicación. Nada de esto está publicado y automatizza.es no se ha modificado.

## Decisiones editoriales

- **Autoría pública:** María José López. La plantilla del blog debe mostrar su nombre como autora.
- **Fecha pública:** la fecha real de publicación en Automatizza. No usar la fecha del artículo original.
- **Orden de publicación:** 1) CRM conectado, 2) automatización preventiva, 3) datos y cuadros de mando, 4) PWA, 5) nube para pymes, 6) analítica web cualitativa.
- **Imágenes:** crear las seis imágenes nuevas descritas en las fichas.
- **Redirecciones:** no se activa ninguna desde mjlopezz.com.

## Contenido

```
entrega-automatizza/
├── README.md                  ← este archivo
├── INDICE_EDITORIAL.md        ← los seis artículos, orden de publicación, enlaces cruzados y datos que caducan
├── HOJA_DE_RUTA_FASE2.md      ← los otros seis temas aprobados, para una segunda fase
├── articulos/
│   ├── 01-aplicaciones-web-progresivas/
│   │   ├── articulo.md        ← texto publicable con metadatos en el front matter
│   │   └── ficha.md           ← origen, imagen, enlaces internos, SEO y comprobaciones
│   ├── 02-analitica-web-cualitativa/
│   ├── 03-datos-y-cuadros-de-mando/
│   ├── 04-automatizacion-preventiva/
│   ├── 05-crm-conectado/
│   └── 06-nube-para-pymes/
└── seleccion/
    └── automatizza_seleccion_historico.xlsx   ← análisis y selección de los artículos históricos
```

## Formato de los artículos

Cada `articulo.md` empieza con un bloque YAML:

| Campo | Uso |
|---|---|
| `titulo` | Título visible (H1). El cuerpo lo repite como `# …`; quitar uno de los dos según cómo pinte el H1 la plantilla del blog. |
| `slug` | Propuesta de slug. Automatizza no tiene todavía blog (`/blog` devuelve 404), así que la ruta completa la decide Eva. |
| `meta_title` | Título SEO, con « \| Automatizza» al final. Ajustarlo si la plantilla ya añade el nombre del sitio. |
| `meta_description` | Descripción SEO, de 150 a 160 caracteres. |
| `autoria` | Autora pública: María José López. |
| `fecha_publicacion` | Recordatorio: la fecha pública es la de publicación real en Automatizza. |
| `orden_publicacion` | Posición del artículo en el calendario (1 a 6). |
| `estado`, `fecha_preparacion`, `tratamiento`, `origen` | Metadatos editoriales. **No son para publicar**; pueden descartarse al importar. |

El cuerpo es Markdown estándar: H1, H2, H3, listas y un apartado final **«Fuentes»**, que debe publicarse con el artículo. Las URL de las fuentes aparecen en texto plano y pueden convertirse en enlaces.

No hay HTML incrustado, imágenes ni enlaces internos en el texto. Las imágenes y los enlaces internos están en la `ficha.md` de cada artículo, para insertarlos al maquetar.

## Imágenes

Ninguna imagen del archivo histórico es reutilizable: su origen o su licencia no constan, o pertenecen a terceros (por ejemplo, portadas de libros). Cada ficha incluye un encargo para crear una imagen nueva coherente con la guía de marca de Automatizza:

- Ilustración lineal o geométrica, sin sombras pesadas ni degradados.
- Colores de la paleta: azul marino `#002B49` y azul acero `#4A9CC5`, sobre fondo blanco o `#F4F6FA`.
- Sin logotipos de terceros y sin recrear el logotipo de Automatizza.
- Texto alternativo propuesto en cada ficha.

## Enlaces internos

Solo se proponen páginas que existen hoy en automatizza.es (comprobadas el 22-11-2026):

- `/servicios/automatizacion-de-procesos`
- `/servicios/software-a-medida`
- `/servicios/inteligencia-artificial-para-empresas`
- `/proyectos/silos-spain`
- `/proyectos/apc`
- `/proyectos/la-factory-coworking`
- `/calculadora`
- `/contacto`

No se ha inventado ninguna URL. El servicio de «Desarrollo web» no tiene página propia (enlaza a `/contacto`).

Los textos citan dos proyectos de Automatizza, Silos Spain y APC Europe, solo con lo que ya describe su página en automatizza.es. Aparecen siempre en un párrafo aparte, «Un proyecto real», separados de los ejemplos ilustrativos.

## URL históricas y redirecciones

**Decisión: no se activa ninguna redirección desde mjlopezz.com.** Las URL históricas de los seis artículos seguirán devolviendo 404 en mjlopezz.com. No hay que configurar nada en automatizza.es por este motivo.

## Comprobaciones antes de publicar

1. Revisar la lista «Antes de publicar» de cada ficha.
2. Comprobar en un navegador los enlaces que bloquean accesos automáticos: Contentsquare (artículo 2), Iberdrola (4) y DLA Piper (6).
3. Revisar las fechas que caducan, indicadas en `INDICE_EDITORIAL.md`.
4. Que la plantilla del blog incluya fecha de publicación y autoría.
5. Que el apartado «Fuentes» se publique.

## Criterios editoriales aplicados

- Los artículos 1 y 2 actualizan y corrigen el texto original. Los artículos 3 a 6 están escritos de nuevo y usan el original solo como punto de partida.
- Información técnica y normativa comprobada en noviembre de 2026, con su fuente.
- Los ejemplos hipotéticos se identifican como tales al comienzo de cada apartado de ejemplos. Los únicos proyectos reales citados son los que Automatizza ya publica, en un párrafo aparte.
- Las cifras se interpretan sin conclusiones que no demuestran: base de cada porcentaje, alcance y límites de comparabilidad.
- Las capacidades técnicas y las obligaciones normativas se presentan con sus condiciones y excepciones.
- Sin contenido copiado de terceros. Las ideas ajenas se resumen con palabras propias y se citan.
- Escrito para responsables de pymes, sin menciones forzadas a Automatizza.

## Lo que no incluye este paquete

No incluye bases de datos, copias de seguridad, credenciales, archivos del antiguo WordPress ni documentación interna del proyecto mjlopezz.com.
