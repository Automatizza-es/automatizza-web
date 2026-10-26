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
    const revealed = new WeakSet<Element>();
    const reveal = (element: Element, index = 0) => {
      if (preference.matches || revealed.has(element)) return;
      revealed.add(element);
      const isFlowStep = element.parentElement?.hasAttribute("data-service-flow");
      const isStairStep = element.parentElement?.hasAttribute("data-service-staircase");
      const animation = element.animate([
        { opacity: 0, transform: `translateY(${isFlowStep || isStairStep ? 8 : 10}px)` },
        { opacity: 1, transform: "none" },
      ], {
        duration: isFlowStep ? 720 : 850,
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
        const parent = entry.target.parentElement;
        const index = parent?.hasAttribute("data-service-flow")
          ? Array.from(parent.children).indexOf(entry.target) : 0;
        reveal(entry.target, index);
      }
    }, { rootMargin: "0px 0px -5%", threshold: .15 });

    root.querySelectorAll("[data-service-reveal], [data-service-flow] > li")
      .forEach((element) => observer.observe(element));

    const staircase = root.querySelector("[data-service-staircase]");
    const desktop = window.matchMedia("(min-width: 1000px)");
    // Wait until the lower first step is visible on desktop, then progress
    // from 01 to 04. On narrow screens reveal each row as it comes into view.
    const stairObserver = new IntersectionObserver((entries) => {
      if (!staircase) return;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        if (desktop.matches) {
          if (entry.target !== staircase || entry.intersectionRatio < .6) continue;
          Array.from(staircase.children).forEach((element, index) => reveal(element, index));
          stairObserver.disconnect();
          break;
        }
        if (entry.target === staircase) continue;
        reveal(entry.target, Array.from(staircase.children).indexOf(entry.target));
        stairObserver.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -5%", threshold: [.15, .6] });
    if (staircase) {
      stairObserver.observe(staircase);
      Array.from(staircase.children).forEach((element) => stairObserver.observe(element));
    }

    const stop = () => {
      observer.disconnect();
      stairObserver.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
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
