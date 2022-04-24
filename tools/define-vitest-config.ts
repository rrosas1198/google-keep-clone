/// <reference types="vitest" />
import { resolve } from "path";
import { defineConfig } from "vite";

export function defineVitestConfig(rootDir: string) {
    return defineConfig({
        test: {
            include: ["src/**/__test__/**/*.spec.ts"]
        },
        resolve: {
            alias: {
                src: resolve(rootDir, "./src")
            }
        }
    });
}
