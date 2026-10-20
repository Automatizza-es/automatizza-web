# Formulario de contacto y borrador de privacidad

## Estado actual

- Actualización de lanzamiento 20/10/2026: la titular ha aprobado la versión
  `2026-10-20-prelanzamiento-1` de privacidad y aviso legal. En `rediseño`,
  `privacyPolicy.reviewed=true`; la activación sigue requiriendo la variable
  `CONTACT_FORM_ENABLED=true` y configuración válida de Resend en el entorno.
  El despliegue público anterior no se ha actualizado con esta preparación.
  Estado de dominio y pasos restantes: [launch.md](launch.md).
- Formulario único en `/contacto`, conservando campos, diseño, validación,
  estados, consentimiento y protección antispam. La home muestra un cierre
  compacto que enlaza a esa página; `/#contacto` sigue funcionando mediante
  redirección en el cliente (los fragmentos no llegan al servidor).
- Cabecera, menú móvil, pie, hero, calculadora, fichas y retornos de privacidad
  enlazan a `/contacto`. El email visible conserva su enlace `mailto:`.
- La página utiliza el dominio de `NEXT_PUBLIC_SITE_URL` para su canonical,
  con `https://automatizza.es` como valor predeterminado. No existe sitemap
  en el proyecto. El cambio de ubicación no activa el formulario ni Analytics.
- El visitante cuenta el problema en un campo libre, sin elegir tecnología ni
  servicio. Nombre, email, consulta y aceptación de privacidad siguen siendo
  obligatorios. La API admite el área opcional de versiones anteriores; las
  consultas actuales se envían sin área ni categorías en el asunto.
- `/politica-de-privacidad` existe y está enlazada desde la casilla y el footer.
  La versión de lanzamiento ha sido aprobada por la titular; la página conserva
  la exclusión de indexación de los textos legales.
- La titular ha facilitado directamente el 15/10/2026 los datos de Grain Store
  Technology, S.L. (NIF B56885676), Calle Párroco Bartolomé Blanco, 46, 14014
  Córdoba, España, e info@automatizza.es. Se incorporan a la política y a la
  información legal del formulario, sin modificar la identidad comercial.
  Su procedencia es la confirmación de la titular; no una consulta independiente
  del Registro Mercantil. Los textos de lanzamiento se aprobaron el 20/10/2026.
- Credenciales configuradas en `.env.local`, excluido de Git. Consulta real a
  Resend el 15/10/2026: `automatizza.es` está `verified`, con envío `enabled`,
  DKIM/SPF verificados y región `eu-west-1`. Seguimiento de aperturas y clics
  desactivado. El dominio coincide con el remitente configurado.
  Remitente y destinatario: info@automatizza.es. El 15/10/2026 se realiza una
  prueba real desde el formulario local con datos ficticios: Resend confirma
  `delivered`, campos completos y `Reply-To` correcto. Sin cambios de DNS ni
  activación del formulario de producción.
- **El envío público permanece desactivado en el cliente y en la API.** Poner una API key
  o cambiar solo una variable de entorno no elude la revisión de la política.

## Confirmación y conversiones

La confirmación se muestra en el propio formulario de `/contacto`: «Mensaje
enviado. Gracias por contarnos qué te gustaría mejorar». No existe una página
`/gracias` ni una redirección después de enviar. Solo se vacían los campos y se
muestra el éxito después de una respuesta HTTP correcta con `ok: true`.

`trackContactResult` se llama desde ese manejador de respuesta; no desde un clic,
un efecto de React ni al visualizar el mensaje. Mantiene `form_id=contact`,
exige consentimiento estadístico vigente y deduplica por identificador de envío.
Una recarga no restaura la confirmación ni reenvía el formulario; volver a la
página o renderizarla de nuevo no recupera ni repite la conversión.

## Pruebas locales con envío real

`CONTACT_FORM_TEST_MODE=true` en `.env.local` permite probar el formulario de
`http://127.0.0.1:3000/contacto` con `next dev`. La excepción solo funciona con
`NODE_ENV=development` y fuera de Vercel; las compilaciones y despliegues de
producción continúan exigiendo la política revisada y el interruptor público.
`CONTACT_FORM_ENABLED` local sigue en `false`; la política de lanzamiento ya
está aprobada, pero esa aprobación no activa por sí sola el interruptor.

