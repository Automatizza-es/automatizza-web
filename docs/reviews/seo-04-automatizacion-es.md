# SEO-04 · Automatización de procesos · Solo español

Rama nueva desde `main` (`a068cd6`). Objetivo: aplicar la propuesta comercial aprobada a `/servicios/automatizacion-de-procesos`, conservando diseño y SEO técnico.

## Contenido de la vista previa

- Title: «Automatización de procesos empresariales | Automatizza».
- Description: «Automatizamos solicitudes, presupuestos, documentos y seguimientos. Conectamos tus herramientas y definimos qué tareas requieren revisión de tu equipo.»
- H1: «Automatización de procesos empresariales.»
- Mismos cuatro ejemplos y cuatro pasos, con los textos de solicitudes, presupuestos/documentos, seguimientos y conexiones aprobados.
- Seis FAQ: herramientas existentes; diferencias entre automatización/software/IA; alcance; presupuesto; fallos y mantenimiento; estimación con la calculadora.
- Silos continúa como único caso destacado, con su misma fotografía, pie, botón y componente. Las referencias a APC y La Factory son una frase con enlaces dentro del bloque existente.

## Evidencia de los casos

- CRM de Silos: solicitudes, contactos, oportunidades y presupuestos documentados en `projectDetails.ts` y la página real del proyecto.
- Agente de WhatsApp y flujo de reuniones mediante calendario: documentados en la página publicada de IA, `AiServicePage.tsx`. No se añaden funciones, resultados, ahorros ni automatismos autónomos no descritos.
- APC Europe: viajes y recogidas. La Factory: reservas. Se identifican expresamente como procesos digitalizados, sin atribuirles automatizaciones concretas.

## Descripción de la calculadora actual

Se ha contrastado la respuesta con `SavingsCalculator.tsx`, sin modificarlo. La herramienta usa personas, horas diarias por persona, días laborables mensuales, coste medio por hora y un porcentaje de tiempo recuperable que introduce el usuario como hipótesis. El valor anual se obtiene multiplicando por 12 meses; las horas anuales usan la misma carga de trabajo y el mismo porcentaje.

La FAQ enumera esas cinco entradas y aclara que la estimación anual supone una carga constante, no es un presupuesto ni un ahorro garantizado y no incluye implantación, mantenimiento ni licencias. No se atribuye a la calculadora una evaluación automática de viabilidad ni un cálculo de retorno neto.

## Criterio comercial y conservación

El análisis, las pruebas y la puesta en marcha se limitan al alcance y los casos acordados, siguiendo el criterio aprobado para software. El soporte y mantenimiento se concretan por proyecto. No se fijan precios, plazos, SLA, resultados ni condiciones de atención.

Se conservan los componentes, clases, identificadores, tipografías, imagen y animaciones. Los textos más amplios aumentan la longitud del contenido dentro de esos bloques; no se añade otro diseño. Se mantienen los enlaces de SEO-02/03 a contacto, Silos, software, IA y calculadora, y se incorporan enlaces naturales a los otros casos y entre los servicios.

La nueva copia y metadata son exclusivas de ES. EN, FR y PT conservan texto completo, enlaces y metadata anteriores, verificados mediante snapshots del HTML publicado. No se cambian URL, canonical, hreflang, robots, sitemap, otras páginas, calculadora, Analytics ni eventos.

Pendiente de revisión final de esta vista previa. No fusionar ni publicar en producción sin aprobación.
