"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Fragments never reach the server. Keep bookmarked home anchors working on
// initial hydration and native hash navigation without adding a history entry.
export function LegacyContactRedirect() {
  const router = useRouter();
  useEffect(() => {
    const redirect = () => {
      if (window.location.pathname === "/" && window.location.hash === "#contacto") {
        router.replace("/contacto", { scroll: true });
      }
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [router]);
  return null;
}
