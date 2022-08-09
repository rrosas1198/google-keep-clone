import { ValidationCodeEnum } from "src/enums";

export interface ValidationError<T> {
    property: keyof T;
    value: unknown;
    codes: ValidationCodeEnum[];
}
