// Complete and review these facts before enabling contact submissions.
// Company identity supplied directly by the owner on 2026-10-15.
// This records its provenance, not an independent registry verification.
export const privacyPolicy: {
  reviewed: boolean;
  version: string;
  legalName: string;
  taxId: string;
  address: string;
  rightsEmail: string;
  retention: string;
  processors: string;
  transfers: string;
  dpo: string;
} = {
  reviewed: false,
  version: "2026-10-15-borrador-2",
  legalName: "Grain Store Technology, S.L.",
  taxId: "B56885676",
  address: "Calle Párroco Bartolomé Blanco, 46, 14014 Córdoba, España.",
  rightsEmail: "info@automatizza.es",
  retention: "",
  processors: "",
  transfers: "",
  dpo: "",
};

export function isPrivacyPolicyReady() {
  return privacyPolicy.reviewed && [
    privacyPolicy.legalName, privacyPolicy.taxId, privacyPolicy.address,
    privacyPolicy.rightsEmail, privacyPolicy.retention, privacyPolicy.processors,
    privacyPolicy.transfers, privacyPolicy.dpo,
  ].every((value) => value.trim().length > 0);
}
