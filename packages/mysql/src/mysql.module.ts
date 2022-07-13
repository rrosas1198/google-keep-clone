import { DynamicModule } from "@keep/common";
import { ConfigService } from "@keep/config";
import { MYSQL_TOKEN } from "./constants";
import { ConnectionOptions } from "./interfaces";
import { MysqlService } from "./mysql.service";

export class MysqlModule {
    public static forRoot(): DynamicModule {
        return {
            module: MysqlModule,
            providers: [
                {
                    provide: MYSQL_TOKEN,
                    useFactory: async container => {
                        const configService = container.resolve(ConfigService);

                        const options = <ConnectionOptions>{
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
            ]
        };
    }
}
