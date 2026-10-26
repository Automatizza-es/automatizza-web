# Servicios: automatización multilingüe y software a medida

Estado: preparado para revisión local, 2026-10-26.
Rama: `codex/services-multilingual-software`, creada desde el trabajo aprobado
`a12ac62`, conservando su historial. `origin/main` comprobado al terminar:
`1b1b2fa` (CSP efectiva), ya incluido en la rama. Sin merge, push ni despliegue.

## Entrega por fases

1. Automatización traducida y validada primero; commit `c897116`.
2. Software a medida preparado después, reutilizando el recorrido, FAQ,
   movimiento, hero, contenedor editorial y estilos del servicio aprobado.
   No se vuelve a modificar el componente ni el CSS de Automatización en esta fase.

| Idioma | Automatización | Software a medida |
| --- | --- | --- |
| Español | `/servicios/automatizacion-de-procesos` | `/servicios/software-a-medida` |
| English | `/en/services/process-automation` | `/en/services/bespoke-software` |
| Français | `/fr/services/automatisation-des-processus` | `/fr/services/logiciel-sur-mesure` |
| Português (Portugal) | `/pt/servicos/automatizacao-de-processos` | `/pt/servicos/software-a-medida` |

Vista de revisión: añadir cualquiera de esas rutas a `http://127.0.0.1:3007`.
La copia local está aislada, con medición y envío real de contacto desactivados;
no se cambian credenciales ni interruptores de activación del proyecto.

## Contenido y composición

Software tiene un único H1 y conserva la introducción solicitada. Explica cuándo
valorar una aplicación propia, considerando primero las herramientas disponibles.
Incluye cuatro usos concretos, dos ejemplos editoriales (La Factory Coworking y
APC Europe), cuatro pasos en el recorrido compartido, cinco FAQ nativas y CTA al
contacto del idioma activo. Los enlaces a proyectos mantienen también el idioma.

Los ejemplos son filas tipográficas con jerarquía y un fondo suave común, sin
repetir las tarjetas de la home. No se añade una foto, una reserva vacía de espacio
ni un recurso provisional: cuando se aporte la fotografía real de Mireia/equipo,
se podrá incorporar al caso de La Factory. No es un bloqueo para revisar la página.

No se prometen precios, plazos, compatibilidad universal ni soporte indefinido.
Alcance, integraciones, costes recurrentes y mantenimiento se acuerdan por proyecto.

Los H2 de Software comparten tamaño (34 px en 1440; 28 px en móvil), peso 700 y
alineación del contenedor (x=120 en 1440; x=16 en 390). Los usos están en dos columnas
en escritorio; el contenido y el recorrido se apilan en móvil. Las únicas entradas
son las ya aprobadas: 6 px, 850 ms, sin fundido, sin bucles ni parallax, con
`prefers-reduced-motion`. El contenido no depende de JavaScript para ser legible.

## Integración y SEO

- Registro único de rutas; español sin prefijo y sin cambiar la barra final.
- Selector existente con enlaces reales a los cuatro equivalentes completos.
- Servicios de portada: Automatización y Software enlazan a su página localizada.
  La navegación de Servicios conserva el ancla de portada; no se crea `/servicios`.
- Metadatos y traducciones en el HTML inicial; canonical propio por página en
  `https://automatizza.es`, alternates recíprocos `es`, `en`, `fr`, `pt-PT` y
  `x-default` a su equivalente español.
- Sitemap de producción: 28 páginas comerciales y 140 referencias de idioma,
  solo URLs completas e indexables. Legal continúa con noindex y fuera del sitemap.
- Preview: sitemap vacío, noindex y protecciones de hosts conservadas.
- Sin FAQPage ni nuevos bloques corporativos duplicados.
- Analítica: se registra únicamente el título de la nueva ruta en su lista pública;
  no cambia la lógica de consentimiento/eventos ni GTM, GA4, formulario o CSP.

## Validación completada

- `npm run lint`: correcto.
- `npm run test:i18n`: 10 pruebas; rutas directas, equivalentes, castellano intacto,
  catálogo completo y 56 textos de arrays de ejemplos/pasos/FAQ sin fallback.
