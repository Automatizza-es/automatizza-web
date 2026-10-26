import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";
const source = readFileSync("src/components/services/conversation-motion.ts", "utf8");
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function setup({ reduced = false, supported = true, fail = false } = {}) {
  const animations = [], observers = [], states = [], listeners = new Set();
  class Element {
    animate(frames, timing) {
      if (fail) throw new Error("unsupported animation");
      const animation = { frames, timing, cancelled: false, paused: false, onfinish: null,
        cancel() { this.cancelled = true; }, pause() { this.paused = true; }, play() { this.paused = false; } };
      animations.push(animation); return animation;
    }
  }
  const messages = Array.from({length:4}, () => new Element());
  const typing = Array.from({length:2}, () => new Element());
  const summary = new Element();
  const root = { querySelectorAll: selector => selector === "[data-chat-message]" ? messages : typing, querySelector: () => summary };
  class Observer {
    constructor(callback) { this.callback = callback; this.connected = true; observers.push(this); }
    observe() {}
    disconnect() { this.connected = false; }
    enter() { this.callback([{isIntersecting:true}]); }
  }
  const preference = { matches: reduced, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn) };
  const exports = {};
  runInNewContext(code, { exports, window: { matchMedia: () => preference, ...(supported ? { IntersectionObserver: Observer } : {}) }, Element, IntersectionObserver: Observer });
  const controls = exports.mountConversation(root, state => states.push(state));
  return { controls, animations, states, observers, listeners, reduce() { preference.matches = true; for (const fn of listeners) fn(); } };
}
test("SSR is the readable default; reduced motion and unavailable APIs never hide messages", () => {
  for (const options of [{reduced:true},{supported:false}]) {
    const state = setup(options); state.controls.replay();
    assert.equal(state.animations.length,0); assert.equal(state.observers.length,0);
    state.controls.destroy(); assert.equal(state.listeners.size,0);
  }
});
test("one shared timeline begins only on entering and does not loop", () => {
  const state = setup(); assert.deepEqual(state.states,["waiting"]); assert.equal(state.animations.length,0);
  state.observers[0].enter(); assert.equal(state.animations.length,7);
  state.observers[0].enter(); assert.equal(state.animations.length,7);
  assert.ok(state.animations.every(animation => animation.timing.duration === 10000 && animation.timing.fill === "none"));
  assert.deepEqual(Array.from(state.animations[1].frames,frame=>frame.offset),[0,.23,.265,1]);
  state.animations.at(-1).onfinish(); assert.equal(state.states.at(-1),"complete");
  assert.ok(state.animations.every(animation=>animation.cancelled));
  state.observers[0].enter(); assert.equal(state.animations.length,7);
});
test("pause, resume, replay and show full conversation leave no stale animations", () => {
  const state = setup(); state.observers[0].enter();
  state.controls.togglePause(); assert.equal(state.states.at(-1),"paused"); assert.ok(state.animations.every(a=>a.paused));
  state.controls.togglePause(); assert.equal(state.states.at(-1),"playing"); assert.ok(state.animations.every(a=>!a.paused));
  state.controls.replay(); assert.equal(state.animations.length,14); assert.ok(state.animations.slice(0,7).every(a=>a.cancelled));
  state.controls.finish(); assert.equal(state.states.at(-1),"complete"); assert.ok(state.animations.every(a=>a.cancelled));
  state.controls.replay(); assert.equal(state.animations.length,21);
  state.controls.destroy(); assert.ok(state.animations.every(a=>a.cancelled)); assert.equal(state.listeners.size,0);
});
test("changing to reduced motion immediately restores complete content and prevents replay", () => {
  const state = setup(); state.observers[0].enter(); state.controls.togglePause(); state.reduce();
  assert.equal(state.states.at(-1),"static"); assert.ok(state.animations.every(a=>a.cancelled));
  state.controls.replay(); assert.equal(state.animations.length,7); state.controls.destroy();
});
test("animation API errors restore the static fallback", () => {
  const state = setup({fail:true}); state.observers[0].enter(); assert.equal(state.states.at(-1),"static");
  assert.equal(state.animations.length,0); state.controls.destroy();
});
test("conversation does not include external integrations, tracking or live announcements", () => {
  const view = readFileSync("src/components/services/IllustrativeConversation.tsx","utf8");
  for(const value of ["fetch(","dataLayer","trackContact","aria-live","role=\"log\"","<iframe","<video"])assert.ok(!source.includes(value)&&!view.includes(value));
});
