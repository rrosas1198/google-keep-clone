import { ConfigModule } from "@keep/config";
import { IConstructor, IDynamicModule } from "@keep/core";

export class NuxtModule {
    public static forRoot(appModule: IConstructor): IDynamicModule {
        const environment = process.env.NODE_ENV || "production";
        const filePaths = ["env/default.env", `env/${environment}.env`];

        return {
            module: NuxtModule,
            imports: [ConfigModule.forRoot(filePaths), appModule]
        };
    }
}
