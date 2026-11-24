# Corrección de dependencias — 24 de noviembre de 2026

## Resultado

La auditoría inicial identificaba 11 paquetes afectados: 1 crítico, 3 altos y 7 moderados. Tras actualizar las dependencias, `npm audit` devuelve **0 vulnerabilidades conocidas**, incluyendo las dependencias de desarrollo. Esto describe el resultado de la auditoría de paquetes en esta fecha; no sustituye una auditoría integral de la aplicación.

Cambios en la rama `codex/blog-editorial`, sin merge a `main` ni despliegue de producción. No se cambian contenidos, fechas o estados editoriales, componentes de la web, formulario, analítica, consentimiento, DNS ni mjlopezz.com.

## Actualizaciones

| Dependencia | Anterior | Corregida |
|---|---|---|
| Next.js y eslint-config-next | 16.3.5 | 16.4.6 |
| sharp | 0.35.4 | 0.35.5 |
| source-map-js | 1.2.1 | 1.2.4 |
| zod | 4.6.5 | 4.6.7 |
| typescript-eslint y paquetes asociados | 8.70.0 | 8.74.0 |
| minimatch, dentro de typescript-estree | 10.2.6 | 11.0.9 |

El lockfile incluye las dependencias nativas correspondientes de Next/SWC y sharp/libvips. La actualización de minimatch viene de la dependencia compatible de typescript-eslint; no se fuerzan versiones con `overrides`. React, Tailwind, TypeScript y ESLint mantienen sus versiones instaladas anteriores.

Se eleva el mínimo declarado de Next y eslint-config-next a `^16.4.6`. Los demás arreglos quedan fijados en `package-lock.json`, que debe instalarse con `npm ci` en CI/despliegue. No se ejecutó `npm audit fix --force` ni se saltó a una nueva versión mayor del framework.

## Motivo y fuentes

Los avisos de Next afectaban a imágenes, cachés, datos de rutas y otras superficies; entre ellos había ejecución remota de código. Que una funcionalidad concreta no se utilice no justifica mantener la versión vulnerable.

- [Versión de seguridad Next.js 16.4.5](https://github.com/vercel/next.js/releases/tag/v16.4.5): corrige los avisos más recientes que afectaban hasta 16.4.4.
- [Next.js 16.4.6](https://github.com/vercel/next.js/releases/tag/v16.4.6): parche estable posterior de la misma línea, con correcciones adicionales.
- [Aviso del optimizador de imágenes SVG](https://github.com/advisories/GHSA-7qx7-33qx-rqx2).
- [sharp/libvips](https://github.com/advisories/GHSA-wq5f-xc86-pv6w).
- [source-map-js](https://github.com/advisories/GHSA-68fv-2mgg-jv7q).
- [Zod](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5).
- [minimatch](https://github.com/advisories/GHSA-g3hv-75wg-m249).

## Verificación

Con Node 24.22.3:

- `npm audit`: cero avisos.
- `npm ls --depth=0`: árbol coherente, sin errores de dependencias.
- `npm run lint`: correcto.
- `npm run build`: compilación y comprobación TypeScript correctas.
- Runtime, contacto, analítica, idiomas, datos estructurados, seguridad y blog: 95 pruebas correctas.
- `npm run test:seo`: 180 escenarios correctos; compilaciones de producción y preview, metadatos, robots, sitemap, enlaces y cabeceras.
- `npm run test:blog:publication`: correcto; publicación individual en copia temporal, sin tocar los artículos de trabajo; verifica también imagen optimizada y bloqueo de borradores.

Los 19 artículos siguen en borrador. Las pruebas de publicación son aisladas y no envían formularios reales.

## Despliegue

El push de esta rama actualiza únicamente su preview protegida. La web pública seguirá usando sus dependencias anteriores hasta que se autorice y efectúe el despliegue a producción. Antes de ese despliegue conviene volver a ejecutar `npm audit`, porque pueden aparecer avisos nuevos.
