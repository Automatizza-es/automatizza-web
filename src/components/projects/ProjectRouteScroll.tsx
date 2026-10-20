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
    const projectAnchor = pathname === "/" && window.location.hash === "#proyectos" && !historyNavigation.current;
    previousPath.current = pathname;
    historyNavigation.current = false;
    if (projectAnchor) {
      // The showcase above the project list measures its sticky layout during
      // hydration. Align after those first layout passes, rather than keeping
      // the browser's anchor position from the shorter server-rendered page.
      let layoutFrame = 0;
      const frame = window.requestAnimationFrame(() => {
        layoutFrame = window.requestAnimationFrame(() => {
          if (window.location.hash !== "#proyectos") return;
          const section = document.getElementById("proyectos");
          if (!section) return;
          const headerHeight = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 80;
          window.scrollTo({ top: window.scrollY + section.getBoundingClientRect().top - headerHeight, behavior: "instant" });
        });
      });
      return () => {
        window.cancelAnimationFrame(frame);
        window.cancelAnimationFrame(layoutFrame);
      };
    }
    if (!shouldReset) return;
    const frame = window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "instant" }));
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
