import type { ScopeEnum } from "../enums";
import type { IContainerFactory } from "./container.interface";
import type { IInjectionToken } from "./injection-token.interface";

export interface IBinding<T = unknown> {
    token: IInjectionToken<T>;
    scope: ScopeEnum;
    factory: IContainerFactory<T>;
}
