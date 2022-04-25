/* eslint-disable @typescript-eslint/no-explicit-any */
import { PoolConnection } from "mysql2/promise";
import { Connection } from "src/interfaces";
import { MysqlDriver } from "./mysql.driver";

export class MysqlConnection implements Connection {
    constructor(
        private readonly mysqlDriver: MysqlDriver,
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
        this.mysqlDriver.connections.delete(this);
        return Promise.resolve();
    }
}
