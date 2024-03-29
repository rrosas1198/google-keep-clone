const configTwbsBootstrap = require("stylelint-config-twbs-bootstrap");

const twbsConfig = Object.assign({}, configTwbsBootstrap);

Object.assign(twbsConfig.rules, {
    indentation: 4,
    "string-quotes": "double",
    "number-leading-zero": "always",
    "declaration-colon-newline-after": null,
    "selector-class-pattern": "",
    "no-invalid-double-slash-comments": null,
    "scss/dollar-variable-pattern": null,
    "scss/at-function-pattern": null
});

module.exports = twbsConfig;
