/// <reference types="vitest" />
import { resolve } from "node:path";
import type { UserConfig } from "vite";

export function defineVitestConfig(rootDir: string) {
    return <UserConfig>{
        test: {
            include: ["src/**/__test__/**/*.spec.ts", "src/**/__test__/**/*.spec.tsx"]
        },
        resolve: {
            alias: {
                src: resolve(rootDir, "./src")
            }
        }
    };
}
