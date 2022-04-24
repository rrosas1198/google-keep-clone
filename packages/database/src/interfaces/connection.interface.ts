export interface Connection {
    count(tableName: string): Promise<number>;
    findOne<T>(sql: string, values: Array<string | number>): Promise<T>;
    findAndCount<T>(): Promise<[T[], number]>;
    insert(): Promise<void>;
    query<T, V>(sql: string, values?: Array<string | number>): Promise<[T, V[]]>;
    beginTransaction(): Promise<void>;
    commitTransaction(): Promise<void>;
    rollback(): Promise<void>;
    release(): Promise<void>;
}
