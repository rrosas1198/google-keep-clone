import { Module } from "@keep/common";
import { UserMySqlDatastore } from "./application/datastores/mysql";
import { UserMysqlRepositoryImpl } from "./application/repositories/mysql";
import { IUserRepositoryToken } from "./domain/repositories";
import { HashService, TokenService } from "./domain/services";
import { SigninUseCase } from "./domain/use-cases";
import { UserController } from "./infrastructure/controllers";

@Module({
    providers: [
        {
            provide: UserMySqlDatastore,
            useClass: UserMySqlDatastore
        },
        {
            provide: IUserRepositoryToken,
            useClass: UserMysqlRepositoryImpl
        },
        {
            provide: HashService,
            useClass: HashService
        },
        {
            provide: TokenService,
            useClass: TokenService
        },
        {
            provide: SigninUseCase,
            useClass: SigninUseCase
        }
    ],
    controllers: [UserController]
})
export class UserModule {}
