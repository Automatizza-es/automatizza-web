import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const code = ts.transpileModule(readFileSync("src/components/pages/ProcessAutomationMotion.tsx", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
function setup({ reduced = false, supported = true, staircase = false } = {}) {
  const observers = [], animations = [], listeners = new Set();
  class Element {
    constructor(top, transform = "") { this.top = top; this.style = { transform, removeProperty(key) { delete this[key]; } }; }
    getBoundingClientRect() { return { top: this.top }; }
    animate(frames, options) { const animation = { frames, options, cancelled: false, cancel() { this.cancelled = true; } }; animations.push(animation); return animation; }
  }
  const visible = new Element(100), below = new Element(2000, "scale(1)");
  const steps = Array.from({ length: 4 }, () => new Element(2200));
  const stair = { querySelectorAll: () => steps };
  const root = { querySelectorAll: () => [visible, below], querySelector: () => staircase ? stair : null };
  let requestedRoot, effect;
  const preference = { matches: reduced, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) };
  class Observer {
    constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
    observe(target) { this.targets.add(target); }
    unobserve(target) { this.targets.delete(target); }
    disconnect() { this.targets.clear(); }
    enter(target, ratio = 1) { this.callback([{ target, isIntersecting: true, intersectionRatio: ratio }]); }
  }
  const window = { innerHeight: 900, matchMedia: query => query.includes("reduced-motion") ? preference : { matches: true }, ...(supported ? { IntersectionObserver: Observer } : {}) };
  const exports = {};
  runInNewContext(code, { exports, require: () => ({ useEffect: callback => { effect = callback; } }), window, document: { getElementById: id => { requestedRoot = id; return root; } }, Element, IntersectionObserver: Observer });
  exports.ProcessAutomationMotion({ rootId: "software-service-content-fr" });
  const cleanup = effect();
  return { observers, animations, listeners, visible, below, steps, stair, requestedRoot, cleanup, reduce() { preference.matches = true; for (const fn of listeners) fn(); } };
}

test("reduced motion and unavailable APIs leave server-rendered content untouched", () => {
  for (const options of [{ reduced: true }, { supported: false }]) {
    const state = setup(options);
    assert.equal(state.observers.length, 0); assert.equal(state.animations.length, 0);
    assert.equal(state.visible.style.transform, ""); assert.equal(state.below.style.transform, "scale(1)");
  }
});
test("each service scopes motion to its own root and never resets visible content", () => {
  const state = setup();
  assert.equal(state.requestedRoot, "software-service-content-fr");
  assert.equal(state.visible.style.transform, "");
  assert.equal(state.observers[0].targets.has(state.visible), false);
  assert.equal(state.below.style.transform, "translateY(6px) scale(1)");
  state.observers[0].enter(state.below); state.observers[0].enter(state.below);
  assert.equal(state.animations.length, 1); assert.equal(state.animations[0].options.duration, 850);
  assert.equal(state.below.style.transform, "scale(1)");
  for (const frame of state.animations[0].frames) assert.equal(Object.hasOwn(frame, "opacity"), false);
  state.cleanup(); assert.equal(state.animations[0].cancelled, true); assert.equal(state.listeners.size, 0);
});
test("the staircase runs one short sequence after entering, without replaying", () => {
  const state = setup({ staircase: true });
  state.observers[1].enter(state.stair, .15); assert.equal(state.animations.length, 0);
  state.observers[1].enter(state.stair, .6); state.observers[1].enter(state.stair, 1);
  assert.deepEqual(state.animations.map(animation => animation.options.delay), [0, 140, 280, 420]);
  assert.ok(state.steps.every(step => !step.style.transform));
  state.reduce(); assert.ok(state.animations.every(animation => animation.cancelled));
  assert.ok(state.observers.every(observer => observer.targets.size === 0));
  assert.equal(state.below.style.transform, "scale(1)"); state.cleanup();
});
test("leaving the route restores pending styles and disconnects all observers", () => {
  const state = setup({ staircase: true }); state.cleanup();
  assert.equal(state.below.style.transform, "scale(1)"); assert.ok(state.steps.every(step => !step.style.transform));
  assert.ok(state.observers.every(observer => observer.targets.size === 0)); assert.equal(state.listeners.size, 0);
});
