import { defineNuxtConfig } from "nuxt";
import { resolve } from "path";

export default defineNuxtConfig({
    srcDir: "src",
    telemetry: false,
    components: false,
    css: ["@/assets/styles/index.scss"],
    watch: [resolve(__dirname, "../packages/components"), resolve(__dirname, "../packages/theme")],
    plugins: ["@/plugins/platform.plugin.ts"],
    alias: {
        "@keep/components": resolve(__dirname, "../packages/components/src"),
        "@keep/platform-nuxt": resolve(__dirname, "../packages/platform-nuxt/src"),
        "@keep/theme": resolve(__dirname, "../packages/theme"),
        src: resolve(__dirname, "src")
    }
});
