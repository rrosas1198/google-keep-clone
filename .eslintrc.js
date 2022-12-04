const { mergeEslintConfig, EslintBaseConfig, EslintVue3Config } = require("@keep/config");

module.exports = mergeEslintConfig(EslintBaseConfig, EslintVue3Config, {
    rules: {
        "vue/multi-word-component-names": "off"
    }
});
