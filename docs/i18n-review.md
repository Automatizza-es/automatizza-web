# Automatizza multilingüe — revisión local

Trabajo preparado en `codex/multilingual-site`, basado en `main`.
Sin push, integración ni despliegue. Las comprobaciones «production» de los tests
se ejecutan contra builds y servidores locales aislados, no contra Vercel.

## Rutas y contenido

| Página | Español | English | Français | Português (Portugal) |
| --- | --- | --- | --- | --- |
| Portada | `/` | `/en` | `/fr` | `/pt` |
| Contacto | `/contacto` | `/en/contact` | `/fr/contact` | `/pt/contacto` |
| Silos Spain | `/proyectos/silos-spain` | `/en/projects/silos-spain` | `/fr/projets/silos-spain` | `/pt/projetos/silos-spain` |
| APC Europe | `/proyectos/apc` | `/en/projects/apc` | `/fr/projets/apc` | `/pt/projetos/apc` |
| La Factory Coworking | `/proyectos/la-factory-coworking` | `/en/projects/la-factory-coworking` | `/fr/projets/la-factory-coworking` | `/pt/projetos/la-factory-coworking` |

Se conserva la política de Next.js sin barra final en páginas distintas de `/`.
Por tanto, `/en/`, `/fr/` y `/pt/` normalizan a `/en`, `/fr` y `/pt` con 308;
los canonical, enlaces, hreflang y sitemap usan directamente las URLs finales.
No existe `/es`, ni redirección de la raíz, ni selección automática por IP,
país, idioma del navegador o una preferencia anterior.

Los índices de proyectos siguen siendo redirecciones al bloque de proyectos de
su portada correspondiente. No se han creado páginas de servicios.

Las vistas y componentes se comparten; los grupos de rutas permiten generar
`html lang` en el servidor sin detección del navegador ni cambios posteriores a
la hidratación. El catálogo contiene 366 mensajes con traducciones a inglés,
francés y portugués de Portugal. El español conserva los textos originales.
Incluye FAQ, demostraciones HTML, calculadora, textos accesibles, campos,
validaciones, estados del formulario y panel de cookies.
Las grabaciones e imágenes originales de los proyectos se mantienen; no se han
inventado capturas traducidas de los productos.

El selector usa enlaces reales a equivalentes, muestra ES/EN/FR/PT y conserva la
página al cambiar de idioma. Los enlaces internos siguen el idioma de la URL.
No se guarda una preferencia capaz de sustituir el idioma indicado por la URL.

## Actualización legal — 23 de octubre de 2026

Tras la entrega inicial, la titular ha solicitado traducir privacidad, cookies
y aviso legal y publicarlos directamente desde `main` para revisión posterior.
Las nueve traducciones y sus URLs están en [la guía del revisor](legal-translations-review.md).
Conservan los datos y condiciones de la versión española aprobada; el texto
español visible sigue idéntico y se reutilizan tres vistas compartidas.

Las doce páginas legales conservan su noindex y siguen fuera del sitemap y de
hreflang. Selector, footer, formulario y enlaces internos permiten acceder al
equivalente legal del idioma activo. La revisión lingüística del revisor sigue
pendiente; no se registra como completada ni se altera la aprobación española
o las condiciones de activación del formulario.

## SEO, consentimiento y formulario

- Veinte páginas comerciales generadas, con texto y metadatos en el HTML inicial.
- Canonical propio con `https://automatizza.es`; hreflang recíprocos es/en/fr/pt-PT,
  incluida la propia página y x-default español equivalente.
- Sitemap con veinte URLs finales y sus alternates; sin legales, alias ni 404.
- Noindex y redirecciones de dominios conservados; previews sin indexación.
- Un solo GTM, sin GA4 adicional. Consentimiento y expiración compartidos entre
  idiomas; publicidad denegada y retirada con borrado de cookies conservada.
- La lista de páginas permitidas en analítica incluye las nuevas rutas; no
  admite URLs arbitrarias, consultas ni datos del usuario.
- Un page_view por navegación, sin duplicados por renderizado o cambio de idioma.
- `generate_lead` mantiene `form_id=contact` y el evento de éxito existente:
  solo después de éxito confirmado por el servidor, con consentimiento, sin
  datos personales y sin repetición de la misma solicitud.
- API, proveedor, destinatarios, verificación de dominio, antispam, límites,
  idempotencia y condiciones de activación del formulario no se modifican.

## Comprobaciones realizadas

- Lint y build correctos; builds independientes de producción y preview.
- 23 pruebas de contacto, 23 de analítica y 6 de internacionalización: 52 pasan.
- Auditoría SEO ampliada: 106 escenarios HTTP/página pasan.
- Navegación y selector comprobados en escritorio, móvil de 390 px y cabecera de
  320 px; Escape, Enter, foco visible, menú móvil y página equivalente.
- Cambio real de APC Europe EN a APC Europe FR y posterior contacto FR.
- Panel de cookies PT: textos traducidos, estadísticas desmarcadas tras rechazo,
  necesarias activas y ausencia de GTM sin consentimiento.
- Calculadora FR: al pasar de 30 % a 35 %, valor mensual 1 155 €, anual 13 860 €;
  vuelta a 30 %. Formatos locales y distinción entre valor y ahorro conservados.
- Textos visibles españoles contrastados con las cinco páginas de producción:
  coinciden, exceptuando el nuevo selector y el estado de disponibilidad del
  formulario local, que carece de credenciales de envío.
- Revisión de los quince HTML traducidos: idioma correcto y sin mensajes
  conocidos pendientes de traducir, incluidas las siete FAQ completas.
- Favicon, iconos y PNG del logo siguen respondiendo 200 con sus rutas originales.

No se han enviado emails reales ni eventos a Google durante estas pruebas.
Las comprobaciones de éxito de envío y medición positiva utilizan los tests
existentes con proveedor y navegador controlados, ampliados a las nuevas rutas.

## Vista local segura

`http://127.0.0.1:3007/` (también `/en`, `/fr`, `/pt`). Se sirve una copia aislada
actualizada del código, con `ANALYTICS_PREVIEW=true` y sin credenciales de email.
El panel indica que es una prueba local: incluso al aceptar estadísticas no se
carga Google. El envío no se habilita por mover o traducir el formulario.

## Capturas

| Idioma / vista | Escritorio | Móvil |
| --- | --- | --- |
| Español | [Selector abierto](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/es-desktop-selector.png) | [Portada](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/es-mobile.png) |
| English | [Portada](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/en-desktop.png) | [Portada](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/en-mobile.png) |
| Français | [Portada](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/fr-desktop.png) | [Portada](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/fr-mobile.png) |
| Português | [Portada](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/pt-desktop.png) | [Portada](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/pt-mobile.png) |

Otras vistas: [APC FR](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/fr-projet-apc-desktop.png),
[contacto FR](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/fr-contact-desktop.png),
[cookies PT](/Users/evamartin/.codex/visualizations/2026/10/13/01a13580-b25d-7dc1-b33c-fa89ee0e69d4/multilingual-review/pt-cookies-mobile.png).

Referencias de implementación: [root layouts y lang](https://nextjs.org/docs/app/api-reference/file-conventions/layout),
[grupos de rutas](https://nextjs.org/docs/app/api-reference/file-conventions/route-groups).
