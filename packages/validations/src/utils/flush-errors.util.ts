import { ValidationError } from "src/interfaces";

export function flushErrors<T>(errors: ValidationError<T>[]) {
    return errors.filter(error => error.codes.length > 0);
}