El modo de prueba avisa de que el envío es real y exige confirmar el uso de datos
ficticios. El asunto lleva `[PRUEBA LOCAL]` y el correo no registra consentimiento
legal, con independencia de la aprobación del texto. Se mantienen la validación, el honeypot, los límites, la idempotencia y
la consulta real del dominio antes de enviar. No se permiten destinatarios
arbitrarios: se utiliza el buzón configurado en el servidor.

Para desactivarlo, establecer `CONTACT_FORM_TEST_MODE=false` y reiniciar el
servidor de desarrollo si no ha recargado las variables de entorno.

## Variables privadas del servidor

Crear `.env.local` a partir de `.env.example` cuando se disponga de la configuración;
en un despliegue futuro, configurar los mismos valores en su entorno privado.
No usar prefijos `NEXT_PUBLIC_`, no subir credenciales al repositorio y no
introducirlas en el formulario o en mensajes de revisión.

| Variable | Uso |
| --- | --- |
| `CONTACT_FORM_ENABLED` | Interruptor explícito. Actualmente `false`. |
| `CONTACT_FORM_TEST_MODE` | Pruebas reales con datos ficticios solo con `NODE_ENV=development` y fuera de Vercel. Ignorado en producción. No aprueba la política. |
| `RESEND_API_KEY` | Credencial para enviar email mediante Resend. |
| `RESEND_VERIFY_API_KEY` | Opcional: credencial separada con permiso de lectura del dominio. Si falta, se usa la anterior y debe tener ese permiso. |
| `RESEND_DOMAIN_ID` | UUID del dominio/subdominio realmente verificado en la cuenta. |
| `RESEND_FROM_EMAIL` | Remitente, solo dirección sin nombre visible, perteneciente exactamente a ese dominio. No hay remitente de pruebas de respaldo. |
| `CONTACT_TO_EMAIL` | Buzón receptor: `info@automatizza.es`. Solo se utiliza en servidor. |
| `CONTACT_ALLOWED_ORIGINS` | Orígenes exactos separados por comas, sin rutas ni comodines. Obligatorio en producción. Incluir únicamente el dominio y las previews propias que vayan a utilizar el formulario. |
| `CONTACT_TRUST_PROXY` | Mantener `false` salvo que un proxy de confianza reescriba `X-Forwarded-For` y bloquee el acceso directo al backend. Vercel se detecta automáticamente. |

En desarrollo, sin lista de orígenes, se admite el origen de la propia petición
o de su cabecera Host local (Next puede normalizar la URL a 0.0.0.0).
Con la lista de ejemplo se admiten localhost y 127.0.0.1. Para probar por Wi-Fi,
añadir explícitamente el origen local del ordenador a esa lista.

## Dominio y DNS pendientes

1. Añadir en Resend el dominio o subdominio de envío elegido. No asumir que
   `automatizza.es` ya esté verificado. Un subdominio de envío puede mantener
   separada su reputación del correo habitual.
2. Copiar **los registros exactos que genere esa cuenta**: DKIM y los de
   SPF/Return-Path correspondientes, incluidos los MX específicos que indique
   su panel. No se pueden anticipar claves, nombres o valores sin esa cuenta.
   No sustituir los MX del buzón corporativo para añadir el envío transaccional.
3. Revisar el DMARC existente y su alineación con el remitente elegido. Confirmar
   región, tracking, contratos de tratamiento y posibles transferencias antes
   de aprobar la política.
4. Esperar a que Resend indique `verified` y tenga envío habilitado. Introducir
   el UUID y la dirección del dominio correcto en las variables.

Antes de **cada** envío la API consulta `GET /domains/:id`, comprueba el estado,
la capacidad de envío y la coincidencia exacta con el dominio del remitente.
Un permiso insuficiente, una respuesta incorrecta o un dominio pendiente
bloquean el envío. La consulta usa una clave autorizada para leer dominios;
una clave limitada a enviar correo puede requerir la credencial separada.

