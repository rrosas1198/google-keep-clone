/* eslint-disable @typescript-eslint/no-explicit-any */
import { createPool as MysqlCreatePool, Pool, PoolOptions } from "mysql2/promise";
import { Driver } from "src/interfaces";
import { MysqlCallback, MysqlConnectionOptions } from "./interfaces";
import { MysqlConnection } from "./mysql.connection";

export class MysqlDriver implements Driver {
    private pool!: Pool;
    private connections = new Set<MysqlConnection>();

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

    public async getConnection() {
        const poolConnection = await this.pool.getConnection();
        const connection = new MysqlConnection(poolConnection);
        this.connections.add(connection);
        return connection;
    }

    public async request<T = any>(callback: MysqlCallback<T>) {
        const connection = await this.getConnection();

        try {
            const result = await callback(connection);
            return result as unknown as T;
        } catch (error) {
            throw error;
        } finally {
            this.release(connection);
        }
    }

    public async transaction<T = any>(callback: MysqlCallback<T>) {
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
            this.release(connection);
        }
    }

    public release(connection: MysqlConnection) {
        connection.release();
        this.connections.delete(connection);
    }

    private createPool(options: MysqlConnectionOptions) {
        const _options: PoolOptions = {
            host: options.host,
            port: options.port,
            user: options.username,
            password: options.password,
            database: options.database,
            charset: options.charset,
            timezone: options.timezone
        };
        return MysqlCreatePool(_options);
    }
}
