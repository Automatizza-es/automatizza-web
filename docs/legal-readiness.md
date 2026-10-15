# Información pendiente para cerrar los textos legales

Revisión del código: 15 de octubre de 2026, rama `rediseño`.
Este inventario no es una auditoría del despliegue público ni una aprobación legal.

## Identificación recibida

Datos facilitados directamente por la titular:

- Automatizza: marca comercial de Grain Store Technology, S.L.
- NIF: B56885676.
- Domicilio: Calle Párroco Bartolomé Blanco, 46, 14014 Córdoba, España.
- Contacto: info@automatizza.es.

Ya figuran en el borrador de privacidad y en la información legal del formulario.
La identidad comercial, el hero y los demás textos comerciales siguen igual.
No se atribuye a estos datos una comprobación independiente en registros oficiales.

## Datos o decisiones que debe confirmar la empresa

| Pendiente | Qué necesitamos | Para qué sirve |
| --- | --- | --- |
| Inscripción de la sociedad | Registro Mercantil y datos de inscripción: hoja, inscripción, tomo y folio cuando consten, o identificación registral equivalente. Puede facilitarse el extracto correspondiente de la escritura o una nota registral. | Completar el futuro aviso legal, conforme al art. 10 LSSI. |
| Proveedor del buzón | Quién presta el correo de info@automatizza.es y qué configuración/región se utiliza. | Identificar los proveedores que reciben y conservan consultas. |
| Alojamiento definitivo | Confirmar si será Vercel u otro proveedor, cuenta/plan y región de ejecución; sin enviar contraseñas o claves. | Comprobar contratos, subencargados, logs, retención y posibles transferencias. |
| Resend | Confirmar entidad contratada, acuerdos, retención y subencargados. Región técnica `eu-west-1` y seguimiento de aperturas/clics desactivado, comprobados por API el 15/10/2026. | Completar los proveedores y garantías; las credenciales ya están configuradas de forma privada. La región de envío no cierra por sí sola la revisión de transferencias. |
| Conservación de consultas | Definir cuándo se borran las consultas que no acaban en contratación, quién accede al buzón y el procedimiento de supresión; revisar copias de seguridad. | Redactar un plazo o criterio real, sin inventar duraciones. Los expedientes de clientes se valoran por separado. |
| Atención de derechos | Confirmar que info@automatizza.es atenderá estas solicitudes y quién se responsabiliza internamente. Indicar si existe DPD o si se ha valorado la necesidad de designarlo. | Completar el canal de derechos y el apartado de DPD sin presumir que sea obligatorio. |
| Medición y servicios externos | Confirmar si se desean Google Analytics, Meta Pixel, mapas, vídeos externos, chat u otras integraciones. | Determinar qué tratamientos y tecnologías de almacenamiento deben explicarse y, en su caso, bloquearse hasta obtener consentimiento. |

Con el proveedor y la configuración definitivos se revisarán los acuerdos de
encargo, países, subencargados y garantías de transferencias. No basta con que
una región se denomine europea para concluir que no hay accesos internacionales.

## Resultado de la revisión del código sobre cookies

- No se han encontrado escrituras de cookies, `localStorage`, `sessionStorage`
  ni IndexedDB en el código de la aplicación.
- No se han encontrado scripts de analítica/publicidad, gestores de etiquetas,
  iframes de mapas o vídeos externos ni un chat de terceros.
- Las demos de proyectos son componentes propios. El formulario solo llama a
  `/api/contacto`; la comunicación con Resend está en el servidor y sigue bloqueada.
- Las tipografías se incorporan con `next/font`; comprobar también los recursos
  realmente servidos por el despliegue final.

Esta revisión permite describir el código actual, no asegurar que el CDN,
alojamiento, una configuración externa o futuras integraciones no añadan cookies.
Antes del cierre hay que revisar las respuestas HTTP, solicitudes y almacenamiento
del navegador en una sesión limpia del despliegue definitivo, incluyendo las
páginas de proyectos y el formulario, sin confundir herramientas de desarrollo
con servicios para visitantes.

Si se confirma que no hay tecnologías sujetas a consentimiento, no hace falta
añadir un banner de aceptación por defecto. Las cookies estrictamente necesarias
están exceptuadas en los términos que explica la AEPD. Si se incorporan tecnologías
no exentas, documentar nombre, proveedor, finalidad y duración, implementar su
bloqueo previo y permitir aceptar, rechazar, configurar y retirar el consentimiento.

## Cierre pendiente

1. Completar y revisar el borrador de privacidad con la información anterior.
2. Preparar el aviso legal con los datos registrales completos.
3. Redactar la información de cookies según el inventario efectivo; determinar
   entonces si es necesario un panel de consentimiento.
4. Revisar el tratamiento de consultas, seguridad y gestión de derechos con la
   empresa; aprobar expresamente la versión definitiva.
5. Configurar Resend y sus DNS, comprobar el dominio y realizar una prueba real
   del envío y de Reply-To. Mantener desactivado el envío hasta esa aprobación.

La configuración técnica del formulario está en [contact-form.md](contact-form.md).

Fuentes oficiales:

- [LSSI, art. 10 y 22](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758).
- [AEPD: derecho de información](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion).
- [AEPD: guía de cookies](https://www.aepd.es/guias/guia-cookies.pdf).
- [AEPD: garantías de transferencias](https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/garantias-transferencias-datos-personales).
