"use client";
import Link from "next/link";
import { localizeHref, resolveRoute } from "@/lib/i18n/routes";
import { useI18n } from "./LocaleProvider";
import type { ComponentProps } from "react";
export default function LocaleLink({ children, ...props }: ComponentProps<typeof Link>) {
  const { locale, t } = useI18n();
  const href = typeof props.href === "string" ? localizeHref(props.href, locale) : props.href;
  const route = typeof href === "string" ? resolveRoute(href.split("#")[0]) : null;
  const legalInSpanish = locale !== "es" && route && ["privacy", "cookies", "legal"].includes(route.id);
  return <Link {...props} href={href} hrefLang={legalInSpanish ? "es" : props.hrefLang}>
    {children}{legalInSpanish ? ` (${t("En español")})` : null}
  </Link>;
}
