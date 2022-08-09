import { Module } from "@keep/common";
import { UserMySqlDatastore } from "../application/datastores/mysql";
import { UserRepositoryImpl } from "../application/repositories";
import { HashService, TokenService } from "../application/services";
import { SigninUseCase } from "../application/use-cases";
import { UserController } from "./user.controller";

@Module({
    providers: [UserMySqlDatastore, UserRepositoryImpl, HashService, TokenService, SigninUseCase],
    controllers: [UserController]
})
export class UserModule {}
