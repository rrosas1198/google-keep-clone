import { ValidationCodeEnum } from "src/enums";
import { defineRule } from "src/utils";

export const isString = defineRule({
    func: value => typeof value === "string",
    code: ValidationCodeEnum.VALUE_MUST_BE_STRING
});
