import type { MysqlService } from "@keep/mysql";
import { IMysqlService } from "@keep/mysql";
import type { IRunner } from "src/interfaces";
import MigrationDatabase from "./migration.database.sql";

export class MigrationRunner implements IRunner {
    constructor(@IMysqlService private readonly mysqlService: Promise<MysqlService>) {}

    public async execute() {
        const mysqlService = await this.mysqlService;

        await mysqlService.transaction(async connection => {
            await connection.query(MigrationDatabase);
        });
    }
}
