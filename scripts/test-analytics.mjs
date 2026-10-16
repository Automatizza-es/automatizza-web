import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const build = mkdtempSync(join(tmpdir(), "automatizza-analytics-tests-"));
try {
  const result = spawnSync(process.execPath, [
    "node_modules/typescript/bin/tsc", "--ignoreConfig", "--skipLibCheck", "--strict", "--types", "node",
    "--target", "ES2022", "--module", "Node16", "--moduleResolution", "Node16", "--rootDir", "src",
    "--outDir", build, "src/lib/analytics/browser.ts", "src/lib/analytics/config.ts",
  ], { stdio: "inherit" });
  if (result.status !== 0) process.exitCode = result.status ?? 1;
  else process.exitCode = spawnSync(process.execPath, ["--test", "tests/analytics.test.mjs"], {
    stdio: "inherit", env: { ...process.env, ANALYTICS_TEST_BUILD: build },
  }).status ?? 1;
} finally { rmSync(build, { recursive: true, force: true }); }
