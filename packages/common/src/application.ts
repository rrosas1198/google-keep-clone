import { ApplicationContext } from "./application.context";
import { Platform, Type } from "./interfaces";

export abstract class Application<K, T extends Platform<K>, V extends ApplicationContext> {
    constructor(
        protected readonly appModule: Type,
        protected readonly platform: T,
        protected readonly context: V
    ) {}

    public abstract startup(params: K): Promise<void>;
}
