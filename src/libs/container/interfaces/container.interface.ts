import type { IInjectionToken } from "./injection-token.interface";

export type IContainerFactory<T> = () => T;

export interface IContainer {
    resolve<T>(token: IInjectionToken<T>): T;
    registerFactory<T>(token: IInjectionToken<T>, factory: IContainerFactory<T>): IContainer;
    registerLazySingleton<T>(token: IInjectionToken<T>, factory: IContainerFactory<T>): IContainer;
}
