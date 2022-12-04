import { mergeStylelintConfig } from "src/utils";
import type { Config as StylelintConfig } from "stylelint";
import configTwbsBootstrap from "stylelint-config-twbs-bootstrap";

export const StylelintBaseConfig: StylelintConfig = mergeStylelintConfig(configTwbsBootstrap, {
    rules: {
        indentation: 4,
        "string-quotes": "double",
        "number-leading-zero": "always",
        "declaration-colon-newline-after": null,
        "selector-class-pattern": ""
    }
});
