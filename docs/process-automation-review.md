# Primera página de servicio: revisión local

Actualización: 2026-10-26. Rama: `codex/process-automation-page`.
Base: `origin/main` incorporado en `1b1b2fa`, con los datos estructurados y la CSP efectiva ya publicados. No se han integrado ni desplegado estos cambios.

## Alcance — acabado y entradas sutiles

- Nueva página española `/servicios/automatizacion-de-procesos`, con el contenido aprobado, un único H1, cuatro ejemplos, cuatro pasos, el caso de Silos Spain y cuatro preguntas en acordeón nativo.
- Reutiliza cabecera, footer, contenedor editorial, fuentes, colores, botones y estilos del acordeón existente. Incorpora únicamente la foto original adjunta del equipo de Silos Spain, sin recortar personas ni retocar el archivo. Las entradas reutilizan la curva y el lenguaje de movimiento editorial de la portada mediante un componente acotado a esta página, sin cambiar el movimiento de la home.
- Cabecera proporcionada como la del proyecto de Silos Spain: retorno a `/#servicios`, etiqueta «SERVICIOS / AUTOMATIZACIÓN» y un único H1, sin el anterior segundo titular.
- Hero conservado, con más separación antes de los ejemplos.
- Tareas en dos columnas en escritorio y una en móvil, con textos de anchura limitada y separación entre filas. Se retira el ejemplo de recorrido, conservando únicamente los cuatro tipos de tareas.
- Silos Spain tiene un bloque propio con fondo suave: foto completa de hasta 360 px a la izquierda y texto a la derecha; ambos se apilan en móvil. Pie semántico de 12 px: «Con el equipo de Silos Spain en la fábrica». El archivo y sus proporciones no se modifican. Título: «Así lo aplicamos en Silos Spain».
- «Cómo lo ponemos en marcha»: escalera ascendente de cuatro columnas en escritorio, con círculos numerados y conexiones azules finas. Conserva las explicaciones aprobadas en HTML. Por debajo de 1000 px pasa a una lista vertical conectada, sin comprimir el texto ni crear scroll lateral.
- Se elimina el bloque «Tu equipo mantiene el control». Las FAQ recuperan el fondo gris suave `#f8f9fb`; se mantienen sus preguntas, acordeón y cierre.
- Orden: hero, tareas, caso real, pasos en escalera, FAQ y cierre.
- Enlace subrayado en «Automatización» de la portada española. Se conserva `#servicios` y el resto del bloque.
- Ambos CTA llevan a `/contacto`; el caso enlaza a `/proyectos/silos-spain`. No hay otro formulario.
- El mantenimiento se acuerda por proyecto, como indica el borrador; no se añaden compromisos, resultados ni precios.

La URL anterior `/automatizacion-de-procesos` no se había publicado: devolvía HTTP 404 en producción y solo existía en la rama local. Se sustituye sin alias ni redirección. No se crea `/servicios`; el menú continúa apuntando al bloque de portada.

## Idiomas y SEO

La ruta se registra en la arquitectura multilingüe con una única versión disponible: español. El selector muestra únicamente Español en esta página; las demás páginas conservan sus cuatro opciones. Las portadas traducidas no enlazan silenciosamente al servicio español.

Title y description coinciden con los solicitados. Canonical: `https://automatizza.es/servicios/automatizacion-de-procesos`. Alternativas únicamente `es` y `x-default`, ambas a la propia página española. No se generan URLs traducidas.

El sitemap de una build de producción incluye la nueva página completa: 21 URLs comerciales y 102 referencias de idioma. Los previews mantienen sitemap vacío y `noindex, nofollow`. No se altera la configuración de hosts, redirecciones ni acceso a previews. Las páginas legales siguen fuera del sitemap y con noindex. No se añade FAQPage ni se duplica el grafo corporativo existente.

## Comprobaciones realizadas

