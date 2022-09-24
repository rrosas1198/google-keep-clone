/* eslint-disable @typescript-eslint/no-explicit-any */
type ArgumentsType<T> = T extends (...args: infer U) => any ? U : never;
type UnwrapPromisify<T> = T extends Promise<infer U> ? U : T;

export function tryCatch<T extends (...args: any) => any>(func: T) {
    return async (...args: ArgumentsType<T>): Promise<[UnwrapPromisify<ReturnType<T>>, Error]> => {
        try {
            return [await func(...(args as any)), null as any];
        } catch (error) {
            return [null as any, error as any];
        }
    };
}
