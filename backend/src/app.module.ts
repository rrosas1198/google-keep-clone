import { Module } from "@keep/core";
import { MysqlModule } from "@keep/mysql";
import { UserModule } from "./user/user.module";

@Module({
    imports: [MysqlModule.forRoot(), UserModule]
})
export class AppModule {}
