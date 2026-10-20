# Lanzamiento de Automatizza — 20/10/2026

## Estado de producción

- Sitio publicado en https://automatizza.es y formulario activo en
  https://automatizza.es/contacto. `www` redirige al dominio principal.
  Dominios verificados en el proyecto Vercel `automatizza-web`.
- Textos de privacidad y aviso legal aprobados por la titular, versión
  `2026-10-20-prelanzamiento-1`. `privacyPolicy.reviewed=true`.
- Activación de analítica en main, commit `fb84daa`, desplegada correctamente
  el 20/10/2026 a las 14:27 UTC. `cookiePolicy.reviewed=true`.
- GTM `GTM-59RBDRPH`, versión **2**, publicada con autorización de lanzamiento:
  «Lanzamiento Automatizza · analítica con consentimiento».
  GA4 `G-1Y94M3HZRB`, únicamente a través de GTM.
- Revisión del contenedor: tres etiquetas, filtros de consentimiento y
  `analytics_storage` obligatorio; sin page view automático, Signals ni
  personalización publicitaria. Desactivada la recopilación automática de
  datos proporcionados por usuarios. No se han aceptado acuerdos en su nombre.

## Variables de producción configuradas

Se han guardado 14 variables en el entorno **Production** de Vercel. Credenciales
privadas cifradas, nunca incluidas en Git o en esta documentación:

- `RESEND_API_KEY`, `RESEND_VERIFY_API_KEY`, `RESEND_DOMAIN_ID`,
  `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`.
- `CONTACT_FORM_ENABLED=true`, `CONTACT_FORM_TEST_MODE=false`.
- `CONTACT_ALLOWED_ORIGINS`: dominio principal, `www` y alias propio
  `automatizza-web.vercel.app`, sin comodines.
- `ANALYTICS_ENABLED=true`, `ANALYTICS_PREVIEW=false`,
  `ANALYTICS_TAG_ASSISTANT=false`.
- `GOOGLE_ANALYTICS_ID=G-1Y94M3HZRB`,
  `GOOGLE_TAG_MANAGER_ID=GTM-59RBDRPH`,
  `NEXT_PUBLIC_SITE_URL=https://automatizza.es`.

No falta ninguna variable para el envío o la medición. Dominio remitente
`automatizza.es` comprobado por API: verificado, envío habilitado y región
`eu-west-1`. Aperturas y clics desactivados. No se han cambiado MX, nameservers
ni registros de correo. Abbas ha configurado los registros web y confirmado
que buzón y copias están en Córdoba, según la información de la titular.

## Pruebas reales de lanzamiento

- Un envío de prueba ficticio a las 14:33 UTC y un segundo, expresamente
  autorizado para comprobar la conversión con Tag Assistant conectado, a las
  14:38 UTC. Ambos desde la interfaz de `/contacto`, sin modo de prueba local
  ni simulación de éxito. Destinatario `info@automatizza.es`.
- Resend confirma `delivered`, contenido correcto y Reply-To de los respectivos
  remitentes ficticios. Esto acredita entrega al servidor de correo; no se
  afirma lectura humana del buzón. No se han consultado cuerpos de otros emails.
- En el segundo envío, Tag Assistant muestra un único
  `automatizza_contact_success`, etiqueta `GA4 - generate_lead` completada y
  hit `generate_lead` enviado a `region1.google-analytics.com/g/collect`.
  Parámetros: URL canónica de Contacto, título, referrer vacío y
  `form_id=contact`; sin nombre, email, mensaje ni identificador de envío.
- Tras recargar, desaparece la confirmación y no se repite la conversión.
  No se ha añadido `/gracias`, eventos manuales ni otra integración de Google.
- En producción, cero scripts Google antes de aceptar; al aceptar se carga
  una única instalación de GTM/GA4. Tag Assistant confirma
  `analytics_storage=granted`, con `ad_storage`, `ad_user_data` y
  `ad_personalization=denied`. Visita inicial emitida una vez.
- Retirar estadísticas desde el panel recarga el documento y deja cero scripts
  Google. La navegación posterior conserva el rechazo sin volver a cargar GTM.
- Configuración publicada comprobada: cookies 180 días, `cookie_update=false`,
  `send_page_view=false`, ambos eventos condicionados a consentimiento.
- 43 pruebas automatizadas de contacto y analítica, lint y build correctos.
  La titular ya había validado visitas SPA sin duplicados y borrado de cookies
  al retirar consentimiento en Tag Assistant/DebugView; se conserva esa evidencia.

## Operación posterior

No hay un bloqueo técnico conocido para lanzar web, contacto o estadísticas.
La revisión documental no equivale a certificación legal ni a firmar contratos.
La recopilación de Abbas queda cerrada por decisión de la titular; no se vuelven
a solicitar datos. Contratos y ciclos de borrado no aportados se mantienen como
documentación interna pendiente, sin presentarlos como firmados o dispensados.
El borrado mensual de consultas vencidas debe realizarlo quien gestione el buzón;
no existe un automatismo de borrado en Abbas. El rate limit del formulario es
por instancia; sus límites y funcionamiento figuran en `contact-form.md`.

## Versión aprobada por la titular

- Texto preparado: `src/content/privacy.ts`, versión
  `2026-10-20-prelanzamiento-1`, y páginas `/politica-de-privacidad`,
  `/aviso-legal` y `/politica-de-cookies`.
- Consultas sin contratación: conservar durante su gestión y como máximo
  12 meses desde el último contacto, con borrado anterior si dejan de ser
  necesarias. Documentación contractual por sus obligaciones aplicables;
  bloqueo únicamente cuando corresponda. No se promete un plazo de borrado
  inmediato de copias de los proveedores que no esté confirmado.
- La persona que gestione el buzón debe revisar mensualmente las consultas
  vencidas, suprimirlas o separarlas para el bloqueo que proceda y dejar
  constancia de la revisión sin duplicar el contenido de los mensajes.
  No se ha configurado un borrado automático en el correo de Abbas.
- Atender derechos desde el buzón habitual; plazo general de un mes, con las
  ampliaciones legales e información a la persona solicitante cuando proceda.
- La analítica utiliza consentimiento separado; la conservación configurada es
  de 2 meses para datos de usuario/evento y 180 días para cookies, sin renovación.
  La duración de cookies (15.552.000 segundos) y la ausencia de renovación se han comprobado en la configuración publicada de GTM; los 2 meses de GA4 constan en la configuración comunicada por la titular.

La titular responde «Sí, apruebo esta versión» a la revisión de
`2026-10-20-prelanzamiento-1` el 20/10/2026. Se ha establecido
`privacyPolicy.reviewed=true`; el contacto de DPD sigue sin inventarse.
La activación requiere además `CONTACT_FORM_ENABLED=true` y configuración
válida de Resend en el entorno de despliegue.

## Fuentes revisadas

- [Vercel DPA, planes Pro/Enterprise y transferencias](https://vercel.com/legal/dpa).
- [Conectar dominio usando los registros del proyecto](https://vercel.com/docs/domains/working-with-domains/add-a-domain).
- [Resend: términos y entidad](https://resend.com/legal/terms-of-service).
- [Resend: contrato de tratamiento y transferencias](https://resend.com/legal/dpa).
- [Resend: seguridad y conservación](https://resend.com/security).
- [Google: condiciones de tratamiento](https://business.safety.google/adsprocessorterms/).
- [AEPD: información a las personas](https://www.aepd.es/derechos-y-deberes/conoce-tus-derechos/derecho-de-informacion).
- [AEPD: ejercicio de derechos y plazos](https://www.aepd.es/derechos-y-deberes/ejerce-tus-derechos).
