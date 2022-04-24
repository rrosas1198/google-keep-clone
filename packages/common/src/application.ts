/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationContext } from "./application-context";
import { Platform, Type } from "./interfaces";

export class Application {
    constructor(
        protected readonly module: Type,
        protected readonly platform: Platform,
        protected readonly context = new ApplicationContext()
    ) {}

    public async startup(...params: any[]) {
        this.context.registerModule(this.module);

        await this.platform.bootstrap(...params);
    }
}