Fuentes: [dominios verificados](https://resend.com/docs/dashboard/domains/introduction),
[consulta del dominio](https://resend.com/docs/api-reference/domains/get-domain),
[gestión de claves](https://resend.com/docs/dashboard/api-keys/introduction).

## Revisión legal necesaria para activar

La versión concreta de lanzamiento de privacidad y aviso legal ha sido aprobada
por la titular el 20/10/2026 y está registrada en el código. Las instrucciones
siguientes explican los controles que deben preservarse si cambia la política;
no requieren volver a pedir los datos ya confirmados. La revisión/activación
de cookies y GTM permanece separada. Véase [launch.md](launch.md).

Inventario de datos y decisiones pendientes, incluido aviso legal y cookies:
[legal-readiness.md](legal-readiness.md).

El borrador se basa en el RGPD, la LOPDGDD y la LSSI, y distingue consentimiento,
medidas precontractuales y seguridad. No asegura cumplimiento definitivo.

Completar y validar `src/content/privacy.ts`: canal de derechos,
necesidad/contacto de DPD, conservación, entidades proveedoras,
contratos, países y garantías de transferencias. Revisar también la ponderación
antispam, registros, cookies y analítica de la web y del alojamiento definitivos.
Actualizar el texto de la página, su versión y la primera capa del formulario
para que describan exactamente el tratamiento aprobado.

Solo tras esa revisión, marcar `reviewed: true`, completar todos los campos,
configurar Resend/orígenes y establecer `CONTACT_FORM_ENABLED=true`. Reconstruir
y reiniciar la aplicación: la disponibilidad inicial se renderiza en servidor.
La API vuelve a comprobar ambos bloqueos en cada petición. Revisar entonces los
metadatos de borrador de la página legal antes de permitir su indexación.

Referencias: [RGPD](https://www.boe.es/buscar/doc.php?id=DOUE-L-2016-80807),
[LOPDGDD](https://www.boe.es/buscar/act.php?id=BOE-A-2018-16673),
[LSSI](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758),
[información por capas, AEPD](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion),
[transferencias, AEPD](https://www.aepd.es/derechos-y-deberes/cumple-tus-deberes/medidas-de-cumplimiento/garantias-transferencias-datos-personales).

## Comportamiento y límites

`POST /api/contacto` usa la API REST de Resend con `fetch`, sin instalar SDKs.
El destinatario y el remitente se toman exclusivamente del servidor; el email
del usuario se usa como `Reply-To`. El cuerpo es texto plano para evitar HTML
inyectado, e incluye todos los campos, la aceptación y su versión. No se crean
contactos comerciales ni registros en bases de datos.

Hay validación compartida cliente/servidor, JSON limitado a 32 KiB, comprobación
de origen, honeypot y límites por instancia: 5 peticiones por IP/15 min, 3 por
email/15 min y 30 globales/15 min. Solo se conservan contadores y claves HMAC en
memoria, con caducidad lógica y limpieza al recibir peticiones. No se registran
mensajes, direcciones o errores completos del proveedor en logs propios.

**La limitación en memoria no es distribuida:** se reinicia con cada proceso y
no se comparte entre instancias serverless. En el alojamiento definitivo habrá
que aplicar además una regla de rate limiting en su proxy/WAF si se necesitan
garantías globales. No se ha añadido una base de datos para resolverlo.
Fuera de Vercel o de un proxy explícitamente confiable se usa un bucket compartido
en lugar de confiar en cabeceras IP manipulables.

Solo una respuesta aceptada por Resend con un ID válido muestra éxito. Los
fallos conservan el texto. Los reintentos del mismo contenido usan el mismo
identificador de idempotencia; editar el contenido genera uno nuevo. Esto evita
duplicar una solicitud aceptada cuya respuesta se perdió, de acuerdo con la
[API de envío e idempotencia de Resend](https://resend.com/docs/api-reference/emails/send-email).

## Comprobaciones

`npm run test:contact` compila temporalmente la lógica y ejecuta pruebas con
`node:test`, usando únicamente mocks del proveedor. Cubren validación,
consentimiento, bloqueo legal/configuración, origen, honeypot, tamaño real del
cuerpo, verificación del dominio, Reply-To, destinatario fijo, idempotencia,
fallos del proveedor y límites de envío. **Esas pruebas no envían correos y no
habilitan un modo de éxito simulado en la aplicación.**

Ejecutar además `npm run lint` y `npm run build`. Tras aprobar la política y
configurar las credenciales, queda pendiente una prueba real hasta la recepción
en el buzón y la comprobación de responder al email del solicitante.

## Medición opcional de envíos confirmados

La integración GTM emite `automatizza_contact_success` únicamente después de
HTTP correcto y `ok: true` del servidor, y solo si existe consentimiento de
estadísticas vigente y la medición está habilitada. No transmite campos del
formulario ni el ID de reintento. En GTM se transforma en `generate_lead`;
no usar clics ni eventos automáticos de formularios como conversión.

Los envíos con `testMode` no cuentan como conversiones. Una confirmación significa
aceptación por Resend, no acreditación de entrega ni venta. El bloqueo legal y
operativo del formulario no se ha cambiado con esta integración. Detalles y
pendientes de cuenta en [analytics.md](analytics.md).
