import { HttpException, HttpStatusEnum } from "@keep/platform-http";
import type { IValidationError } from "@keep/validators";

export class ValidationException<T> extends HttpException {
    constructor(public readonly errors: IValidationError<T>[]) {
        super(HttpStatusEnum.BAD_REQUEST);
    }

    public static fromErrors<V>(errors: IValidationError<V>[]) {
        return new ValidationException(errors);
    }
}
