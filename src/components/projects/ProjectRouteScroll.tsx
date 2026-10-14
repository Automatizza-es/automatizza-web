"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The shared, tall <main> remains visible between project routes, so Next's
// automatic scrolling can retain the previous project's position. Reset only
// fresh project navigation; let browser history restore its saved position.
export function ProjectRouteScroll() {
  const pathname = usePathname();
  const previousPath = useRef(pathname);
  const historyNavigation = useRef(false);

  useEffect(() => {
    const onPopState = () => { historyNavigation.current = true; };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const shouldReset = previousPath.current !== pathname && pathname.startsWith("/proyectos/") && !historyNavigation.current && !window.location.hash;
    previousPath.current = pathname;
    historyNavigation.current = false;
    if (!shouldReset) return;
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
