import { ApplicationContext } from "./application.context";
import { Platform, Type } from "./interfaces";

export abstract class Application<T> {
    constructor(
        protected readonly appModule: Type,
        protected readonly platform: Platform<T>,
        protected readonly context = new ApplicationContext()
    ) {}

    public abstract startup(params: T): Promise<void>;
}
