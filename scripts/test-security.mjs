import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
const build = mkdtempSync(join(tmpdir(), "automatizza-security-tests-"));
try {
  const compilation = spawnSync(process.execPath, ["node_modules/typescript/bin/tsc", "--ignoreConfig", "--skipLibCheck", "--strict", "--types", "node", "--target", "ES2022", "--module", "Node16", "--moduleResolution", "Node16", "--rootDir", "src", "--outDir", build, "src/lib/security-policy.ts", "src/lib/csp-report.ts"], { stdio: "inherit" });
  process.exitCode = compilation.status === 0 ? spawnSync(process.execPath, ["--test", "tests/security.test.mjs"], { stdio: "inherit", env: { ...process.env, SECURITY_TEST_BUILD: build } }).status ?? 1 : compilation.status ?? 1;
} finally { rmSync(build, { recursive: true, force: true }); }
