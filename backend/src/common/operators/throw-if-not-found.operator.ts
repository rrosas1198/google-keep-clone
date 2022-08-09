import { HttpException, HttpStatusEnum } from "@keep/platform-http";
import { MonoTypeOperatorFunction, tap } from "rxjs";

export function throwIfNotFound<T>(status: HttpStatusEnum): MonoTypeOperatorFunction<T> {
    return tap<T>(data => {
        if (data) return;
        throw HttpException.fromStatus(status);
    });
}
