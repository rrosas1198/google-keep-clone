import { defineNuxtConfig } from "nuxt";
import { resolve } from "path";

export default defineNuxtConfig({
    srcDir: "src",
    telemetry: false,
    components: false,
    css: ["@/assets/styles/index.scss"],
    watch: [resolve(__dirname, "../packages/components"), resolve(__dirname, "../packages/theme")],
    alias: {
        "@keep/components": resolve(__dirname, "../packages/components/src"),
        "@keep/theme": resolve(__dirname, "../packages/theme")
    }
});
