import { Type } from "@keep/common";

export interface ConnectionOptions {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    charset?: string;
    timezone?: string;
    migrations?: Type[];
}
