# Propuesta de conservación y medición

Actualización: 20/10/2026. La titular ha aprobado el criterio de 12 meses para
consultas sin contratación dentro de la versión de lanzamiento. No son plazos
automáticos ya configurados ni límites máximos legales universales. La activación
del formulario público requiere su configuración de despliegue independiente.

El texto concreto de prelanzamiento ya incorpora el criterio de 12 meses para
consultas sin contratación. El procedimiento de aplicación y el estado actual
de aprobación figuran en [launch.md](launch.md). Este documento conserva el
origen de las recomendaciones; no acredita que se haya automatizado el borrado.

## Plazos propuestos

| Información | Propuesta | Qué falta aplicar o validar |
| --- | --- | --- |
| Consultas que no acaban en contratación | Durante la gestión y, como máximo, 12 meses desde el último contacto. Borrar antes si dejan de ser necesarias, sin perjuicio del bloqueo legal que proceda. | Aprobar el criterio, asignar responsable del borrado y comprobar cómo se aplica en Abbas y sus copias. |
| Expedientes que sí terminan en contratación | Conservar según las obligaciones del expediente contractual, fiscal o contable y sus responsabilidades. | Clasificar documentos y confirmar los plazos aplicables; los 12 meses de consultas no sustituyen estas obligaciones. |
| Contadores antispam de la aplicación | Ventana de 15 minutos, solo en memoria y sin mensajes ni IP en claro. | Ya implementado: caducidad lógica y limpieza al recibir solicitudes o reiniciar. No describe los logs de Vercel, Resend ni Abbas. |
| Datos de usuario/eventos de GA4 | 2 meses, sin reiniciar el plazo por nueva actividad. | Aplicar en la propiedad, si se confirma GA4. Este ajuste no limita los informes agregados estándar y Google elimina los datos vencidos en su ciclo mensual. |
| Cookies de medición de GA4 | Propuesta de 180 días, sin extensión automática por cada visita. | Aplicar la configuración y verificar cada cookie efectiva en el navegador; no utilizar este valor como descripción de una configuración que aún no existe. |
| Preferencia de cookies | 180 días para aceptar o rechazar, con opción permanente para cambiarla. | Implementar el panel. Solicitar de nuevo la decisión cuando cambien las finalidades o proveedores relevantes. |
| Logs, colas, copias y datos de proveedores | No se asigna un plazo ficticio. Aplicar la menor retención necesaria y disponible en el servicio contratado. | Confirmar los plazos efectivos de Vercel, Resend y Abbas, las opciones de borrado y las copias. |

La finalidad y la necesidad determinan la conservación. El bloqueo exigible
tras la supresión impide el uso ordinario y dura solo el plazo de prescripción
de las responsabilidades aplicables; no es un permiso para mantener consultas
indefinidamente en el buzón activo.

## Configuración de medición propuesta

- Confirmado Google Analytics 4: `G-1Y94M3HZRB`.
- Medición de uso del sitio, sin publicidad, remarketing ni Google Signals.
- No cargar la etiqueta ni enviar pings de medición antes de aceptar. Preferir
  la carga bloqueada hasta consentimiento frente a medición previa sin cookies.
- Aceptar y rechazar con la misma visibilidad y acceso a configuración y retirada.
- No enviar nombres, emails, contenido del formulario ni datos de consultas
  en eventos, URLs o parámetros. Revisar también la medición mejorada de formularios.
- Publicar el inventario real de cookies y la información de proveedores y
  transferencias tras comprobarlos. No presentar GA4 como exento por defecto.

Integración y panel preparados; no se ha activado la medición pública. La vista
local sin red permite probar preferencias sin cargar Google ni enviar datos;
el modo específico de Tag Assistant permite pruebas reales solo en localhost
y tras consentimiento, sin publicar el contenedor ni aprobar los textos legales.
Abbas confirma por escrito, según la respuesta trasladada por la titular el
20/10/2026, infraestructura propia y copias en Córdoba (España). Esto resuelve
la ubicación declarada de su servicio, pero no fija plazos de borrado ni de
rotación de copias. Siguen pendientes los contratos y condiciones efectivas,
y la revisión independiente de los demás proveedores.

## Fuentes oficiales consultadas

- [RGPD: arts. 5, 12 y 13](https://www.boe.es/buscar/doc.php?id=DOUE-L-2016-80807).
- [LOPDGDD: art. 32, bloqueo](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673).
- [AEPD: derecho de información](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion).
- [AEPD: guía de cookies](https://www.aepd.es/guias/guia-cookies.pdf).
- [Google: conservación de datos](https://support.google.com/analytics/answer/7667196?hl=es).
- [Google: cookies de GA4](https://support.google.com/analytics/answer/11397207?hl=es).
