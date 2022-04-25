/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConnectionCallback } from "./connection-callback.interface";
import { Connection } from "./connection.interface";

export interface Driver {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    request<T = any>(callback: ConnectionCallback<T>): Promise<T>;
    transaction<T = any>(callback: ConnectionCallback<T>): Promise<T>;
    getConnection(): Promise<Connection>;
}
