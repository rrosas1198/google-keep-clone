import { ContainerService } from "@keep/core";
import { Observable } from "rxjs";
import { IUserEntity } from "src/user/domain/entities";
import { IUserRepository } from "src/user/domain/repositories";
import { UserMySqlDatastore } from "../datastores/mysql";
import { UserMySqlMapper } from "../mappers/mysql";

export class UserRepositoryImpl implements IUserRepository {
    private readonly userMysqlDatastore = ContainerService.create(UserMySqlDatastore);

    public findByEmail(email: string): Observable<IUserEntity> {
        return this.userMysqlDatastore.findOne({ email }).pipe(UserMySqlMapper.mapFindOne());
    }
}
