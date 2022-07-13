import { Module } from "@keep/common";
import { MysqlModule } from "@keep/mysql";
import { AccountModule } from "./account/infrastructure/account.module";

@Module({
    imports: [MysqlModule.forRoot(), AccountModule]
})
export class AppModule {}
