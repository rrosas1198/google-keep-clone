import { ApplicationContext } from "./application.context";
import { IConstructor, IPlatform } from "./interfaces";

export abstract class Application<K, T extends IPlatform<K>, V extends ApplicationContext> {
    constructor(
        protected readonly appModule: IConstructor,
        protected readonly platform: T,
        protected readonly context: V
    ) {}

    public abstract startup(params: K): Promise<void>;
}
