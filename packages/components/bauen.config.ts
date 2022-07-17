import vue from "@vitejs/plugin-vue";
import { Plugin } from "rollup";
import { defineBauenConfig } from "../../tools/define-bauen-config";

export default defineBauenConfig(__dirname, {
    entries: ["./src/index.ts"],
    rollupPlugins: {
        esbuild: {
            jsx: "transform",
            loaders: { ".vue": "ts" }
        }
    },
    mapRollupPlugins: (plugins: Plugin[]) => {
        const index = plugins.findIndex(plugin => plugin.name === "esbuild");
        plugins.splice(index, 0, vue());
        return plugins;
    }
});
