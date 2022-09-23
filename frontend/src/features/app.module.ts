import { Module } from "@keep/core";
import { UserModule } from "./user/user.module";

@Module({
    imports: [UserModule]
})
export class AppModule {}
