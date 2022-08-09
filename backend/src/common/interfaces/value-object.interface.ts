import { ValidationCodeEnum, ValidationError } from "@keep/validations";

export type MonoValueObjectReturn<T> = [ValidationCodeEnum[], T | null];

export type ValueObjectReturn<T, V> = [ValidationError<T>[], V | null];
