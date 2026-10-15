// Complete and review these facts before enabling contact submissions.
// No company identity has been verified in the repository or its legal history.
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
  version: "2026-10-15-borrador",
  legalName: "",
  taxId: "",
  address: "",
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
