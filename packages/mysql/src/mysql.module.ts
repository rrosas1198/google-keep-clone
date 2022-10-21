import { IConfigService } from "@keep/config";
import { IContainerService, IDynamicModule } from "@keep/core";
import { IConnectionOptions, IMysqlService } from "./interfaces";
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

        const configService = container.resolve(IConfigService);

        const options = <IConnectionOptions>{
            host: configService.get("MYSQL_HOST"),
            port: Number.parseInt(configService.get("MYSQL_PORT")),
            username: configService.get("MYSQL_USERNAME"),
            password: configService.get("MYSQL_PASSWORD"),
            database: configService.get("MYSQL_DATABASE")
        };

        const mysqlService = new MysqlService(options);
        await mysqlService.connect();

        this._instance = mysqlService;

        return mysqlService;
    }
}
