/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Connection {
    query<T = any>(sql: string, params?: Array<string | number>): Promise<T[]>;
    rollback(): Promise<void>;
}
