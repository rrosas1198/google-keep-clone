import { Injectable } from "@keep/common";
import { IMysqlService, MysqlService } from "@keep/mysql";
import { from, mergeMap } from "rxjs";
import { IUserEntity } from "src/user/domain/entities";
import { UserMySqlQueries } from "./queries";

@Injectable()
export class UserMySqlDatastore {
    constructor(@IMysqlService private readonly mysqlService: Promise<MysqlService>) {}

    public findOne(params: Partial<IUserEntity>) {
        return from(this.mysqlService).pipe(
            mergeMap(mysqlService =>
                mysqlService.request<GenericRecord>(connection =>
                    connection.query(UserMySqlQueries.findOneQuery(params))
                )
            )
        );
    }
}
