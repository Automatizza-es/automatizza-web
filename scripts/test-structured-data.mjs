import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const build = mkdtempSync(join(tmpdir(), "automatizza-structured-data-"));
try {
  const compilation = spawnSync(process.execPath, [
    "node_modules/typescript/bin/tsc", "--ignoreConfig", "--skipLibCheck", "--strict",
    "--types", "node", "--target", "ES2022", "--module", "Node16",
    "--moduleResolution", "Node16", "--rootDir", "src", "--outDir", build,
    "src/lib/structured-data.ts",
  ], { stdio: "inherit" });
  if (compilation.status !== 0) process.exitCode = compilation.status ?? 1;
  else process.exitCode = spawnSync(process.execPath, ["--test", "tests/structured-data.test.mjs"], {
    stdio: "inherit", env: { ...process.env, STRUCTURED_DATA_TEST_BUILD: build },
  }).status ?? 1;
} finally { rmSync(build, { recursive: true, force: true }); }
