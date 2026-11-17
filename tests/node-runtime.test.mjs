import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { isSupportedNodeRuntime } from "../scripts/check-node-runtime.mjs";

test("accepts the security floor and later stable Node 24 updates", () => {
  for (const version of ["v24.22.3", "24.22.4", "24.23.0", "24.100.0"]) {
    assert.equal(isSupportedNodeRuntime(version), true, version);
  }
});

test("rejects older patches, different release lines and unstable versions", () => {
  for (const version of [
    "24.21.99", "24.22.0", "24.22.1", "24.22.2", "23.10.0", "22.23.5",
    "26.13.1", "v24.23.0-rc.1", "v24.22", "24.022.3", "unknown",
  ]) {
    assert.equal(isSupportedNodeRuntime(version), false, version);
  }
});

test("development and deployment scripts enforce the floor and select the same major", () => {
  const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
  const manifest = JSON.parse(read("package.json"));
  const lock = JSON.parse(read("package-lock.json"));
  assert.equal(read(".nvmrc").trim(), "24");
  assert.equal(manifest.engines.node, "24.x");
  assert.equal(lock.packages[""].engines.node, "24.x");
  for (const script of ["dev", "dev:tag-assistant", "build", "start"]) {
    assert.match(manifest.scripts[script], /^node scripts\/check-node-runtime\.mjs && /);
  }
});

test("the CLI checks the actual Node binary, including with Vercel environment flags", () => {
  const allowed = isSupportedNodeRuntime(process.version);
  for (const environment of [{}, { VERCEL: "1", VERCEL_ENV: "production" }, { VERCEL: "1", VERCEL_ENV: "preview" }]) {
    const result = spawnSync(process.execPath, ["scripts/check-node-runtime.mjs"], {
      env: { ...process.env, ...environment },
      encoding: "utf8",
    });
    assert.ifError(result.error);
    assert.equal(result.status, allowed ? 0 : 1);
    assert.ok((allowed ? result.stdout : result.stderr).includes(process.version));
  }
});
