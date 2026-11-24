# Calculadora v3 — 24 de noviembre de 2026

Referencia: `calculadora-automatizza-v3.html`, facilitada por la usuaria.

La página reproduce la composición y los controles del archivo: equipo (empleados, horas, coste por hora, días), hipótesis de automatización, botón de cálculo y resultados ocultos hasta enviar. Mantiene rangos, pasos y valores iniciales (3, 2, 25, 22, 80 %), cuatro tarjetas, barras, advertencia y CTA mailto «Cuéntanos tu proyecto». Los resultados son una instantánea del último cálculo, igual que en el archivo.

Se adaptan logotipo, colores y fuentes a los recursos de identidad existentes. Se conserva la cabecera y el pie del sitio, se añade Calculadora a ambos menús y se traducen los textos para EN/FR/PT. La preview decorativa de la portada no cambia.

Validación:
- Compilación de producción y TypeScript correctos.
- ESLint correcto.
- 180 escenarios HTTP/SEO de producción y preview correctos; contrato de calculadora actualizado a v3.
- Navegador real: valores iniciales producen 3.300 € / 2.640 € / 31.680 € / 1.267 h, igual que el HTML.
- Coste 0: aviso y foco en el campo, sin nuevo cálculo.
- Revisión visual de escritorio y móvil a 400 px: campos, tarjetas y acceso Calculadora en menú móvil.
- No se envían formularios ni correos en las pruebas.
