import type { MysqlConnection } from "src/mysql.connection";

export type IConnectionCallback<T> = (connection: MysqlConnection) => Promise<T>;
