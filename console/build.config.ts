/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnbuildBaseConfig } from "@keep/config";
import { createFilter } from "@rollup/pluginutils";
import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    preset: UnbuildBaseConfig(__dirname),
    entries: ["src/main"],
    hooks: {
        "rollup:options"(_ctx, options) {
            const plugins = options.plugins as any[];
            const rawIndex = plugins.findIndex(plugin => plugin.name === "unbuild-raw");

            plugins[rawIndex] = _createRawPlugin();
        }
    }
});

function _createRawPlugin() {
    const filter = createFilter([/\.(md|txt|css|htm|html|sql)$/], []);

    return {
        name: "unbuild-raw",
        transform(code: string, id: string) {
            if (!filter(id)) return;

            return {
                code: `export default ${JSON.stringify(code)}`,
                map: null
            };
        }
    };
}
