import { Module } from "@keep/common";
import { UserRestDatastoreImpl } from "./application/datastores/rest";
import { UserRestRepositoryImpl } from "./application/repositories/rest";
import { IUserDatastoreToken } from "./domain/datastore";
import { IUserRepositoryToken } from "./domain/repositories";

@Module({
    providers: [
        {
            provide: IUserDatastoreToken,
            useClass: UserRestDatastoreImpl
        },
        {
            provide: IUserRepositoryToken,
            useClass: UserRestRepositoryImpl
        }
    ]
})
export class UserModule {}
