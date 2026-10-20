// Launch copy prepared from owner confirmations and official provider terms.
// Owner approved this concrete version on 2026-10-20. Deployment flags remain separate.
// Company identity supplied by the owner on 2026-10-15; registry on 2026-10-16.
// This records its provenance, not an independent registry verification.
// Abbas infrastructure location confirmed by the provider via the owner on 2026-10-20.
export const privacyPolicy: {
  reviewed: boolean;
  version: string;
  legalName: string;
  taxId: string;
  address: string;
  registry: string;
  rightsEmail: string;
  retention: string;
  processors: string;
  transfers: string;
  dpo: string;
} = {
  reviewed: true,
  version: "2026-10-20-prelanzamiento-1",
  legalName: "Grain Store Technology, S.L.",
  taxId: "B56885676",
  address: "Calle Párroco Bartolomé Blanco, 46, 14014 Córdoba, España.",
  registry: "Registro Mercantil de Córdoba, hoja CO-45659, tomo 2946, folio 21.",
  rightsEmail: "info@automatizza.es",
  retention: "Conservamos las consultas durante su gestión. Si no dan lugar a una contratación, las eliminamos como máximo a los 12 meses desde el último contacto, o antes si dejan de ser necesarias. Cuando existe una relación contractual, conservamos la documentación durante los plazos exigidos por las obligaciones contractuales, fiscales y contables aplicables. Cuando proceda, los datos necesarios para atender responsabilidades quedan bloqueados durante sus plazos de prescripción, sin utilizarlos para otros fines.",
  processors: "Para alojar la web utilizamos Vercel Inc. Para enviar los mensajes del formulario utilizamos Resend, servicio de Plus Five Five, Inc. Abbas presta el servicio del buzón info@automatizza.es y ha confirmado que sus instalaciones de tratamiento y copias de seguridad están en Córdoba, España. Estos proveedores acceden a los datos necesarios para prestar sus servicios. No vendemos los datos ni los incorporamos a listas comerciales. También podremos comunicarlos cuando lo exija una obligación legal.",
  transfers: "El alojamiento con Vercel y el envío con Resend pueden implicar tratamiento en Estados Unidos u otros países donde operen sus subencargados. Sus condiciones de tratamiento contemplan garantías para las transferencias internacionales, incluidas las cláusulas contractuales tipo de la Comisión Europea cuando resulten aplicables. La ubicación del buzón de Abbas en Córdoba no implica que los demás servicios traten los datos exclusivamente en España. Puedes consultar las garantías y los subencargados en los enlaces de esta política o solicitar información adicional en info@automatizza.es.",
  dpo: "",
};

export function isPrivacyPolicyReady(policy = privacyPolicy) {
  // A DPO contact is published if one is supplied; an optional designation is
  // not a mandatory text field or a substitute for the owner's final review.
  return policy.reviewed && [
    policy.legalName, policy.taxId, policy.address, policy.registry,
    policy.rightsEmail, policy.retention, policy.processors, policy.transfers,
  ].every((value) => value.trim().length > 0);
}
