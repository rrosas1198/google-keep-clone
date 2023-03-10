import { resolve } from "node:path";

export function resolveCwd(...segments: string[]) {
    return resolve(process.cwd(), ...segments);
}
