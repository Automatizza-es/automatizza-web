const campaignFields = [
  ["utm_source", 40],
  ["utm_medium", 24],
  ["utm_campaign", 64],
] as const;

const campaignSlug = /^[a-z][a-z0-9]*(?:[-_][a-z0-9]+)*$/;
const sensitiveLabel = /(?:^|[-_])(?:api[-_]?key|access[-_]?token|token|secret|password|passwd|email[-_]address|e[-_]mail|phone|telefono|dni|nif|nie|uuid|user[-_]?id|customer[-_]?id)(?:$|[-_])/;
const opaqueHex = /(?:^|[-_])[a-f0-9]{16,}(?:$|[-_])/;
const uuid = /(?:^|[-_])[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}(?:$|[-_])/;

export function campaignQuery(search: string) {
  const input = new URLSearchParams(search);
  const output = new URLSearchParams();
  for (const [key, maxLength] of campaignFields) {
    const [value, duplicate] = input.getAll(key);
    // Reject the whole tuple on ambiguity or unsafe input. The pattern also
    // excludes URL punctuation, email addresses, whitespace and encoded variants.
    if (!value || duplicate !== undefined || value.length > maxLength || !campaignSlug.test(value)
      || sensitiveLabel.test(value) || opaqueHex.test(value) || uuid.test(value)
      || value.replace(/[^0-9]/g, "").length >= 9) return "";
    output.set(key, value);
  }
  return output.toString();
}
