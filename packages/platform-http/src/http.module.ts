import { IConstructor, IDynamicModule, Module } from "@keep/common";
import { ConfigModule } from "@keep/config";

@Module({
    imports: [
        ConfigModule.forRoot(["env/default.env", `env/${process.env.NODE_ENV || "production"}.env`])
    ]
})
export class HttpModule {
    public static forRoot(appModule: IConstructor): IDynamicModule {
        return {
            module: HttpModule,
            imports: [appModule]
        };
    }
}
