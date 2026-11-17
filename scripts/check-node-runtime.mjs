import { pathToFileURL } from "node:url";

export const minimumNodeVersion = "24.22.3";
const [supportedMajor, minimumMinor, minimumPatch] = minimumNodeVersion.split(".").map(Number);

export function isSupportedNodeRuntime(version) {
  const match = /^v?(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.exec(version);
  if (!match) return false;
  const [major, minor, patch] = match.slice(1).map(Number);
  return [major, minor, patch].every(Number.isSafeInteger) && major === supportedMajor
    && (minor > minimumMinor || (minor === minimumMinor && patch >= minimumPatch));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!isSupportedNodeRuntime(process.version)) {
    console.error(`[node-runtime] Node ${process.version} no cumple la política del proyecto. Usa Node ${supportedMajor} LTS estable, desde ${minimumNodeVersion}. En local: nvm install && nvm use. En Vercel: verifica la versión suministrada para ${supportedMajor}.x.`);
    process.exitCode = 1;
  } else {
    console.info(`[node-runtime] Node ${process.version}`);
  }
}
