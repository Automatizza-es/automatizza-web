import { pageMetadata } from "./seo";
import { localePath, type Locale } from "./i18n/routes";
import { translator } from "./i18n/translate";

export function calculatorMetadata(locale: Locale = "es") {
  const t = translator(locale);
  return pageMetadata(
    localePath("calculator", locale)!,
    t("Calculadora de automatización | Automatizza"),
    t("Estima el tiempo y el valor económico que podrías recuperar al automatizar tareas repetitivas de tu empresa."),
  );
}
