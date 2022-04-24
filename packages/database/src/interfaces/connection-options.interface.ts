import { Type } from "@keep/common";
import { DatabaseType } from "./database-type.interface";

export interface ConnectionOptions {
    type: DatabaseType;
    migrations?: Type[];
}
