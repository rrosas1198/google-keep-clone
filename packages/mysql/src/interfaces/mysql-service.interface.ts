import { ContainerDecorator } from "@keep/core";
import { MysqlConnection } from "src/mysql.connection";
import { IConnectionCallback } from "./connection-callback.interface";

export const IMysqlService = ContainerDecorator<IMysqlService>("IMysqlService");

export interface IMysqlService {
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    request<T = unknown>(callback: IConnectionCallback<T>): Promise<T>;
    transaction<T = unknown>(callback: IConnectionCallback<T>): Promise<T>;
    getConnection(): Promise<MysqlConnection>;
}
