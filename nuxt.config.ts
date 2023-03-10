import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const resolveCtx = (...segments: string[]) => resolve(__dirname, ...segments);

export default defineNuxtConfig({
    srcDir: "src",
    telemetry: false,
    components: false,
    alias: {
        src: resolveCtx("src")
    },
    css: ["src/assets/styles/main.scss"],
    modules: ["nuxt-schema-org"],
    postcss: {
        plugins: {
            "css-declaration-sorter": {
                order: "concentric-css"
            }
        }
    }
});
