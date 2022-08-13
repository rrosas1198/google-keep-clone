import { Module } from "@keep/common";
import { UserModule } from "./user/user.module";

@Module({
    imports: [UserModule]
})
export class AppModule {}
