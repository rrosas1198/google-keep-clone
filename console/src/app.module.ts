import { Module } from "@keep/common";
import { ConfigModule } from "@keep/config";
import { MysqlModule } from "@keep/mysql";
import { MigrationModule } from "./migration/migration.module";

@Module({
    imports: [
        ConfigModule.forRoot([
            "env/default.env",
            `env/${process.env.NODE_ENV || "production"}.env`
        ]),
        MysqlModule.forRoot(),
        MigrationModule
    ]
})
export class AppModule {}
