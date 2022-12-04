import type { MysqlService } from "@keep/mysql";
import { IMysqlService } from "@keep/mysql";
import type { IUserEntity } from "src/user/domain/entities";
import { UserMySqlQueries } from "./queries";

export class UserMySqlDatastore {
    constructor(@IMysqlService private readonly mysqlService: Promise<MysqlService>) {}

    public async findOne(params: Partial<IUserEntity>) {
        const mysqlService = await this.mysqlService;

        return mysqlService.request<GenericRecord>(connection =>
            connection.query(UserMySqlQueries.findOneQuery(params))
        );
    }
}
