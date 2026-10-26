"use client";

import { useEffect } from "react";

export function ProcessAutomationMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.getElementById("process-automation-content");
    if (preference.matches || !root || !("IntersectionObserver" in window) ||
        typeof Element.prototype.animate !== "function") return;

    // The homepage's editorial easing, scoped to this page. Content stays
    // visible in server HTML: nothing is hidden while waiting for JavaScript.
    const animations = new Set<Animation>();
    const revealed = new WeakSet<HTMLElement>();
    const prepared = new Map<HTMLElement, string>();
    const restore = (element: HTMLElement, transform: string) => {
      if (transform) element.style.transform = transform;
      else element.style.removeProperty("transform");
    };
    const prepare = (element: HTMLElement) => {
      // Never reset an element the reader can already see. Only offset content
      // below the viewport; it remains fully readable if JavaScript stops.
      if (element.getBoundingClientRect().top < window.innerHeight) {
        revealed.add(element);
        return false;
      }
      const transform = element.style.transform;
      prepared.set(element, transform);
      element.style.transform = `translateY(6px) ${transform}`;
      return true;
    };
    const reveal = (element: HTMLElement, index = 0) => {
      if (preference.matches || revealed.has(element) || !prepared.has(element)) return;
      revealed.add(element);
      const transform = prepared.get(element)!;
      prepared.delete(element);
      // Restore the resting style before animating, so finishing or cancelling
      // cannot jump back to the initial position. Opacity stays at 1 throughout.
      restore(element, transform);
      const animation = element.animate([
        { transform: `translateY(6px) ${transform}` },
        { transform: transform || "none" },
      ], {
        duration: 850,
        easing: "cubic-bezier(.22,.7,.25,1)",
        delay: index * 140,
        fill: "backwards",
      });
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        reveal(entry.target as HTMLElement);
      }
    }, { rootMargin: "0px 0px -5%", threshold: .15 });

    root.querySelectorAll<HTMLElement>("[data-service-reveal]")
      .forEach((element) => { if (prepare(element)) observer.observe(element); });

    const staircase = root.querySelector<HTMLElement>("[data-service-staircase]");
    const stairSteps = staircase ? Array.from(staircase.querySelectorAll<HTMLElement>(":scope > li")) : [];
    const desktop = window.matchMedia("(min-width: 1000px)");
    // Wait until the lower first step is visible on desktop, then progress
    // from 01 to 04. On narrow screens reveal each row as it comes into view.
    const stairObserver = new IntersectionObserver((entries) => {
      if (!staircase) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (desktop.matches) {
          if (entry.target !== staircase || entry.intersectionRatio < .6) continue;
          stairSteps.forEach((element, index) => reveal(element, index));
          stairObserver.disconnect();
          break;
        }
        if (entry.target === staircase) continue;
        reveal(entry.target as HTMLElement, stairSteps.indexOf(entry.target as HTMLElement));
        stairObserver.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -5%", threshold: [.15, .6] });
    if (staircase) {
      stairObserver.observe(staircase);
      stairSteps.forEach((element) => { if (prepare(element)) stairObserver.observe(element); });
    }

    const stop = () => {
      observer.disconnect();
      stairObserver.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      prepared.forEach((transform, element) => restore(element, transform));
      prepared.clear();
    };
    const onPreferenceChange = () => { if (preference.matches) stop(); };
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      stop();
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, []);

  return null;
}
