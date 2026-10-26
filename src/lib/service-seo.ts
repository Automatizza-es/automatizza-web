import { pageMetadata } from "./seo";
import { localePath, type Locale } from "./i18n/routes";
import { translator } from "./i18n/translate";

export const serviceSeo = {
  "bespoke-software": {
    title: "Software a medida para empresas | Automatizza",
    description: "Desarrollamos aplicaciones a medida para gestionar clientes, reservas y operaciones. Valoramos qué necesita tu equipo y definimos una solución adaptada a tu empresa.",
  },
  "process-automation": {
    title: "Automatización de procesos para empresas | Automatizza",
    description: "Conectamos herramientas y automatizamos solicitudes, documentos y seguimientos. Revisamos tu proceso y definimos qué automatizar y qué debe seguir bajo revisión.",
  },
} as const;

export function serviceMetadata(id: keyof typeof serviceSeo, locale: Locale) {
  const t = translator(locale);
  return pageMetadata(localePath(id, locale)!, t(serviceSeo[id].title), t(serviceSeo[id].description));
}
