// Complete and review these facts before enabling contact submissions.
// Company identity supplied by the owner on 2026-10-15; registry on 2026-10-16.
// This records its provenance, not an independent registry verification.
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
  reviewed: false,
  version: "2026-10-16-borrador-4",
  legalName: "Grain Store Technology, S.L.",
  taxId: "B56885676",
  address: "Calle Párroco Bartolomé Blanco, 46, 14014 Córdoba, España.",
  registry: "Registro Mercantil de Córdoba, hoja CO-45659, tomo 2946, folio 21.",
  rightsEmail: "info@automatizza.es",
  retention: "Propuesta pendiente de aprobación: gestionar las consultas durante el tiempo necesario para responderlas y conservar las que no den lugar a contratación durante un máximo de 12 meses desde el último contacto. Al finalizar, suprimirlas o bloquear únicamente los datos necesarios para atender responsabilidades durante los plazos legales que correspondan. Los expedientes de clientes se rigen por sus obligaciones contractuales, fiscales y contables. Quedan pendientes de confirmar el procedimiento de borrado del buzón y los plazos de copias y registros de los proveedores.",
  processors: "Vercel interviene en el alojamiento web y Resend en el envío transaccional. La titular identifica a Abbas como proveedor del correo de info@automatizza.es. Quedan pendientes de validar las entidades y contratos aplicables, el alojamiento efectivo del buzón, los subencargados, los países de tratamiento y los plazos de conservación.",
  transfers: "",
  dpo: "",
};

export function isPrivacyPolicyReady() {
  return privacyPolicy.reviewed && [
    privacyPolicy.legalName, privacyPolicy.taxId, privacyPolicy.address, privacyPolicy.registry,
    privacyPolicy.rightsEmail, privacyPolicy.retention, privacyPolicy.processors,
    privacyPolicy.transfers, privacyPolicy.dpo,
  ].every((value) => value.trim().length > 0);
}
