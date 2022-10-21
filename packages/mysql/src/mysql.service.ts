/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPool as MysqlCreatePool, Pool, PoolOptions } from "mysql2/promise";
import type { IConnectionCallback, IConnectionOptions } from "./interfaces";
import { IMysqlService } from "./interfaces/mysql-service.interface";
import { MysqlConnection } from "./mysql.connection";

export class MysqlService implements IMysqlService {
    public readonly connections = new Set<MysqlConnection>();
    private pool!: Pool;

    constructor(private readonly options: IConnectionOptions) {}

    public async connect() {
        this.pool = this.createPool(this.options);

        await this.request(connection => {
            return connection.query(`USE ${this.options.database}`);
        });
    }

    public async disconnect() {
        await this.pool.end();
        this.pool = null as any;
        this.connections.clear();
    }

    public async request<T = unknown>(callback: IConnectionCallback<T>) {
        const connection = await this.getConnection();

        try {
            const result = await callback(connection);
            return result as unknown as T;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }

    public async transaction<T = unknown>(callback: IConnectionCallback<T>) {
        const connection = await this.getConnection();

        try {
            await connection.beginTransaction();
            const result = await callback(connection);
            await connection.commitTransaction();
            return result;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    public async getConnection() {
        const poolConnection = await this.pool.getConnection();
        const mysqlConnection = new MysqlConnection(this, poolConnection);
        this.connections.add(mysqlConnection);
        return mysqlConnection;
    }

    private createPool(options: IConnectionOptions) {
        const _options: PoolOptions = {
            host: options.host,
            port: options.port,
            user: options.username,
            password: options.password,
            database: options.database,
            charset: options.charset || "utf8mb4",
            timezone: options.timezone || "Z"
        };
        return MysqlCreatePool(_options);
    }
}
