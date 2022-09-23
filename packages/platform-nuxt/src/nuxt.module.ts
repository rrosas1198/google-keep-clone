import { ConfigModule } from "@keep/config";
import { IConstructor, IDynamicModule, Module } from "@keep/core";

@Module({
    imports: [
        ConfigModule.forRoot(["env/default.env", `env/${process.env.NODE_ENV || "production"}.env`])
    ]
})
export class NuxtModule {
    public static forRoot(appModule: IConstructor): IDynamicModule {
        return {
            module: NuxtModule,
            imports: [appModule]
        };
    }
}
