import { Connection } from "./connection.interface";

export type ConnectionCallback<T> = (connection: Connection) => Promise<T>;
