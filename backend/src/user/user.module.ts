import { Module } from "@keep/core";
import { UserRepositoryImpl } from "./application/repositories";
import { HashServiceImpl, TokenServiceImpl } from "./application/services";
import { SignInUseCaseImpl } from "./application/use-cases";
import { IUserRepository } from "./domain/repositories";
import { IHashService, ITokenService } from "./domain/services";
import { ISignInUseCase } from "./domain/use-cases";
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
            provide: ISignInUseCase,
            useClass: SignInUseCaseImpl
        }
    ],
    controllers: [UserController]
})
export class UserModule {}
