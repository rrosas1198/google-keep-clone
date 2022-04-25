import { OkPacket, ResultSetHeader, RowDataPacket } from "mysql2/promise";

export type MysqlQueryResult =
    | RowDataPacket[]
    | RowDataPacket[][]
    | OkPacket
    | OkPacket[]
    | ResultSetHeader;
