import type { IValidationError, ValidationCodeEnum } from "@keep/validators";

export type IMonoValueObjectReturn<T> = [ValidationCodeEnum[], T | null];

export type IValueObjectReturn<T, V> = [IValidationError<T>[], V | null];
