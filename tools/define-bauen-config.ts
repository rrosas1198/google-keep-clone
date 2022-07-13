import { defineConfig, mergeConfig, UserConfig } from "bauen";
import { resolve } from "path";

export function defineBauenConfig(rootDir: string, ...configs: UserConfig[]) {
    const baseConfig = defineConfig({
        rootDir,
        run: true,
        parser: "typescript",
        outputs: ["js"],
        externals: ["regenerator-runtime"],
        // preserveModules: true,
        onBundleEnd() {
            console.clear();
        },
        rollupPlugins: {
            alias: {
                entries: {
                    src: resolve(rootDir, "./src")
                }
            },
            raw: {
                include: [/\.sql$/i]
            },
            replace: {
                preventAssignment: true
            }
        }
    });

    return mergeConfig(baseConfig, ...configs);
}
