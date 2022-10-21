import type { UnwrapPromise } from "src/interfaces";

export async function tryCatch<T, V extends Error>(
    value: PromiseLike<T>
): Promise<[UnwrapPromise<T>, V]> {
    try {
        return [(await value) as UnwrapPromise<T>, null as unknown as V];
    } catch (error) {
        return [null as UnwrapPromise<T>, error as V];
    }
}
