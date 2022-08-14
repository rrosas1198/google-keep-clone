import { Injectable } from "@keep/common";
import { Observable } from "rxjs";
import { IUserEntity } from "src/user/domain/entities";
import { IUserRepository } from "src/user/domain/repositories";
import { UserMySqlDatastore } from "../../datastores/mysql";
import { UserMySqlMapper } from "../../mappers/mysql";

@Injectable()
export class UserMysqlRepositoryImpl implements IUserRepository {
    constructor(private readonly userMysqlDatastore: UserMySqlDatastore) {}

    public findByEmail(email: string): Observable<IUserEntity> {
        return this.userMysqlDatastore.findOne({ email }).pipe(UserMySqlMapper.mapFindOne());
    }
}
