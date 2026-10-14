# Páginas individuales de proyectos

Las tres rutas se generan desde `projectDetails.ts` y comparten `ProjectDetailPage`.
Los estilos están aislados en un módulo CSS; los visuales de la home mantienen
sus proporciones y animaciones originales.

## Recursos reutilizados

- **Silos Spain:** `SilosSpainVisual`, `CrmDashboard` y el logo existente.
  `videos/details/silos-crm.mp4` es la grabación original recortada 56 px por arriba
  para excluir la identidad de la sesión. No se ha recreado la interfaz.
- **APC:** `ApcVisual` y la imagen `projects/apc/hero.jpg`.
  `videos/details/apc-recogida.mp4` es el fragmento de 4,2 a 5,5 segundos de la
  grabación original, recortado a la zona del formulario (384 × 532, y = 230).
  Excluye el nombre del conductor, la matrícula y la lista de proveedores.
- **La Factory:** `LaFactoryVisual`, `WebHome`, la grabación original y las
  fotografías existentes de La Meeting Room y Territori Creatiu.
- Los posters de `projects/details` son fotogramas de estas grabaciones.

Los vídeos se reproducen bajo demanda con controles nativos. Los visuales
aparecen completos desde el principio; se desactivan sus entradas largas solo
en las páginas de detalle. Se respeta `prefers-reduced-motion`.

## Contenido y estado

Las representaciones de interfaces usan datos ficticios y se identifican como
demostraciones. Las cifras de las grabaciones no se presentan como resultados.
APC distingue la versión Glide de la nueva aplicación propia en desarrollo.
Silos describe una integración modular progresiva. La Factory diferencia las
reservas de partida de las futuras integraciones y de las propuestas de interfaz
para eventos, paquetes e incidencias.

## SEO y navegación

Cada proyecto tiene título, descripción, canonical y metadatos Open Graph propios.
`NEXT_PUBLIC_SITE_URL` permite configurar el dominio definitivo; por defecto se
utiliza `https://automatizza.es`. Las cabeceras enlazan con las secciones de la
home y con el contacto local. Las páginas incluyen vuelta a Proyectos y enlaces
a los otros dos casos.

`ProjectRouteScroll` permanece en el layout raíz para distinguir cambios de
ruta e historial. Solo reinicia el scroll al abrir un detalle nuevo; conserva
los enlaces a anclas y la restauración del historial.

## Validación

- Lint y build de Next.js; tres páginas de detalle generadas estáticamente.
- Revisión visual en escritorio y a 390 y 320 px de ancho.
- Navegación entre casos, metadatos, contacto, menú por teclado y vídeos.
