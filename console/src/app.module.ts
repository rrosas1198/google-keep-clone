import { Module } from "@keep/core";
import { EnvironmentModule } from "@keep/environment";
import { MysqlModule } from "@keep/mysql";
import { MigrationModule } from "./migration/migration.module";

@Module({
    imports: [
        EnvironmentModule.forRoot([
            "env/default.env",
            `env/${process.env.NODE_ENV || "production"}.env`
        ]),
        MysqlModule.forRoot(),
        MigrationModule
    ]
})
export class AppModule {}
