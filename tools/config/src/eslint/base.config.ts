import { defineEslintConfig } from "src/utils";

export const EslintBaseConfig = defineEslintConfig({
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true
    },
    parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: ["eslint:recommended", "plugin:sonarjs/recommended", "plugin:prettier/recommended"],
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            parser: "@typescript-eslint/parser",
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: "module",
                project: ["tsconfig.json", "packages/**/tsconfig.json"],
                ecmaFeatures: {
                    jsx: true
                }
            },
            plugins: ["@typescript-eslint"],
            extends: ["plugin:@typescript-eslint/recommended"],
            rules: {
                indent: "off",
                "no-unused-vars": "off",
                "@typescript-eslint/ban-types": "off",
                "@typescript-eslint/explicit-function-return-type": "off",
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
            parser: "vue-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".vue"],
                ecmaVersion: "latest",
                ecmaFeatures: {
                    jsx: true
                }
            }
        },
        {
            files: ["*.json", "*.json5", "*.jsonc"],
            parser: "jsonc-eslint-parser"
        },
        {
            files: ["package.json"],
            parser: "jsonc-eslint-parser",
            rules: {
                "jsonc/sort-keys": [
                    "error",
                    {
                        pathPattern: "^$",
                        order: [
                            "name",
                            "version",
                            "private",
                            "license",
                            "packageManager",
                            "description",
                            "type",
                            "keywords",
                            "homepage",
                            "bugs",
                            "author",
                            "contributors",
                            "funding",
                            "engines",
                            "bin",
                            "main",
                            "module",
                            "types",
                            "exports",
                            "files",
                            "repository",
                            "scripts",
                            "peerDependencies",
                            "peerDependenciesMeta",
                            "optionalDependencies",
                            "dependencies",
                            "devDependencies"
                        ]
                    },
                    {
                        pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies$",
                        order: { type: "asc" }
                    }
                ]
            }
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
