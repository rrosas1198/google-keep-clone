import type { ESLintConfig } from "eslint-define-config";
import merge from "lodash.merge";

export { defineConfig as defineEslintConfig } from "eslint-define-config";

export function mergeEslintConfig(...configs: ESLintConfig[]) {
    return merge({}, ...configs);
}
