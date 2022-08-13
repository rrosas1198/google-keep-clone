import { IConstructor } from "@keep/common";

export interface IConnectionOptions {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
    charset?: string;
    timezone?: string;
    migrations?: IConstructor[];
}
