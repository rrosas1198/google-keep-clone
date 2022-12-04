import type { IContainerService, IDynamicModule } from "@keep/core";
import { IEnvironmentService } from "@keep/environment";
import type { IConnectionOptions } from "./interfaces";
import { IMysqlService } from "./interfaces";
import { MysqlService } from "./mysql.service";

export class MysqlModule {
    private static _instance: MysqlService;

    public static forRoot(): IDynamicModule {
        return {
            module: MysqlModule,
            providers: [
                {
                    provide: IMysqlService,
                    useFactory: this.connect.bind(this)
                }
            ]
        };
    }

    private static async connect(container: IContainerService) {
        if (!!this._instance) {
            return this._instance;
        }

        const environmentService = container.resolve(IEnvironmentService);

        const options = <IConnectionOptions>{
            host: environmentService.get("MYSQL_HOST"),
            port: Number.parseInt(environmentService.get("MYSQL_PORT")),
            username: environmentService.get("MYSQL_USERNAME"),
            password: environmentService.get("MYSQL_PASSWORD"),
            database: environmentService.get("MYSQL_DATABASE")
        };

        const mysqlService = new MysqlService(options);
        await mysqlService.connect();

        this._instance = mysqlService;

        return mysqlService;
    }
}
