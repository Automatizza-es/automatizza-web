import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const build = mkdtempSync(join(tmpdir(), "automatizza-contact-tests-"));
try {
  const compilation = spawnSync(process.execPath, [
    "node_modules/typescript/bin/tsc", "--ignoreConfig", "--skipLibCheck", "--esModuleInterop",
    "--strict", "--types", "node", "--target", "ES2022", "--module", "Node16", "--moduleResolution", "Node16",
    "--rootDir", "src", "--outDir", build, "src/lib/contact/server.ts",
  ], { stdio: "inherit" });
  if (compilation.status !== 0) process.exitCode = compilation.status ?? 1;
  else {
    const test = spawnSync(process.execPath, ["--test", "tests/contact.test.mjs"], {
      stdio: "inherit", env: { ...process.env, CONTACT_TEST_BUILD: build },
    });
    process.exitCode = test.status ?? 1;
  }
} finally { rmSync(build, { recursive: true, force: true }); }
