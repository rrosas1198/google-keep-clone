import { Injectable } from "@keep/common";
import { Observable } from "rxjs";
import { UserEntity } from "src/user/domain/entities";
import { UserRepository } from "src/user/domain/repositories";
import { UserMySqlDatastore } from "../datastores/mysql";
import { UserMySqlMapper } from "../mappers/mysql";

@Injectable()
export class UserRepositoryImpl implements UserRepository {
    constructor(private readonly userMySqlDatastore: UserMySqlDatastore) {}

    public findByEmail(email: string): Observable<UserEntity> {
        return this.userMySqlDatastore.findOne({ email }).pipe(UserMySqlMapper.mapFindOne());
    }
}
