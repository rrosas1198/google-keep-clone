const {
    mergeEslintConfig,
    EslintBaseConfig,
    EslintPrettierConfig,
    EslintTsConfig
} = require("@techkit/linter-config");

module.exports = mergeEslintConfig(EslintBaseConfig, EslintTsConfig, EslintPrettierConfig);
