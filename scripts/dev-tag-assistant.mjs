import { spawn } from "node:child_process";
import { createRequire } from "node:module";

if (process.env.VERCEL === "1") throw new Error("La prueba de Tag Assistant solo se ejecuta en local.");
const require = createRequire(import.meta.url);
// Process-only flags: do not edit .env.local, approve legal drafts, or enable
// contact delivery. A separate build directory leaves existing servers intact.
const child = spawn(process.execPath, [require.resolve("next/dist/bin/next"), "dev", "--hostname", "127.0.0.1", "--port", "3003"], {
  stdio: "inherit",
  env: {
    ...process.env, NODE_ENV: "development",
    ANALYTICS_ENABLED: "false", ANALYTICS_PREVIEW: "false", ANALYTICS_TAG_ASSISTANT: "true",
    CONTACT_FORM_ENABLED: "false", CONTACT_FORM_TEST_MODE: "false",
  },
});
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("error", (error) => { console.error(error.message); process.exitCode = 1; });
child.on("exit", (code) => { process.exitCode = code ?? 1; });
