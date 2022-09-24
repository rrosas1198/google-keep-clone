import { ContainerService } from "@keep/core";
import { IUserEntity } from "src/user/domain/entities";
import { IUserRepository } from "src/user/domain/repositories";
import { UserMySqlDatastore } from "../datastores/mysql";
import { UserMySqlMapper } from "../mappers/mysql";

export class UserRepositoryImpl implements IUserRepository {
    private readonly userMysqlDatastore = ContainerService.create(UserMySqlDatastore);

    public async findByEmail(email: string): Promise<IUserEntity> {
        const response = await this.userMysqlDatastore.findOne({ email });
        return UserMySqlMapper.mapFindOne(response);
    }
}
