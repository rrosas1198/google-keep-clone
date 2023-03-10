import type { IContainer } from "./container.interface";
import type { IInjectionToken } from "./injection-token.interface";

export interface IModule {
    resolve<T>(token: IInjectionToken<T>): T;
    registerDependencies(): void;
}

export type IModuleDefinition = (container: IContainer) => void;