- `npm run lint`: correcto.
- `npm run test:contact`: 23 pruebas correctas, sin correos reales.
- `npm run test:analytics`: 25 pruebas correctas, incluida la nueva ruta: sin medición al denegar, una visita por navegación, publicidad denegada y conversión una sola vez tras éxito confirmado y con consentimiento.
- `npm run test:i18n`: 8 pruebas correctas; contempla equivalentes parcialmente publicados.
- `npm run test:security`: 9 pruebas correctas, con la CSP de main conservada.
- `npm run test:structured-data`: 5 pruebas correctas; se conservan relaciones, identificadores y LinkedIn del nodo Brand.
- `npm run test:seo`: builds optimizadas y TypeScript correctos en producción y preview; 140 escenarios HTTP/página correctos. Verifica metadatos y contenido en HTML inicial, sitemap, alternates, cabeceras, enlaces, 404 de traducciones inexistentes, del índice `/servicios` y de la ruta antigua, y redirección de barra final. Verifica también el orden de los bloques y la ausencia del ejemplo de recorrido y del bloque de control en el HTML inicial. Las nuevas explicaciones y el pie de foto se han comprobado además en la respuesta HTML sin ejecutar JavaScript.
- Revisión de composición del 26/10: escritorio 1440 px, tablet 768 px y móvil 390/320 px, sin desbordamientos horizontales. Revisados el enlace de la portada, navegación móvil, Silos Spain y CTA a contacto.
- Foto: original JPEG 598 × 454, idéntico al archivo adjunto; URL pública y optimizador local responden HTTP 200. Proporción completa conservada en escritorio y móvil.
- Acordeón: cerrado inicialmente; Enter y Espacio permiten abrir y cerrar varias respuestas simultáneamente, con foco visible. Preguntas y respuestas presentes en el HTML inicial.
- Selector: solo Español en la nueva página; cierre con Escape conservado.

## Movimiento y contenido sin JavaScript

- `ProcessAutomationMotion` usa IntersectionObserver, sin manejadores de scroll,
  bucles ni parallax. Cada elemento deja de observarse tras su primera entrada.
- Misma curva editorial `cubic-bezier(.22,.7,.25,1)` que la portada: 850 ms y
  6 px de desplazamiento. La escalera conserva intervalos de 140 ms (máximo
  420 ms). Las entradas no cambian la altura de las secciones.
- Sin fundidos: la opacidad permanece en 1 antes, durante y después de la
  entrada. El HTML y CSS parten de contenido visible, sin `motion-ready`.
- Los bloques ya visibles al iniciar la página quedan estáticos. Solo se
  preparan con 6 px de desplazamiento los elementos situados bajo el viewport;
  al entrar vuelven suavemente a su posición. Si JavaScript se interrumpe,
  el contenido preparado sigue siendo visible, sin estados de ocultación.
- En escritorio la escalera espera a que su primer peldaño inferior sea visible
  y revela los cuatro pasos del 01 al 04; en móvil cada fila entra al aparecer.
  El título entra por separado, evitando animaciones superpuestas del contenedor.
- `prefers-reduced-motion` evita las entradas; activarlo durante una animación
  cancela las animaciones activas y la observación. La limpieza al salir de la
  página cancela también los efectos pendientes.
- Comprobaciones aisladas del efecto: preferencia reducida, APIs no disponibles,
  secuencia única, cancelación al cambiar preferencia y al desmontar correctas.
- Navegador con scripts bloqueados mediante una cabecera de un proxy de prueba
  exclusivamente local: todos los bloques con opacidad 1 y sin transformación;
  el acordeón sigue abriéndose mediante teclado. No cambia la CSP del proyecto.
- Escritorio 1440 px y móviles 390/320 px revisados, sin desbordamientos ni
  errores de consola. Lint, builds y 140 escenarios HTTP/SEO correctos; regresión
  de contacto (23), analítica (25) y seguridad (9) sin fallos ni envíos reales.

## Ajustes previos de perceptibilidad (historial)

