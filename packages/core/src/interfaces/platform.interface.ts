/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPlatform<T> {
    bootstrap(params: T): Promise<void>;
}
