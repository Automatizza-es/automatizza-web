"use client";

import { useEffect, useRef } from "react";

// Plays a project visual's entrance once, when it is well inside the viewport.
// Adds .is-armed (start state, applied instantly) on mount and .is-playing on
// view; CSS should only declare transitions under .is-playing. Without JS or
// with reduced motion nothing is added, so the CSS default (final state) shows.
export function usePlayOnView<T extends HTMLElement>(threshold = 0.45) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    element.classList.add("is-armed");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < threshold) return;
        element.classList.add("is-playing");
        observer.disconnect();
      },
      { threshold: [0, threshold] },
    );
    observer.observe(element);

    // A deep link can land here while the preceding sticky section is still
    // measuring. Check once after those layout passes as well, so an already
    // visible visual cannot remain hidden in its entrance state.
    let layoutFrame = 0;
    const frame = window.requestAnimationFrame(() => {
      layoutFrame = window.requestAnimationFrame(() => {
        const bounds = element.getBoundingClientRect();
        const visibleWidth = Math.max(0, Math.min(bounds.right, window.innerWidth) - Math.max(bounds.left, 0));
        const visibleHeight = Math.max(0, Math.min(bounds.bottom, window.innerHeight) - Math.max(bounds.top, 0));
        const area = bounds.width * bounds.height;
        if (area > 0 && visibleWidth * visibleHeight / area >= threshold) {
          element.classList.add("is-playing");
          observer.disconnect();
        }
      });
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(layoutFrame);
      element.classList.remove("is-armed", "is-playing");
    };
  }, [threshold]);

  return ref;
}
