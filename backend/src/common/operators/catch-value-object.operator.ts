import { map, OperatorFunction, pipe, tap } from "rxjs";
import { ValidatorException } from "../exceptions";
import { ValueObjectReturn } from "../interfaces";

/* eslint-disable @typescript-eslint/no-unused-vars */
export function catchValueObject<T, A>(): OperatorFunction<ValueObjectReturn<T, A>, A> {
    return pipe(
        tap(([errors]) => {
            if (!errors) return;
            throw ValidatorException.fromErrors(errors);
        }),
        map(([_errors, instance]) => instance as A)
    );
}
