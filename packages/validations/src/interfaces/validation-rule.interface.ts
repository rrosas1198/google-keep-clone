import { ValidationCodeEnum } from "src/enums";

export type IValidationFn<T> = (value: T) => boolean;

export interface IValidationRule {
    func: IValidationFn<unknown>;
    code: ValidationCodeEnum;
}
