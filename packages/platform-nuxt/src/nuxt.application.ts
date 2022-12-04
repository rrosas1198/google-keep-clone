import type { IPlatform } from "@keep/core";
import { Application, ApplicationContext } from "@keep/core";
import { NuxtModule } from "./nuxt.module";
import { NuxtPlatform } from "./nuxt.platform";

export class NuxtApplication extends Application<void, IPlatform<void>, ApplicationContext> {
    constructor() {
        super(NuxtModule, new NuxtPlatform(), new ApplicationContext());
    }

    public get container() {
        return this.context;
    }

    public async startup() {
        this.context.registerModule(this.appModule);

        await this.platform.bootstrap();
    }
}

const application = new NuxtApplication();
export const AppContext = application.container;
