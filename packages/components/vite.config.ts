/* eslint-disable @typescript-eslint/no-explicit-any */
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";
import { defineConfig, searchForWorkspaceRoot } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            "@keep/theme": resolve(__dirname, "./../theme"),
            src: resolve(__dirname, "./src")
        }
    },
    plugins: [vue() as any, vueJsx() as any],
    server: {
        fs: {
            allow: [searchForWorkspaceRoot(resolve(__dirname, "../theme"))]
        }
    }
});
