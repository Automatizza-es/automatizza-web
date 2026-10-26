"use client";

import { useEffect } from "react";

export function ProcessAutomationMotion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.getElementById("process-automation-content");
    if (preference.matches || !root || !("IntersectionObserver" in window) ||
        typeof Element.prototype.animate !== "function") return;

    // The homepage's timing and easing, scoped to this page. Content stays
    // visible in server HTML: nothing is hidden while waiting for JavaScript.
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        if (preference.matches) continue;

        const isFlowStep = entry.target.parentElement?.hasAttribute("data-service-flow");
        const index = isFlowStep ? Array.from(entry.target.parentElement!.children).indexOf(entry.target) : 0;
        const animation = entry.target.animate([
          { opacity: .55, transform: `translateY(${isFlowStep ? 4 : 6}px)` },
          { opacity: 1, transform: "none" },
        ], {
          duration: isFlowStep ? 420 : 520,
          easing: "cubic-bezier(.22,.7,.25,1)",
          delay: index * 70,
          fill: "backwards",
        });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    }, { rootMargin: "0px 0px -9%", threshold: .08 });

    root.querySelectorAll("[data-service-reveal], [data-service-flow] > li")
      .forEach((element) => observer.observe(element));

    const stop = () => {
      observer.disconnect();
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
