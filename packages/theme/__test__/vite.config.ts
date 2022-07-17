import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    resolve: {
        alias: {
            src: resolve(__dirname, "..")
        }
    }
});
