import { ValidationCodeEnum } from "src/enums";
import { defineRule } from "src/utils";

const regexp = /^[\w.+-]+@[\w-]+\.[\w-]+(?:[.][\w-]+)*$/;

export const isValidEmail = defineRule({
    func: value => typeof value === "string" && regexp.test(value),
    code: ValidationCodeEnum.FIELD_MUST_BE_VALID_EMAIL
});
