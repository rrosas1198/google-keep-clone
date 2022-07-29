import { Module } from "@keep/common";
import { MysqlModule } from "@keep/mysql";
import { MigrationModule } from "./migration/migration.module";

@Module({
    imports: [MysqlModule.forRoot(), MigrationModule]
})
export class AppModule {}
