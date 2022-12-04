import { definePrettierConfig } from "src/utils";

export const PrettierBaseConfig = definePrettierConfig({
    printWidth: 100,
    singleQuote: false,
    trailingComma: "none",
    arrowParens: "avoid"
});
