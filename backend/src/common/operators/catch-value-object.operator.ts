import { map, OperatorFunction, pipe, tap } from "rxjs";
import { ValidatorException } from "../exceptions";
import { IValueObjectReturn } from "../interfaces";

/* eslint-disable @typescript-eslint/no-unused-vars */
export function catchValueObject<T, A>(): OperatorFunction<IValueObjectReturn<T, A>, A> {
    return pipe(
        tap(([errors]) => {
            if (errors.length <= 0) return;
            throw ValidatorException.fromErrors(errors);
        }),
        map(([_errors, instance]) => instance as A)
    );
}
