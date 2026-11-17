# Calculadora: cálculo mediante botón

Rama `feat/calculadora-calculo-explicito`, desde `main` (`c663332`). Pendiente de revisión, sin merge ni publicación en producción.

## Comportamiento

- El formulario conserva sus cinco entradas, rangos, pasos, valores iniciales (30 % recuperable) y validación del coste por hora.
- «Calcular mi ahorro potencial» muestra los resultados. Cualquier edición de las cinco entradas los oculta, junto con las barras y el resumen, hasta volver a calcular.
- Cuatro métricas: coste mensual, valor mensual recuperable, potencial anual estimado destacado y horas recuperables al año.
- Las barras mensuales conservan una escala común: coste total al 100 % y valor recuperable proporcional al porcentaje elegido.
- El resumen conserva las horas y el valor anual estimados y la hipótesis de doce meses con la misma carga de trabajo.
- Aviso orientativo ampliado y CTA localizado hacia contacto intactos.

Se reutilizan el componente, botón, barras, tipografía y tokens actuales. No se importan CSS, fuentes ni logos del HTML de referencia. La home conserva su miniatura inerte con el resultado ilustrativo original; no incorpora un formulario interactivo. Header y menú intactos.

## Cálculos conservados

Coste mensual = personas × horas diarias × coste por hora × días mensuales.

Valor mensual recuperable = coste mensual × porcentaje / 100.

Potencial anual = valor mensual × 12. Horas anuales = personas × horas diarias × días × 12 × porcentaje / 100.

Ejemplo inicial: 3 personas, 2 horas diarias, 22 días, 30 % y 25 €/hora: 3.300 € mensuales, 990 € recuperables mensuales, 11.880 € anuales y 475 horas anuales (presentación redondeada como antes).

## Accesibilidad e idiomas

ES, EN, FR y PT. Formulario con nombre accesible, envío mediante botón o Enter, región de resultados `aria-live="polite"`, errores asociados al coste por hora y botón deshabilitado cuando no es válido. No se mueve el foco ni se añaden animaciones; se mantiene el tratamiento existente de movimiento reducido.

## Validación

- 114 casos de calculadora en navegador: los cuatro idiomas, escritorio y móvil, ocultación tras editar cada campo, métricas, porcentajes del 0 % y 100 %, límites, costes inválidos y recálculo mediante Enter.
- Comprobación de desbordamiento en anchos de 320, 390, 768 y 1440 px, también con los valores máximos.
- Barras de igual escala y miniatura inerte de la home comprobadas.
- Sin errores JavaScript ni solicitudes a Google durante estas comprobaciones locales.
- Lint, 12 pruebas de idiomas y 28 pruebas de Analytics superadas.
- 180 escenarios SEO superados en compilaciones aisladas de producción y preview. Las pruebas ahora comprueban el botón localizado y la ausencia inicial de resultados, además de los cinco campos originales.

URLs, metadatos, canonical, traducciones existentes, consentimiento, código de Analytics y eventos de conversión sin cambios. No se envían formularios de contacto ni se publican cambios.
