# Primera página de servicio: revisión local

Actualización: 2026-10-26. Rama: `codex/process-automation-page`.
Base: `origin/main` incorporado en `1b1b2fa`, con los datos estructurados y la CSP efectiva ya publicados. No se han integrado ni desplegado estos cambios.

## Alcance — revisión final de contenido y acabado

- Nueva página española `/servicios/automatizacion-de-procesos`, con el contenido aprobado, un único H1, cuatro ejemplos, cuatro pasos, el caso de Silos Spain y cuatro preguntas en acordeón nativo.
- Reutiliza cabecera, footer, contenedor editorial, fuentes, colores, botones y estilos del acordeón existente. Incorpora únicamente la foto original adjunta del equipo de Silos Spain, sin recortar personas ni retocar el archivo. No introduce nuevas animaciones.
- Cabecera proporcionada como la del proyecto de Silos Spain: retorno a `/#servicios`, etiqueta «SERVICIOS / AUTOMATIZACIÓN» y un único H1, sin el anterior segundo titular.
- Esquema accesible y estático, identificado como ejemplo: Solicitud recibida → Registro en el CRM → Responsable asignado → Revisión del equipo, con una explicación breve bajo cada título; vertical en móvil.
- Hero conservado, con más separación antes de los ejemplos.
- Tareas en dos columnas en escritorio y una en móvil, con textos de anchura limitada y separación entre filas. El esquema se integra debajo, con la etiqueta «Un ejemplo de recorrido», sin borde ni fondo.
- Silos Spain tiene un bloque propio con fondo suave: foto completa de hasta 360 px a la izquierda y texto a la derecha; ambos se apilan en móvil. Pie semántico: «Con el equipo de Silos Spain en la fábrica». El archivo y sus proporciones no se modifican. Título: «Así lo aplicamos en Silos Spain».
- «Cómo lo ponemos en marcha»: cuatro pasos en lista vertical, con las explicaciones finales aprobadas en voz «tu equipo», dentro de un contenedor de 820 px como máximo. Las filas se adaptan al contenido, sin alturas fijas.
- «Tu equipo mantiene el control»: un único párrafo sobre blanco, título secundario más contenido y separación propia para evitar un bloque alto. FAQ y cierre sin cambios.
- Orden: hero, tareas y recorrido, caso real, pasos, revisión humana, FAQ y cierre.
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
- `npm run test:seo`: builds optimizadas y TypeScript correctos en producción y preview; 140 escenarios HTTP/página correctos. Verifica metadatos y contenido en HTML inicial, sitemap, alternates, cabeceras, enlaces, 404 de traducciones inexistentes, del índice `/servicios` y de la ruta antigua, y redirección de barra final. Verifica también el orden de los bloques, el esquema y el único párrafo del bloque de control en el HTML inicial. Las nuevas explicaciones y el pie de foto se han comprobado además en la respuesta HTML sin ejecutar JavaScript.
- Revisión de composición del 26/10: escritorio 1440 px, tablet 768 px y móvil 390/320 px, sin desbordamientos horizontales. Revisados el enlace de la portada, navegación móvil, Silos Spain y CTA a contacto.
- Foto: original JPEG 598 × 454, idéntico al archivo adjunto; URL pública y optimizador local responden HTTP 200. Proporción completa conservada en escritorio y móvil.
- Acordeón: cerrado inicialmente; Enter y Espacio permiten abrir y cerrar varias respuestas simultáneamente, con foco visible. Preguntas y respuestas presentes en el HTML inicial.
- Selector: solo Español en la nueva página; cierre con Escape conservado.

## Revisar

Vista local: http://127.0.0.1:3007/servicios/automatizacion-de-procesos

La vista usa una copia aislada, con envío de contacto y medición real desactivados. No cambia las variables locales del proyecto ni la configuración publicada. Capturas de esta revisión: `content-final-desktop.jpg` y `content-final-mobile.jpg`, en el directorio local de evidencias `process-automation-review`. Se han verificado dos FAQ abiertas simultáneamente mediante Enter/Espacio y foco visible. No se han enviado formularios reales ni publicado cambios.

Pendiente: revisión visual del propietario y autorización para integrar/publicar. Las traducciones del servicio quedan para otra fase; no hay enlaces a versiones pendientes.
