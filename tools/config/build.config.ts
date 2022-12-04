import { resolve } from "node:path";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    declaration: true,
    entries: ["src/index"],
    externals: ["postcss", "prettier", "stylelint", "unbuild", "vite"],
    alias: {
        src: resolve(__dirname, "src")
    },
    rollup: {
        emitCJS: true
    }
});
