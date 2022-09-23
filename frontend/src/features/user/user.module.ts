import { Module } from "@keep/core";
import { UserRestDatastore } from "./application/datastores/rest";
import { UserMockRepositoryImpl } from "./application/repositories/mock";
import { IUserRepository } from "./domain/repositories";

@Module({
    providers: [
        {
            provide: UserRestDatastore,
            useClass: UserRestDatastore
        },
        {
            provide: IUserRepository,
            useClass: UserMockRepositoryImpl
        }
    ]
})
export class UserModule {}