La comprobación del navegador confirmó que la primera versión sí se activaba,
pero el fundido desde 0,55 y los 4–6 px resultaban poco perceptibles. Se añade
entrada al hero y se ajustan fundido, desplazamiento e intervalos indicados arriba.
Se retira el párrafo introductorio de «¿Dónde se puede reducir el trabajo manual?»
y se ralentizan las entradas (850 ms por bloque y 720 ms por paso) para evitar
una sensación de aparición brusca. El observador exige un 15 % de intersección y un margen inferior del 5 %, para
no consumir la entrada demasiado pronto.

Verificación real mediante instrumentación temporal exclusiva de la copia local:
keyframes, duración, intervalo e iteración única de hero y cuatro pasos correctos.
Tras subir y bajar de nuevo, cada paso conserva una sola ejecución. La copia
local se restaura sin instrumentación después de comprobarlo. Evidencia en
`motion-runtime-verification.json`, junto a las capturas de la revisión.
No se cambian la CSP, las preferencias de movimiento ni la composición.

## Revisión de la escalera

- Revisada en 1440 y 1000 px con cuatro peldaños ascendentes; en 390 y 320 px
  con recorrido vertical. Sin desbordamientos. Círculos y conectores decorativos;
  el orden y contenido se mantienen en una lista numerada accesible.
- Ejecución real en el navegador: cuatro animaciones de 850 ms, intervalos
  0/140/280/420 ms y una iteración por paso. Instrumentación temporal retirada
  de la copia local tras comprobarlo.
- Comprobaciones aisladas de espera al primer paso, orden único 01–04, entradas
  móviles, movimiento reducido y cancelación al desmontar/cambiar preferencia
  correctas. Lint y builds optimizadas correctos; 140 escenarios HTTP/SEO pasan.
- No cambia el resto de la composición, los textos, metadatos, formulario,
  consentimiento, analítica ni CSP. Sin integración ni despliegue.

## Corrección del parpadeo

El fundido empezaba desde opacidad 0 sobre contenido que ya se había pintado,
lo que podía hacerlo desaparecer y reaparecer al entrar. Se elimina la animación
de opacidad. Tampoco se reinician bloques que ya están visibles al cargar.
Se preparan únicamente los bloques fuera de pantalla y se restauran sus estilos
antes de animar, evitando saltos al terminar o cancelar el movimiento.

Comprobado en el navegador: hero estático con opacidad 1; pasos preparados con
opacidad 1 y desplazamiento de 6 px; durante la secuencia un paso muestra un
desplazamiento intermedio de 4,86 px y opacidad 1. Sin errores de consola.
Comprobaciones aisladas correctas para contenido visible intacto, secuencia,
cancelación y restauración de los estilos pendientes con movimiento reducido.
Lint, builds y 140 escenarios HTTP/SEO correctos. Sin integración ni despliegue.

## Revisar

Vista local: http://127.0.0.1:3007/servicios/automatizacion-de-procesos

La vista usa una copia aislada, con envío de contacto y medición real desactivados. No cambia las variables locales del proyecto ni la configuración publicada. Capturas de esta revisión: `staircase-desktop.jpg` y `staircase-mobile.jpg`, en el directorio local de evidencias `process-automation-review`. Se han verificado dos FAQ abiertas simultáneamente mediante Enter/Espacio y foco visible. No se han enviado formularios reales ni publicado cambios.

Pendiente: revisión visual del propietario y autorización para integrar/publicar. Las traducciones del servicio quedan para otra fase; no hay enlaces a versiones pendientes.

## Simplificación del bloque de tareas

Se elimina «Un ejemplo de recorrido» de «¿Dónde se puede reducir el trabajo
manual?», incluidos sus estilos y el código de animación exclusivo de ese
ejemplo. Permanecen las cuatro tareas, el caso de Silos Spain, la escalera
animada de puesta en marcha, FAQ y cierre. Sin integración ni despliegue.
