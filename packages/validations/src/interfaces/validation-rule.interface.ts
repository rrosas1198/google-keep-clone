import { ValidationCodeEnum } from "src/enums";

export type ValidationFn<T> = (value: T) => boolean;

export interface ValidationRule {
    func: ValidationFn<unknown>;
    code: ValidationCodeEnum;
}