- `npm run test:contact`: 23 pruebas, sin envíos reales ni llamadas a Resend real.
- `npm run test:analytics`: 26 pruebas. Ambos servicios y sus cambios de idioma
  respetan consentimiento, cargan un GTM, producen una visita por navegación y
  no convierten una visita, un clic o un error en un lead. Una conversión únicamente
  por éxito confirmado, con consentimiento, sin datos personales; publicidad denegada.
- `npm run test:structured-data`: 5 pruebas, identidad y relaciones conservadas.
- `npm run test:security`: 9 pruebas, CSP y protecciones intactas.
- `node --test tests/service-motion.test.mjs`: 4 pruebas del efecto compartido:
  movimiento reducido/APIs ausentes, contenido visible sin reinicio, secuencia
  única y limpieza de observadores/estilos al salir o retirar movimiento.
- `npm run test:seo`: builds optimizadas de producción y preview y TypeScript
  correctos; 154 escenarios HTTP/página. Verifica metadatos y traducciones SSR,
  respuestas FAQ en HTML, canonical, hreflang, sitemap, headers, enlaces internos,
  destinos traducidos, redirecciones y 404 de índices/alias inexistentes.
- Contraste del main español de Automatización con la copia aprobada: etiquetas,
  atributos y textos visibles exactamente iguales, incluida la imagen y el pie.
- Navegador: ambos servicios EN/FR/PT revisados en 1440 y 320 px; Software ES en
  1440/390 y FR en tablet 768. Sin desbordamiento horizontal. Escalera en cuatro
  columnas en escritorio y lista vertical en móvil. Revisados títulos, lectura,
  enlaces y selector real ES → EN → FR → PT conservando la página equivalente.
- FAQ: cerradas inicialmente; Enter y Espacio abren varias simultáneamente,
  respuestas legibles y foco de 2 px. Selector cierra con Escape y devuelve foco.
- Enlace real desde Servicios de la home inglesa a Software; enlace APC al proyecto
  inglés correcto. Sin errores de consola en la navegación revisada.

Capturas locales en el directorio de evidencias `services-review`:
`software-desktop.jpg`, `software-mobile.jpg`, `software-mobile-steps.jpg`,
`software-faq-desktop.jpg`, `software-pt-mobile.jpg`, `software-fr-tablet.jpg`,
`automation-en-desktop.jpg` y `automation-pt-mobile.jpg`.

Pendiente: revisión de contenido y composición por la propietaria, fotografía real
si se desea añadir, y autorización posterior de integración/publicación. No se ha
probado medición ni entrega real en producción en esta fase: no hay despliegue.


## Ajuste de «Cuando tus herramientas se quedan cortas»

Se sustituye únicamente el bloque de situaciones de Software: nuevo H2 con el
estilo existente, tres títulos breves con explicación en columnas iguales y
separadores verticales finos, sin tarjetas ni fondos. En móvil se apilan con
separadores horizontales. Debajo aparece una sola frase: «Antes de desarrollar,
valoramos si una herramienta existente puede resolverlo».

Los textos facilitados se adaptan a «tú / tu equipo / tu forma de trabajar» y se
traducen íntegramente a EN, FR y PT-PT. No cambian otras secciones, la página de
Automatización ni metadatos, rutas, consentimiento, analítica, formulario o CSP.

Lint y las 10 pruebas de idiomas pasan. Builds optimizadas de producción/preview
correctas; 154 escenarios HTTP/SEO verifican además los tres títulos y explicaciones
más la frase final en el HTML inicial. Revisión en navegador: 1440 px con tres
columnas, ES en 390 px y EN/FR/PT en 320 px con una columna; sin desbordamientos ni
errores de consola. H2 español: 34 px/peso 700/x=120 en escritorio; 28 px/x=16 en móvil.
Capturas: `software-needs-desktop.jpg` y `software-needs-mobile.jpg` en `services-review`.
Sin integración ni despliegue.
