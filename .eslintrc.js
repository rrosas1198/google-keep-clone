const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
    root: true,
    env: {
        node: true,
        es2022: true
    },
    parserOptions: {
        sourceType: "module"
    },
    extends: [
        "eslint:recommended",
        "plugin:sonarjs/recommended",
        "plugin:prettier/recommended",
        "plugin:nuxt/recommended"
    ],
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: "module",
                project: ["tsconfig.json", "packages/**/tsconfig.json"]
            },
            plugins: ["@typescript-eslint"],
            extends: ["plugin:@typescript-eslint/recommended"],
            rules: {
                indent: "off",
                "no-unused-vars": "off",
                "@typescript-eslint/ban-types": "off",
                "@typescript-eslint/explicit-function-return-type": "off",
                "@typescript-eslint/no-inferrable-types": [
                    "error",
                    {
                        ignoreParameters: true,
                        ignoreProperties: true
                    }
                ],
                "@typescript-eslint/indent": "off",
                "@typescript-eslint/no-namespace": "off",
                "@typescript-eslint/no-non-null-assertion": "off",
                "@typescript-eslint/no-var-requires": "off",
                "@typescript-eslint/consistent-type-imports": [
                    "error",
                    { disallowTypeAnnotations: false }
                ],
                "@typescript-eslint/no-unused-vars": [
                    "warn",
                    {
                        argsIgnorePattern: "_",
                        destructuredArrayIgnorePattern: "_"
                    }
                ]
            }
        },
        {
            files: ["*.vue"],
            plugins: ["nuxt"]
        },
        {
            files: ["*.json", "*.json5", "*.jsonc"],
            parser: "jsonc-eslint-parser"
        }
    ],
    rules: {
        eqeqeq: "error",
        quotes: [2, "double"],
        semi: [2, "always"],
        curly: "off",
        indent: ["warn", 4, { SwitchCase: 1 }],
        "comma-dangle": ["error", "never"],
        "no-unused-vars": ["warn", { argsIgnorePattern: "_", destructuredArrayIgnorePattern: "_" }],
        "max-len": "off",
        "sort-imports": [
            "warn",
            {
                ignoreCase: false,
                ignoreDeclarationSort: true,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
                allowSeparatedGroups: false
            }
        ],
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                printWidth: 100,
                singleQuote: false,
                trailingComma: "none",
                arrowParens: "avoid"
            }
        ]
    }
});
