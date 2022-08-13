import { Application, IConstructor } from "@keep/common";
import { ConfigService } from "@keep/config";
import { HttpContext } from "./http.context";
import { HttpModule } from "./http.module";
import { HttpPlatform } from "./http.platform";
import { IHttpOptions } from "./interfaces";

export class HttpApplication extends Application<IHttpOptions, HttpPlatform, HttpContext> {
    constructor(appModule: IConstructor) {
        super(appModule, new HttpPlatform(), new HttpContext());
    }

    public async startup() {
        const mainModule = HttpModule.forRoot(this.appModule);

        this.context.registerModule(mainModule);
        this.context.routes.forEach(route => {
            this.platform.addRoute(route.path, route.handler, [route.method]);
        });

        const configService = this.context.resolve(ConfigService);

        const params: IHttpOptions = {
            port: configService.get("HTTP_PORT"),
            hostname: configService.get("HTTP_HOST")
        };

        await this.platform.bootstrap(params);
    }
}
