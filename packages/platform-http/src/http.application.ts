import type { IConstructor } from "@keep/core";
import { Application } from "@keep/core";
import { IEnvironmentService } from "@keep/environment";
import { HttpContext } from "./http.context";
import { HttpModule } from "./http.module";
import { HttpPlatform } from "./http.platform";
import type { IHttpOptions } from "./interfaces";

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

        const environmentService = this.context.resolve(IEnvironmentService);

        const params: IHttpOptions = {
            port: environmentService.get("HTTP_PORT"),
            hostname: environmentService.get("HTTP_HOST")
        };

        await this.platform.bootstrap(params);
    }
}
