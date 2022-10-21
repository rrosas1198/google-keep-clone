import { ValidationCodeEnum } from "src/enums";
import { defineRule } from "src/utils";
import _isValidEmail from "validator/lib/isEmail";

export const isValidEmail = defineRule({
    func: value => typeof value === "string" && _isValidEmail(value),
    code: ValidationCodeEnum.FIELD_MUST_BE_VALID_EMAIL
});
