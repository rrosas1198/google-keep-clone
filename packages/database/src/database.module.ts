import { DynamicModule } from "@keep/common";
import { ConfigService } from "@keep/config";
import { DATABASE_TOKEN } from "./constants";
import { MysqlDriver } from "./driver/mysql";
import { ConnectionOptions } from "./interfaces";

export class DatabaseModule {
    public static forRoot(): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: DATABASE_TOKEN,
                    useFactory: container => {
                        const configService = container.resolve(ConfigService);

                        const options = <ConnectionOptions>{
                            host: configService.get<string>("MYSQL_HOST"),
                            port: parseInt(configService.get<string>("MYSQL_PORT")),
                            username: configService.get<string>("MYSQL_USERNAME"),
                            password: configService.get<string>("MYSQL_PASSWORD"),
                            database: configService.get<string>("MYSQL_DATABASE")
                        };

                        return new MysqlDriver(options);
                    }
                }
            ]
        };
    }
}
