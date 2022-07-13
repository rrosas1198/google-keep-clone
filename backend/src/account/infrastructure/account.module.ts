import { Module } from "@keep/common";
import { AccountController } from "./account.controller";

@Module({
    controllers: [AccountController]
})
export class AccountModule {}
