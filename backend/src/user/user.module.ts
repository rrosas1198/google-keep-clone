import { Module } from "@keep/core";
import { UserRepositoryImpl } from "./application/repositories";
import { HashServiceImpl, TokenServiceImpl } from "./application/services";
import { SigninUseCaseImpl } from "./application/use-cases";
import { IUserRepository } from "./domain/repositories";
import { IHashService, ITokenService } from "./domain/services";
import { ISigninUseCase } from "./domain/use-cases";
import { UserController } from "./infrastructure/controllers";

@Module({
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepositoryImpl
        },
        {
            provide: IHashService,
            useClass: HashServiceImpl
        },
        {
            provide: ITokenService,
            useClass: TokenServiceImpl
        },
        {
            provide: ISigninUseCase,
            useClass: SigninUseCaseImpl
        }
    ],
    controllers: [UserController]
})
export class UserModule {}
