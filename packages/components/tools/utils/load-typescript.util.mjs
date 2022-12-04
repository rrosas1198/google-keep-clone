import merge from "lodash.merge";
import { readFileSync } from "node:fs";
import { basename, dirname, resolve } from "node:path";

export function loadTsConfig(rootDir, filename) {
    const filePath = resolve(rootDir, filename);
    const resolved = readFileSync(filePath, { encoding: "utf-8" });
    const tsConfig = JSON.parse(resolved);

    tsConfig.compilerOptions = tsConfig.compilerOptions || {};

    if (typeof tsConfig.extends === "string") {
        const filepath = resolve(dirname(filePath), tsConfig.extends);
        const parent = loadTsConfig(dirname(filepath), basename(filepath));
        tsConfig.compilerOptions = merge(parent.compilerOptions || {}, tsConfig.compilerOptions);
    }

    return tsConfig;
}
