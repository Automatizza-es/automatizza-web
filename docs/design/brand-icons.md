# Iconos de marca

El símbolo procede del área `1428,22,271,237` del logo original
`public/brand/automatizza-logo.png`. Se conserva su silueta y se normaliza el
color a `#02A0FC`, sobre fondo transparente. No se modifica el logotipo ni el header.

`node scripts/generate-brand-icons.mjs` regenera los archivos usando Sharp,
ya disponible con Next.js, sin añadir dependencias. No se ejecuta en cada build.

- `src/app/favicon.ico`: imágenes PNG de 16, 32 y 48 px dentro del contenedor ICO.
- `src/app/icon1.png` y `icon2.png`: alternativas PNG de 16 y 32 px.
- `src/app/apple-icon.png`: Apple Touch Icon de 180 px, con fondo transparente.
  iOS puede aplicar su propio fondo al añadirlo a la pantalla de inicio.
- `public/icons`: iconos transparentes de 192 y 512 px con propósito `any`.
  Se omite la variante maskable para no introducir un fondo opaco.

Next.js añade los enlaces al head mediante sus convenciones de archivos;
`src/app/manifest.ts` genera `/manifest.webmanifest`. El manifiesto conserva la
experiencia de navegador actual. No se incorpora service worker, funcionamiento
offline, notificaciones ni una nueva interfaz de instalación.

Referencia: [iconos de Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons).
