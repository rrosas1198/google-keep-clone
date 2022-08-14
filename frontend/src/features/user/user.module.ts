import { Module } from "@keep/common";
import { UserRestDatastore } from "./application/datastores/rest";
import { UserRestRepositoryImpl } from "./application/repositories/rest";
import { IUserRepositoryToken } from "./domain/repositories";

@Module({
    providers: [
        {
            provide: UserRestDatastore,
            useClass: UserRestDatastore
        },
        {
            provide: IUserRepositoryToken,
            useClass: UserRestRepositoryImpl
        }
    ]
})
export class UserModule {}
