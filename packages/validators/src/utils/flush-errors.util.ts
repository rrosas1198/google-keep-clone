import type { IValidationError } from "src/interfaces";

export function flushErrors<T>(errors: IValidationError<T>[]) {
    return errors.filter(error => error.codes.length > 0);
}
