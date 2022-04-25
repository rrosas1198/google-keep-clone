import { Application, Type } from "@keep/common";
import { ConfigService } from "@keep/config";
import { HttpModule } from "./http.module";
import { HttpPlatform } from "./http.platform";
import { HttpOptions } from "./interfaces";

export class HttpApplication extends Application<HttpOptions> {
    constructor(appModule: Type) {
        super(appModule, new HttpPlatform());
    }

    public async startup() {
        const mainModule = HttpModule.forRoot(this.appModule);
        this.context.registerModule(mainModule);

        const configService = this.context.resolve(ConfigService);

        const params: HttpOptions = {
            port: configService.get("HTTP_PORT"),
            hostname: configService.get("HTTP_HOST")
        };

        await this.platform.bootstrap(params);
    }
}
