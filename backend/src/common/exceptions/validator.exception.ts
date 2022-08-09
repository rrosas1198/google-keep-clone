import { HttpException, HttpStatusEnum } from "@keep/platform-http";
import { ValidationError } from "@keep/validations";

export class ValidatorException<T> extends HttpException {
    constructor(public readonly errors: ValidationError<T>[]) {
        super(HttpStatusEnum.BAD_REQUEST);
    }

    public static fromErrors<V>(errors: ValidationError<V>[]) {
        return new ValidatorException(errors);
    }
}
