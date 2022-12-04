import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { rollup } from "rollup";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";
import { loadPackageJson } from "./utils/load-package-json.util.mjs";
import { loadTsConfig } from "./utils/load-typescript.util.mjs";
import { remove } from "./utils/remove.util.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const resolveCtx = (...segments) => resolve(__dirname, "../", ...segments);

const packageJson = loadPackageJson(resolve(__dirname, ".."));
const tsConfig = loadTsConfig(resolve(__dirname, ".."), "tsconfig.json");

/** @type import("rollup").RollupOptions */
const buildConfig = {
    input: resolveCtx("src/index.ts"),
    external: [
        ...Object.keys(packageJson.dependencies || []),
        ...Object.keys(packageJson.peerDependencies || [])
    ],
    plugins: [
        alias({
            entries: {
                src: resolveCtx("src")
            }
        }),
        nodeResolve({
            mainFields: ["module", "jsnext", "main"],
            browser: false,
            extensions: [".ts", ".tsx", ".mjs", ".cjs", ".js", ".jsx"],
            exportConditions: ["node"],
            preferBuiltins: true
        }),
        json({
            preferConst: true
        }),
        vue({}),
        esbuild({
            include: /\.[jt]sx?$/,
            exclude: /node_modules/,
            sourceMap: tsConfig.compilerOptions.sourceMap,
            target: tsConfig.compilerOptions.target,
            treeShaking: true,
            jsx: "transform",
            jsxFactory: tsConfig.compilerOptions.jsxFactory,
            jsxFragment: tsConfig.compilerOptions.jsxFragmentFactory,
            loaders: { ".vue": "ts" }
        })
    ]
};

/** @type import("rollup").OutputOptions[] */
const baseOutputs = [
    // {
    //     dir: resolveCtx("dist"),
    //     entryFileNames: "[name].cjs",
    //     chunkFileNames: "chunks/[hash].cjs",
    //     format: "cjs",
    //     exports: "auto",
    //     preserveModules: true,
    //     externalLiveBindings: false,
    //     freeze: false,
    //     generatedCode: {
    //         constBindings: true
    //     }
    // },
    {
        dir: resolveCtx("dist"),
        entryFileNames: "[name].mjs",
        chunkFileNames: "chunks/[hash].mjs",
        format: "esm",
        exports: "auto",
        preserveModules: true,
        externalLiveBindings: false,
        freeze: false,
        generatedCode: {
            constBindings: true
        }
    }
];

/** @type import("rollup").OutputOptions[] */
const typesOutputs = [
    {
        dir: resolveCtx("dist"),
        format: "esm",
        preserveModules: true
    }
];

async function main() {
    await remove(resolveCtx("dist"));

    const processes = [];

    //#region BaseOutputs
    const baseBuilder = await rollup(buildConfig);

    for (const output of baseOutputs) {
        processes.push(baseBuilder.write(output));
    }
    //#region

    //#region TypesOutputs
    buildConfig.plugins.push(
        dts({
            compilerOptions: {
                preserveSymlinks: false
            }
        })
    );
    const typesBuilder = await rollup(buildConfig);

    for (const output of typesOutputs) {
        processes.push(typesBuilder.write(output));
    }
    //#region

    await Promise.all(processes);
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
