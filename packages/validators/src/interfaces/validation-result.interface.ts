import { ValidationCodeEnum } from "src/enums";

export interface IValidationResult<T> {
    value: T;
    valid: boolean;
    codes: ValidationCodeEnum[];
}
