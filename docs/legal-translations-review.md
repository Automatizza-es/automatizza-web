# Traducciones legales — revisión

Traducciones preparadas el 23 de octubre de 2026 a partir de la versión española
aprobada del 20 de octubre de 2026 (`2026-10-20-prelanzamiento-1`). La titular
ha solicitado publicarlas directamente desde `main` para su revisión posterior.
Esta publicación no registra una aprobación del revisor ni modifica el estado
de aprobación de la política española.

## URLs para el revisor

| Idioma | Privacidad | Cookies | Aviso legal |
| --- | --- | --- | --- |
| Español (referencia) | [Privacidad](https://automatizza.es/politica-de-privacidad) | [Cookies](https://automatizza.es/politica-de-cookies) | [Aviso legal](https://automatizza.es/aviso-legal) |
| English | [Privacy policy](https://automatizza.es/en/privacy-policy) | [Cookie policy](https://automatizza.es/en/cookie-policy) | [Legal notice](https://automatizza.es/en/legal-notice) |
| Français | [Politique de confidentialité](https://automatizza.es/fr/politique-de-confidentialite) | [Politique de cookies](https://automatizza.es/fr/politique-de-cookies) | [Mentions légales](https://automatizza.es/fr/mentions-legales) |
| Português (Portugal) | [Política de privacidade](https://automatizza.es/pt/politica-de-privacidade) | [Política de cookies](https://automatizza.es/pt/politica-de-cookies) | [Aviso legal](https://automatizza.es/pt/aviso-legal) |

También se puede cambiar de idioma desde el selector de cualquiera de estos
documentos. Footer, panel de cookies, formulario y enlaces legales internos
llevan a la versión del idioma activo. El retorno al contacto mantiene el idioma.

## Alcance de la traducción

- Datos de Grain Store Technology, S.L., NIF B56885676, domicilio, registro y
  correo conservados. Solo se traducen las denominaciones descriptivas y el país.
- Se mantienen las bases del RGPD 6.1.a, 6.1.b y 6.1.f, la normativa española y
  la AEPD; no se sustituyen por autoridades o leyes del país del lector.
- Mismos plazos: consultas sin contratación, máximo 12 meses desde el último
  contacto; contadores, 15 minutos; información de Resend, 30 días; elección y
  cookies, 180 días; datos de Analytics, 2 meses; respuesta a derechos, un mes
  con las mismas condiciones para ampliación.
- Mismos proveedores, referencias a Abbas en Córdoba, posibles transferencias,
  garantías condicionales y enlaces a información de los proveedores.
- Mismas condiciones de consentimiento, retirada, eliminación de cookies,
  ausencia de publicidad y límites de la eliminación de datos ya enviados.
- No se ha añadido una cláusula de prevalencia de idioma ni nuevas garantías,
  prestaciones o compromisos. La fecha del texto base se conserva traducida.

## Implementación y comprobaciones

Tres vistas compartidas en `src/components/legal`, con traducción del servidor
y un catálogo separado en `src/lib/i18n/legalMessages.ts` (132 entradas completas).
El texto español visible se ha comparado con las tres páginas publicadas y es
idéntico. El contenido y los indicadores de aprobación de `src/content/privacy.ts`
no se modifican.

Las doce URLs legales responden directamente y conservan canonical propio,
`noindex, nofollow` y ausencia de hreflang. Permanecen fuera del sitemap; este
sigue conteniendo solo las veinte páginas comerciales. Las protecciones y el
noindex de previews no cambian. Las traducciones se incluyen en el HTML inicial.

Lint y builds correctos. 54 tests (23 contacto, 24 analítica, 7 idiomas) y 124
escenarios HTTP/SEO. Las nuevas rutas legales usan la misma medición con
consentimiento y deduplicación; no generan conversiones por visitar los textos.
Las pruebas no realizan envíos de correo reales.
