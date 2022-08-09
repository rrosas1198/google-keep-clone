import { ValidationCodeEnum } from "src/enums";
import { defineRule } from "src/utils";

export const notBlank = defineRule({
    func: validationFunc,
    code: ValidationCodeEnum.FIELD_CANNOT_BE_BLANK
});

function validationFunc<T>(value: T) {
    if (Array.isArray(value) && value.length <= 0) {
        return false;
    }
    if (typeof value === "string" && value.length <= 0) {
        return false;
    }
    return true;
}
