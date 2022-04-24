/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Driver {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}
