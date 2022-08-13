import { IValidationError, ValidationCodeEnum } from "@keep/validations";

export type IMonoValueObjectReturn<T> = [ValidationCodeEnum[], T | null];

export type IValueObjectReturn<T, V> = [IValidationError<T>[], V | null];
