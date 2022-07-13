import { Module } from "@keep/common";
import { MysqlModule } from "@keep/mysql";

@Module({
    imports: [MysqlModule.forRoot()]
})
export class AppModule {}
