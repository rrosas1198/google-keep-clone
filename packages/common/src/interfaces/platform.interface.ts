/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Platform<T> {
    bootstrap(params: T): Promise<void>;
}
