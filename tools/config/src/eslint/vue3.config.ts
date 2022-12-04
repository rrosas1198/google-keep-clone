import { defineEslintConfig } from "src/utils";

export const EslintVue3Config = defineEslintConfig({
    extends: ["plugin:vue/vue3-recommended"],
    rules: {
        "vue/no-v-html": "off",
        "vue/html-indent": ["error", 4]
    }
});
