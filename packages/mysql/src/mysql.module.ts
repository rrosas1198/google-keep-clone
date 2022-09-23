import { IConfigService } from "@keep/config";
import { IContainerService, IDynamicModule } from "@keep/core";
import { IMysqlService } from "./decorators";
import { IConnectionOptions } from "./interfaces";
import { MysqlService } from "./mysql.service";

export class MysqlModule {
    private static instance: MysqlService;

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
        if (!!this.instance) {
            return this.instance;
        }

        const configService = container.resolve<IConfigService>(IConfigService);

        const options = <IConnectionOptions>{
            host: configService.get("MYSQL_HOST"),
            port: Number.parseInt(configService.get("MYSQL_PORT")),
            username: configService.get("MYSQL_USERNAME"),
            password: configService.get("MYSQL_PASSWORD"),
            database: configService.get("MYSQL_DATABASE")
        };

        const mysqlService = new MysqlService(options);
        await mysqlService.connect();

        this.instance = mysqlService;

        return mysqlService;
    }
}
