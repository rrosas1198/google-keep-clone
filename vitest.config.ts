/// <reference types="vitest" />
import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
    test: {
        include: ["src/**/__test__/**/*.spec.ts"]
    },
    resolve: {
        alias: {
            src: resolve(__dirname, "src")
        }
    }
});
