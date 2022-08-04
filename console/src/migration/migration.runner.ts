import { Injectable } from "@keep/common";
import { InjectMysql, MysqlService } from "@keep/mysql";
import { Runner } from "src/interfaces";
import MigrationDatabase from "./migration.database.sql";

@Injectable()
export class MigrationRunner implements Runner {
    constructor(@InjectMysql() private readonly mysqlService: Promise<MysqlService>) {}

    public async execute() {
        const mysqlService = await this.mysqlService;

        await mysqlService.transaction(async connection => {
            await connection.query(MigrationDatabase);
        });
    }
}
