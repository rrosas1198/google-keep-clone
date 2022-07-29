import { Injectable } from "@keep/common";
import { MysqlService } from "@keep/mysql";
import { Runner } from "src/interfaces";

@Injectable()
export class MigrationRunner implements Runner {
    constructor(private readonly mysqlService: MysqlService) {}

    public execute() {
        return Promise.resolve();
    }
}
