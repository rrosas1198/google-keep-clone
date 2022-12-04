import merge from "lodash.merge";
import type { Options as PrettierConfig } from "prettier";

export function definePrettierConfig(config: PrettierConfig) {
    return config;
}

export function mergePrettierConfig(...configs: PrettierConfig[]) {
    return merge({}, ...configs);
}
