export type ConversationState = "static" | "waiting" | "playing" | "paused" | "complete";
export type ConversationControls = { togglePause(): void; replay(): void; finish(): void; destroy(): void };

// Progressive enhancement only: every message is visible in server HTML and in
// the resting CSS. No live region, network call, analytics event or stored state.
export function mountConversation(root: HTMLElement, onState: (state: ConversationState) => void): ConversationControls {
  const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  let animations: Animation[] = [];
  let state: ConversationState = "static";
  let observer: IntersectionObserver | undefined;
  let disposed = false;
  let started = false;
  const setState = (next: ConversationState) => { state = next; onState(next); };
  const cancel = () => {
    for (const animation of animations) { animation.onfinish = null; animation.cancel(); }
    animations = [];
  };
  const finish = () => { cancel(); observer?.disconnect(); setState(preference.matches ? "static" : "complete"); };
  const supported = "IntersectionObserver" in window && typeof Element.prototype.animate === "function";
  const play = () => {
    if (disposed || preference.matches || !supported) return;
    observer?.disconnect(); cancel(); started = true;
    // A shared 10s timeline keeps bubbles and typing indicators in sync when
    // paused/resumed. All rows retain their full layout throughout playback.
    const duration = 10000;
    const starts = [0, .23, .49, .71];
    const timing = { duration, fill: "none" as FillMode };
    const messages = root.querySelectorAll<HTMLElement>("[data-chat-message]");
    const add = (element: HTMLElement, frames: Keyframe[]) => {
      const animation = element.animate(frames, timing); animations.push(animation); return animation;
    };
    try {
      messages.forEach((element, i) => {
        const at = starts[i];
        add(element, at === 0 ? [{ opacity: 1 }, { opacity: 1 }] : [
          { opacity: 0, transform: "translateY(4px)", offset: 0 },
          { opacity: 0, transform: "translateY(4px)", offset: at },
          { opacity: 1, transform: "none", offset: at + .035 },
          { opacity: 1, transform: "none", offset: 1 },
        ]);
      });
      root.querySelectorAll<HTMLElement>("[data-chat-typing]").forEach((element, i) => {
        const at = i === 0 ? .12 : .62;
        const until = i === 0 ? .23 : .71;
        add(element, [{ opacity: 0, offset: 0 }, { opacity: 0, offset: at },
          { opacity: 1, offset: at + .01 }, { opacity: 1, offset: until - .01 },
          { opacity: 0, offset: until }, { opacity: 0, offset: 1 }]);
      });
      const summary = root.querySelector<HTMLElement>("[data-chat-summary]");
      if (summary) {
        const last = add(summary, [{ opacity: 0, offset: 0 }, { opacity: 0, offset: .87 }, { opacity: 1, offset: .92 }, { opacity: 1, offset: 1 }]);
        last.onfinish = finish;
      } else if (animations.length) animations.at(-1)!.onfinish = finish;
      setState("playing");
    } catch {
      // An unsupported/failed animation must never conceal the approved script.
      cancel(); setState("static");
    }
  };
  const onPreference = () => {
    if (preference.matches) finish();
    // Re-enabling motion never starts the conversation a second time by itself.
  };
  if (supported && !preference.matches) {
    setState("waiting");
    observer = new IntersectionObserver(entries => {
      if (!started && entries.some(entry => entry.isIntersecting)) play();
    }, { threshold: .15 });
    observer.observe(root);
  }
  preference.addEventListener("change", onPreference);
  return {
    togglePause() {
      if (state === "playing") { animations.forEach(animation => animation.pause()); setState("paused"); }
      else if (state === "paused") { animations.forEach(animation => animation.play()); setState("playing"); }
    },
    replay: play,
    finish,
    destroy() { disposed = true; observer?.disconnect(); cancel(); preference.removeEventListener("change", onPreference); },
  };
}
