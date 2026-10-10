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

    return () => {
      observer.disconnect();
      element.classList.remove("is-armed", "is-playing");
    };
  }, [threshold]);

  return ref;
}
