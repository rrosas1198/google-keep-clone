/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PoolConnection } from "mysql2/promise";
import type { MysqlService } from "./mysql.service";

export class MysqlConnection {
    constructor(
        private readonly mysqlService: MysqlService,
        private readonly poolConnection: PoolConnection
    ) {}

    public async query<T = any>(query: string, params?: Array<string | number>) {
        const rawResults = await this.poolConnection.query(query, params);
        return rawResults[0] as T[];
    }

    public beginTransaction() {
        return this.poolConnection.beginTransaction();
    }

    public commitTransaction() {
        return this.poolConnection.commit();
    }

    public rollback() {
        return this.poolConnection.rollback();
    }

    public release() {
        this.poolConnection.release();
        this.mysqlService.connections.delete(this);
        return Promise.resolve();
    }
}
