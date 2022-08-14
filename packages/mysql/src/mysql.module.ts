import { IDynamicModule } from "@keep/common";
import { ConfigService } from "@keep/config";
import { DependencyContainer, instanceCachingFactory } from "tsyringe";
import { IMysqlServiceToken } from "./decorators";
import { IConnectionOptions } from "./interfaces";
import { MysqlService } from "./mysql.service";

export class MysqlModule {
    public static forRoot(): IDynamicModule {
        return {
            module: MysqlModule,
            providers: [
                {
                    provide: IMysqlServiceToken,
                    useFactory: instanceCachingFactory(this.connect)
                }
            ]
        };
    }

    private static async connect(container: DependencyContainer) {
        const configService = container.resolve(ConfigService);

        const options = <IConnectionOptions>{
            host: configService.get<string>("MYSQL_HOST"),
            port: parseInt(configService.get<string>("MYSQL_PORT")),
            username: configService.get<string>("MYSQL_USERNAME"),
            password: configService.get<string>("MYSQL_PASSWORD"),
            database: configService.get<string>("MYSQL_DATABASE")
        };

        const mysqlService = new MysqlService(options);
        await mysqlService.connect();

        return mysqlService;
    }
}
