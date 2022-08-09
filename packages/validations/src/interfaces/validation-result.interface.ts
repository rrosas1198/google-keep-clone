import { ValidationCodeEnum } from "src/enums";

export interface ValidationResult<T> {
    value: T;
    valid: boolean;
    codes: ValidationCodeEnum[];
}
