import { Module } from "@keep/common";
import { UserRestDatastore } from "./application/datastores/rest";
import { UserMockRepositoryImpl } from "./application/repositories/mock";
import { IUserRepositoryToken } from "./domain/repositories";

@Module({
    providers: [
        {
            provide: UserRestDatastore,
            useClass: UserRestDatastore
        },
        {
            provide: IUserRepositoryToken,
            useClass: UserMockRepositoryImpl
        }
    ]
})
export class UserModule {}
