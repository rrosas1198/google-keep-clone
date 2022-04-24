/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Platform {
    bootstrap(...params: any[]): Promise<void>;
}
