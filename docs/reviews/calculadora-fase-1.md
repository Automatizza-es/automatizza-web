# Calculadora: primera fase editorial

Rama: `seo/calculadora-fase-1`, desde `main` (`5e3b216`). Pendiente de aprobación; sin merge ni publicación en producción.

## Cambios

- Home: nueva descripción y botón «Calcular mi ahorro potencial», con el mismo destino localizado.
- Calculadora: etiqueta «CALCULADORA DE AHORRO POTENCIAL», H1 «¿Cuánto te cuesta no automatizar?» y subtítulo aprobados.
- Aviso ampliado: estimación orientativa, doce meses de carga constante, valor del tiempo recuperado frente a reducción de gastos y costes excluidos.
- Cierre con «¿Y si empezamos por uno de tus procesos?» y «Quiero analizar mi proceso», hacia contacto en el idioma correspondiente.
- Dos FAQ adicionales sobre diferencias entre tecnologías y conexiones entre herramientas, condicionadas a las integraciones y APIs disponibles.
- Textos adaptados a ES, EN, FR y PT mediante el catálogo existente.

Se conservan los componentes, identidad visual, imágenes y animaciones. El cierre utiliza la tipografía, tokens y enlace existentes. No se importa código, CSS, fuentes ni imágenes del HTML de referencia. Menú superior y header intactos.

## FAQ: solapamientos señalados, sin eliminar contenido

Se mantienen las siete preguntas y respuestas originales, en el mismo orden y en los cuatro idiomas. Las dos nuevas se añaden al final (nueve en total).

- La nueva explicación sobre automatización, software e IA complementa las preguntas actuales sobre aplicaciones a medida y agentes de IA.
- La nueva pregunta sobre conexiones se solapa parcialmente con «¿Es necesario cambiar los programas…?», pero aporta ejemplos y el matiz sobre APIs e integraciones.

No se ha simplificado ni eliminado contenido por estos solapamientos.

## Funcionamiento conservado

Sin cambios en los cinco campos, rangos, validación, fórmulas, porcentaje inicial del 30 % ni actualización inmediata de resultados. El código del componente anterior al aviso es idéntico al de `main`.

URLs, enlaces internos existentes, metadatos, canonical, alternates, robots y sitemap conservados. Sin cambios en Analytics, consentimiento ni eventos de conversión.

## Validación

- Lint y 12 pruebas de idiomas superadas.
- 180 escenarios SEO en compilaciones aisladas de producción y preview; 72 registros de metadatos comparados con la versión anterior, sin variaciones.
- 28 pruebas de Analytics superadas.
- 28 estados de calculadora comparados con la versión anterior (siete por idioma): resultados, entradas y validación idénticos.
- Ocho páginas localizadas comprobadas en navegador, en anchos de 320, 390, 768 y 1440 px: sin desbordamiento ni errores JavaScript; FAQ por teclado, enlaces localizados y foco visible correctos.
- Huellas de las siete FAQ originales comprobadas en los cuatro idiomas.
- Inspección visual del bloque de home, calculadora y CTA en escritorio y móvil.

Las comprobaciones locales no envían formularios ni eventos a Google. La recepción real de conversiones no forma parte de esta revisión de textos.
