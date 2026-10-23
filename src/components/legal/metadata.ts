import { legalTranslator } from "@/lib/i18n/legal";
import { equivalents, type Locale, legalRoutes } from "@/lib/i18n/routes";
import { pageMetadata } from "@/lib/seo";

export type LegalRoute = typeof legalRoutes[number];

export function legalPageMetadata(id: LegalRoute, locale: Locale) {
  const t = legalTranslator(locale);
  const copy = {
    privacy: ["Política de privacidad | Automatizza", "Cómo trata Automatizza los datos de contacto, sus finalidades, conservación, proveedores y el ejercicio de tus derechos."],
    cookies: ["Política de cookies | Automatizza", "Cookies y almacenamiento de Automatizza: finalidad, duración y opciones para aceptar, rechazar o retirar la medición estadística."],
    legal: ["Aviso legal | Automatizza", "Identificación de Grain Store Technology, S.L., titular de Automatizza, y condiciones de uso del sitio web."],
  }[id];
  return {
    ...pageMetadata(equivalents(id)[locale]!, t(copy[0]), t(copy[1])),
    robots: { index: false, follow: false },
  };
}
