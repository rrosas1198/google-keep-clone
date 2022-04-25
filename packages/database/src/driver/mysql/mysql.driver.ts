/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPool as MysqlCreatePool, Pool, PoolOptions } from "mysql2/promise";
import { ConnectionCallback, Driver } from "src/interfaces";
import { MysqlConnectionOptions } from "./interfaces";
import { MysqlConnection } from "./mysql.connection";

export class MysqlDriver implements Driver {
    public readonly connections = new Set<MysqlConnection>();
    private pool!: Pool;

    constructor(private readonly options: MysqlConnectionOptions) {}

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

    public async request<T = any>(callback: ConnectionCallback<T>) {
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

    public async transaction<T = any>(callback: ConnectionCallback<T>) {
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

    private createPool(options: MysqlConnectionOptions) {
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
