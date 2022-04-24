import { ConnectionOptions } from "src/interfaces";

export interface MysqlConnectionOptions extends ConnectionOptions {
    type: "mysql" | "mariadb";
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    charset?: string;
    timezone?: string;
}
