"use client";

import { useEffect } from "react";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { localePath } from "@/lib/i18n/routes";
import { useRouter } from "next/navigation";

// Fragments never reach the server. Keep bookmarked home anchors working on
// initial hydration and native hash navigation without adding a history entry.
export function LegacyContactRedirect() {
  const { locale } = useI18n();
  const router = useRouter();
  useEffect(() => {
    const redirect = () => {
      if (window.location.pathname === localePath("home", locale) && window.location.hash === "#contacto") {
        router.replace(localePath("contact", locale)!, { scroll: true });
      }
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [router, locale]);
  return null;
}
