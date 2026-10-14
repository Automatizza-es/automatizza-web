# En la práctica — Recorrido móvil

Los casos se sustituyen en una única composición con el scroll, sin interceptar la rueda ni los gestos táctiles. Solo se muestra el número, título, descripción y demo del caso activo.

- La composición usa `position: sticky` bajo la cabecera. El encabezado de la sección sigue su recorrido normal. Un tramo corto de scroll activa 01 → 02 → 03, con una transición breve que sustituye el número y la demo. Al subir, vuelve al estado anterior.
- Tres indicadores finos permiten seleccionar cada caso con clic o con las flechas del teclado; sus líneas muestran el progreso de cada etapa. Las pestañas y paneles conservan sus nombres accesibles, controles y navegación por teclado.
- La altura de la demo se adapta entre 320 y 530 px, para mantener una sola escena también en teléfonos de pantalla baja. En el modo compacto se ajustan los espacios de la factura y del flujo de conexiones para que todos los datos permanezcan visibles. Las personas y el mobiliario nunca se estiran.
- La altura disponible se mide con `100svh`, para que la aparición o desaparición de las barras de Safari no cambie el modo de navegación. Títulos y descripciones reservan la altura del texto más largo para que las demos no se desplacen al cambiar de caso.
- Con `prefers-reduced-motion`, el cambio de caso y la navegación directa se hacen sin animaciones. Si la pantalla resulta todavía más baja de lo necesario para la demo mínima, se conserva una sola escena y se permite cambiar mediante los indicadores; no se apilan los casos.
- El comportamiento de escritorio conserva la composición completa fijada y su progresión anterior.

## Comprobaciones

- 390 × 844, 390 × 664 y 320 × 568: una sola demo y número activos, con avance y retroceso por scroll; la composición permanece a 84 px de la parte superior durante las tres etapas. Al completar la tercera, se libera y aparecen Proyectos. Sin desbordamiento horizontal.
- 1280 × 720: se mantiene el recorrido de escritorio y la navegación directa.
- ESLint y compilación de producción.

La comprobación móvil se hizo cambiando el viewport del navegador integrado; no mediante un dispositivo Safari físico.
