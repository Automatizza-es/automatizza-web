export const contactServices = ["Automatización", "Software a medida", "Inteligencia artificial", "Desarrollo web", "Otro"] as const;
export type ContactField = "name" | "email" | "service" | "message" | "privacy";
export type ContactErrors = Partial<Record<ContactField, string>>;
export type ContactMessage = {
  name: string;
  email: string;
  service: string;
  message: string;
  privacy: true;
};

export function isEmail(value: string) {
  return value.length <= 254 && /^[^\s@<>\x00-\x1f\x7f]+@[^\s@<>\x00-\x1f\x7f]+\.[^\s@<>\x00-\x1f\x7f]+$/.test(value);
}

export function validateContact(input: unknown): { errors: ContactErrors; value?: ContactMessage } {
  const data = input && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const service = typeof data.service === "string" ? data.service : "";
  const message = typeof data.message === "string" ? data.message.replace(/\r\n?/g, "\n").trim() : "";
  const errors: ContactErrors = {};
  if (!name || name.length > 100 || /[\x00-\x1f\x7f]/.test(name)) errors.name = "Escribe tu nombre (máximo 100 caracteres).";
  if (!isEmail(email)) errors.email = "Introduce un email válido.";
  if (service && !(contactServices as readonly string[]).includes(service)) errors.service = "Elige una de las opciones disponibles.";
  if (!message || message.length > 5000 || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(message)) errors.message = "Cuéntanos tu idea (máximo 5.000 caracteres).";
  if (data.privacy !== true) errors.privacy = "Necesitamos que leas y aceptes la política de privacidad.";
  return Object.keys(errors).length ? { errors } : { errors, value: { name, email, service, message, privacy: true } };
}
