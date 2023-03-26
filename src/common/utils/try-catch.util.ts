/* eslint-disable @typescript-eslint/no-explicit-any */
export async function tryCatch<T, V extends Error>(
    promise: PromiseLike<T>
): Promise<[Awaited<T>, V]> {
    try {
        return [(await promise) as Awaited<T>, null as unknown as V];
    } catch (error) {
        return [null as Awaited<T>, error as V];
    }
}

export async function tryCatchAll<T extends PromiseLike<unknown>[]>(
    ...promises: T
): Promise<[{ -readonly [P in keyof T]: Awaited<T[P]> }, Error]> {
    try {
        const responses = await Promise.all(promises);
        return [responses, null as any];
    } catch (error) {
        return [null as any, error as any];
    }
}
