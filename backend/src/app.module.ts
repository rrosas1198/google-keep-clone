import { Module } from "@keep/common";
import { MysqlModule } from "@keep/mysql";
import { UserModule } from "./user/infrastructure/user.module";

@Module({
    imports: [MysqlModule.forRoot(), UserModule]
})
export class AppModule {}
