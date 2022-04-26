import { defineConfig } from "bauen";
import { resolve } from "path";
import { killActiveProcesses, runNpmScript } from "./run-npm-script";

export function defineBauenConfig(rootDir: string) {
    return defineConfig({
        rootDir,
        entries: ["./src/index.ts"],
        outputs: ["js"],
        parser: "swc",
        externals: ["regenerator-runtime"],
        // preserveModules: true,
        onBundleStart() {
            killActiveProcesses();
        },
        onBundleEnd() {
            console.clear();
            runNpmScript("start");
        },
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
