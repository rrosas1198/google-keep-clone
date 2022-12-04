import { resolve } from "node:path";
import type { BuildConfig } from "unbuild";

export function UnbuildBaseConfig(rootDir: string) {
    return <BuildConfig>{
        rootDir,
        declaration: true,
        alias: {
            src: resolve(rootDir, "src")
        },
        rollup: {
            emitCJS: true
        }
    };
}
