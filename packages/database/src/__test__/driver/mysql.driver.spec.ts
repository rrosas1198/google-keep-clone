import { MysqlConnectionOptions, MysqlDriver } from "src/driver";
import { describe, expect, it } from "vitest";

describe("mysql driver", () => {
    const options = getDriverOptions();
    const mysqlDriver = new MysqlDriver(options);

    let isConnected = false;

    it("should be connect to the database", async () => {
        try {
            await mysqlDriver.connect();
            isConnected = true;
        } catch (error) {
            isConnected = false;
        }

        expect(isConnected).toBe(true);
    });
});

function getDriverOptions() {
    return <MysqlConnectionOptions>{
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "",
        database: "test",
        charset: "utf8mb4",
        timezone: "Z"
    };
}
