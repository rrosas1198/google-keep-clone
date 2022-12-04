import type { IConstructor, IDynamicModule } from "@keep/core";
import { EnvironmentModule } from "@keep/environment";

export class HttpModule {
    public static forRoot(appModule: IConstructor): IDynamicModule {
        const environment = process.env.NODE_ENV || "production";
        const filePaths = ["env/default.env", `env/${environment}.env`];

        return {
            module: HttpModule,
            imports: [EnvironmentModule.forRoot(filePaths), appModule]
        };
    }
}
