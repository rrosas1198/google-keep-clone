import { Connection } from "src/interfaces";

export type MysqlCallback<T> = (connection: Connection) => Promise<T>;
