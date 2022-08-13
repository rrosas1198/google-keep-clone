import { ValidationCodeEnum } from "src/enums";

export interface IValidationError<T> {
    property: keyof T;
    value: unknown;
    codes: ValidationCodeEnum[];
}
