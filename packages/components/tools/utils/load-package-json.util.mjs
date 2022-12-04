import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function loadPackageJson(rootDir) {
    const raw = readFileSync(resolve(rootDir, "package.json"));
    return JSON.parse(raw.toString());
}
