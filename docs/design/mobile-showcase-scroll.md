# En la práctica — Recorrido móvil

Los tres casos se descubren con el scroll, sin interceptar la rueda ni los gestos táctiles.

- Cuando pestañas, descripción y demo caben completas, esa parte de la sección usa `position: sticky` bajo la cabecera. El encabezado de la sección sigue su recorrido normal. Un tramo corto de scroll activa 01 → 02 → 03 y rellena las líneas individuales; al subir, vuelve al estado anterior.
- El clic y las flechas del teclado desplazan a la etapa correspondiente y mantienen sincronizado el progreso.
- En pantallas bajas o con `prefers-reduced-motion`, se muestran los tres casos completos en vertical. Las opciones superiores enlazan a cada caso y el scroll continúa con normalidad. Las regiones permanecen accesibles y visibles, sin semántica de pestañas que oculte contenido.
- La altura disponible se mide con `100svh`, para que la aparición o desaparición de las barras de Safari no cambie el modo de navegación. Las descripciones reservan la altura de la más larga para que las demos no se desplacen al cambiar de caso.
- El comportamiento de escritorio conserva la composición completa fijada y su progresión anterior.

## Comprobaciones

- 390 × 844: avance y retroceso por scroll; pestañas y demo permanecen a 84 px de la parte superior durante las tres etapas. Al completar la tercera, la sección se libera y aparecen Proyectos.
- 390 × 664 y 320 × 568: los tres casos se muestran completos en vertical, sin contenido oculto ni desbordamiento horizontal.
- 1280 × 720: se mantiene el recorrido de escritorio y la navegación directa.
- ESLint y compilación de producción.

La comprobación móvil se hizo cambiando el viewport del navegador integrado; no mediante un dispositivo Safari físico.
