# Páginas individuales de proyectos

Las tres rutas se generan desde `projectDetails.ts` y comparten `ProjectDetailPage`.
Los estilos están aislados en un módulo CSS; los visuales de la home mantienen
sus proporciones y animaciones originales.

## Recursos reutilizados

- **Silos Spain:** `SilosSpainVisual`, `CrmDashboard` y el logo existente.
  `videos/details/silos-crm.mp4` es la grabación original recortada 56 px por arriba
  para excluir la identidad de la sesión. No se ha recreado la interfaz.
- **APC:** `ApcVisual` se utiliza una sola vez, en la cabecera, y la imagen
  `projects/apc/hero.jpg` se conserva para Open Graph. El vídeo nuevo facilitado
  por la titular el 15/10/2026 sustituye al fragmento anterior:
  `videos/details/apc-app-recorrido.mp4`, H.264/AAC, 804 × 1748, 30 fps y unos
  16,4 segundos. Mantiene el encuadre y la duración completos, incluido el audio.
  El poster procede de esa misma grabación. Los dos textos acompañan a una única
  demo en escritorio; en móvil, el vídeo va entre ambos textos. No se repite la
  ilustración inicial debajo del vídeo.
- **La Factory:** `LaFactoryVisual` y `WebHome`. La nueva grabación facilitada
  el 15/10/2026 se sirve como `videos/details/factory-app-recorrido.mp4`:
  H.264/AAC, 804 × 1748, 30 fps y unos 9,8 segundos, tras retirar los primeros
  y los últimos 2 segundos. Conserva el encuadre completo y el audio; el poster
  refleja el nuevo inicio. Se elimina la galería final de las dos salas; sus archivos se
  conservan porque se utilizan en las interfaces y los metadatos existentes.
  El vídeo anterior se conserva para la tarjeta de la galería de proyectos.
- Los posters de `projects/details` son fotogramas de estas grabaciones.

Los vídeos se reproducen bajo demanda con controles nativos. Los visuales
aparecen completos desde el principio; se desactivan sus entradas largas solo
en las páginas de detalle. Se respeta `prefers-reduced-motion`.

## Contenido y estado

Las representaciones de interfaces usan datos ficticios y se identifican como
demostraciones. Las cifras de las grabaciones no se presentan como resultados.
La grabación de APC se identifica como recorrido del registro de una recogida.
Silos describe una integración modular progresiva. El texto público de La Factory
se centra en calendario, reservas y espacio personal del coworker. Las notas de
alcance y de revisión editorial no se muestran en la página.

Nota interna de La Factory: onboarding, Holded, accesos y campañas de email se
plantean como futuras integraciones. Eventos, paquetes e incidencias forman
parte de la propuesta de interfaz; su estado operativo no está confirmado.
Esta información es contexto de edición, no contenido comercial para publicar.

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
