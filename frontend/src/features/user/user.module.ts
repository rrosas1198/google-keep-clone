import { Module } from "@keep/core";
import { UserMockRepositoryImpl } from "./application/repositories/mock";
import { IUserRepository } from "./domain/repositories";

@Module({
    providers: [
        {
            provide: IUserRepository,
            useClass: UserMockRepositoryImpl
        }
    ]
})
export class UserModule {}
