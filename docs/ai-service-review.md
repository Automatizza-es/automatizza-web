# Servicio de inteligencia artificial — revisión local

Fecha: 26/10/2026. Rama: `codex/service-artificial-intelligence`, creada desde
`codex/services-multilingual-software` (`101484a`). Conserva todos los commits
pendientes de automatización y software a medida. Sin integración en `main`,
sin push, sin despliegue ni cambios en Vercel.

## Página y equivalentes

Revisión local en `http://127.0.0.1:3008`, con una build optimizada aislada,
formulario y medición real desactivados. Las restricciones del proyecto original
no cambian.

| Idioma | Ruta |
| --- | --- |
| Español | `/servicios/inteligencia-artificial-para-empresas` |
| English | `/en/services/artificial-intelligence-for-businesses` |
| Français | `/fr/services/intelligence-artificielle-pour-les-entreprises` |
| Português (Portugal) | `/pt/servicos/inteligencia-artificial-para-empresas` |

Reutiliza hero, contenedor, tipografías, botones, escalera, FAQ y movimiento de
los servicios aprobados. Presenta cuatro usos posibles; el único caso atribuido
a Silos Spain es el flujo de WhatsApp descrito en el contenido aprobado. No se
presentan reservas confirmadas, envíos de presupuesto, avisos comerciales ni
registros en CRM.

Las cinco FAQ explican límites, revisión humana, fuentes y permisos, alcance,
mantenimiento y costes recurrentes acordados por proyecto. No se prometen
precisión absoluta, soporte ilimitado ni tratamiento de datos uniforme.

## Conversación ilustrativa

- Guion aprobado, traducido íntegramente, sin importar ningún JSON de n8n.
- Mensajes, identidades de los interlocutores, resumen y aviso ilustrativo en HTML
  inicial. Sin JavaScript se lee todo y siguen funcionando las FAQ nativas.
- Panel neutro y verde suave; sin teléfono, controles de envío o falsa integración.
- Secuencia de 10 segundos, una sola vez al entrar, con dos indicadores breves de
  escritura. El resultado final permanece visible.
- Pausa/reanudación, repetición explícita y opción de mostrar todo. Los controles
  reservan su espacio; todas las filas conservan su tamaño durante la secuencia.
- Movimiento reducido: contenido completo y controles de animación ocultos.
  Cambiar esa preferencia cancela la secuencia y restaura el contenido.
- No hay región viva ni anuncios por cada mensaje. Las identidades de quien habla
  están disponibles para lectores de pantalla. Controles nativos con foco visible.
- No hay conexiones a WhatsApp, calendarios, IA ni n8n; no se recogen datos ni se
  emiten conversiones al interactuar con la pieza.

## SEO e integración

Registro único de equivalentes, metadatos traducidos, canonical propio y
hreflang recíprocos (`es`, `en`, `fr`, `pt-PT`, `x-default` español). Se conserva
la política de barra final, el español sin prefijo y el noindex de previews y
páginas legales. El sitemap incorpora las cuatro versiones completas: 32 páginas
comerciales y 160 referencias de idioma en producción; vacío en preview.

El título de Inteligencia artificial del bloque de servicios enlaza a su página
del idioma activo. La navegación de Servicios mantiene su ancla existente; no se
crea un índice `/servicios` ni se modifica el header. Solo se añade la ruta a la
lista de títulos públicos de medición. No cambia la lógica de consentimiento,
GTM/GA4, generación de leads, formulario, CSP ni datos estructurados.

## Validación

Todas las ejecuciones de este trabajo usan el binario oficial Node **24.22.1**
previamente verificado, seleccionado en el PATH de la sesión. No se integra la
rama de seguridad ni se modifica el Node global habitual.

- Lint correcto.
- Idiomas: 11 pruebas, incluyendo equivalentes y los 90 textos de arrays de los
  tres servicios y la conversación, sin fallback involuntario al español.
- Contacto: 23 pruebas, con proveedor simulado; ningún correo real enviado.
- Analítica: 26 pruebas, incluida navegación multilingüe de los tres servicios;
  una visita por navegación, GTM condicionado al consentimiento y un lead solo
  tras éxito confirmado del servidor y con consentimiento. Publicidad denegada.
- Datos estructurados: 5 pruebas. CSP y seguridad: 9 pruebas.
- Movimiento compartido: 4 pruebas. Conversación: 6 pruebas de entrada única,
  sincronización, pausa/reanudación, repetición, finalización, limpieza,
  movimiento reducido, APIs ausentes y fallback ante error.
- Builds de producción y preview, TypeScript y 162 escenarios HTTP/SEO correctos:
  HTML inicial, metadatos, enlaces localizados, FAQ, canonical, hreflang, sitemap,
  códigos HTTP, redirecciones, protección de hosts y cabeceras existentes.
- Revisión con Chromium sobre la build optimizada: ES/EN/FR/PT en escritorio
  (1440 px), móvil (390 px) y anchura estrecha (320 px), sin desbordamiento.
  Controles de conversación y FAQ con teclado, selector ES → EN → FR → PT,
  movimiento reducido y acceso sin JavaScript comprobados.
- Sin errores de JavaScript, peticiones de GTM/GA4 ni infracciones CSP observadas
  durante esa revisión local. No equivale a una prueba de integraciones reales
  en producción: no se han publicado estos cambios.

Capturas, grabación MP4 de 10,8 segundos y evidencia de navegador en:
`/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/ai-service-review/`.

Archivos principales de evidencia: `ai-desktop-hero.png`, `ai-desktop-full.png`,
`ai-desktop-case-section.png`, `ai-mobile-full.png`, `ai-mobile-case-section.png`,
`ai-mobile-no-js.png`, `ai-conversation.mp4` y `browser-checks.json`.

Pendiente: revisión de contenido y acabado por la propietaria. Cualquier
integración o publicación requiere una instrucción posterior.
