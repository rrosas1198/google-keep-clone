import { MysqlConnection } from "src/mysql.connection";

export type ConnectionCallback<T> = (connection: MysqlConnection) => Promise<T>;
