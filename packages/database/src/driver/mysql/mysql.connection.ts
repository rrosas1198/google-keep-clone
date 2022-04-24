/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldPacket, PoolConnection, RowDataPacket } from "mysql2/promise";
import { Connection } from "src/interfaces";

export class MysqlConnection implements Connection {
    constructor(private readonly poolConnection: PoolConnection) {}

    public async count(tableName: string) {
        const result = await this.poolConnection.query("SELECT COUNT(*) as count FROM ??", [
            tableName
        ]);
        return (result[0] as RowDataPacket).count as number;
    }

    public async findOne<T>(sql: string, values?: Array<string | number>) {
        const result = await this.query<T>(sql, values);
        return (result?.[0] || null) as T;
    }

    public findAndCount<T>(): Promise<[T[], number]> {
        throw new Error("Method not implemented.");
    }

    public insert(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async query<T, V = FieldPacket>(sql: string, values?: Array<string | number>) {
        const result = await this.poolConnection.query(sql, values);
        return result as any as [T, V[]];
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
        return Promise.resolve();
    }
}
