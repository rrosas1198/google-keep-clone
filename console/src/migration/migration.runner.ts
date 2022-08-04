import { Injectable } from "@keep/common";
import { InjectMysql, MysqlService } from "@keep/mysql";
import { Runner } from "src/interfaces";
import MigrationDatabase from "./migration.database.sql";

@Injectable()
export class MigrationRunner implements Runner {
    constructor(@InjectMysql() private readonly mysqlService: MysqlService) {}

    public async execute() {
        await this.mysqlService.transaction(async connection => {
            await connection.query(MigrationDatabase);
        });
    }
}
