import merge from "lodash.merge";
import type { Config as StylelintConfig } from "stylelint";

export function defineStylelintConfig(config: StylelintConfig) {
    return config;
}

export function mergeStylelintConfig(...configs: StylelintConfig[]) {
    return merge({}, ...configs);
}
