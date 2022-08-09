import { Injectable } from "@keep/common";
import { InjectMysql, MysqlService } from "@keep/mysql";
import { from, mergeMap } from "rxjs";
import { UserEntity } from "src/user/domain/entities";
import { UserMySqlQueries } from "./queries";

@Injectable()
export class UserMySqlDatastore {
    constructor(@InjectMysql() private readonly mysqlService: Promise<MysqlService>) {}

    public findOne(params: Partial<UserEntity>) {
        return from(this.mysqlService).pipe(
            mergeMap(mysqlService =>
                mysqlService.request<GenericRecord>(connection =>
                    connection.query(UserMySqlQueries.findOneQuery(params))
                )
            )
        );
    }
}
