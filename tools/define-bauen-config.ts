import { defineConfig } from "bauen";
import { resolve } from "path";

export function defineBauenConfig(rootDir: string) {
    return defineConfig({
        rootDir,
        entries: ["./src/index.ts"],
        outputs: ["js"],
        parser: "swc",
        preserveModules: true,
        rollupPlugins: {
            alias: {
                entries: {
                    src: resolve(rootDir, "./src")
                }
            },
            replace: {
                preventAssignment: true
            }
        }
    });
}
