import type { ScopeEnum } from "src/enums";
import type { IConstructor } from "src/interfaces";
import type { IContainerService } from "./container-service.interface";
import type { IContainerToken } from "./container-token.interface";

export interface IClassProvider<T = unknown> {
    useClass: IConstructor<T>;
    provide: IContainerToken;
    scope?: ScopeEnum;
}

export interface IFactoryProvider<T = unknown> {
    useFactory: (container: IContainerService) => T;
    provide: IContainerToken;
    scope?: ScopeEnum;
}

export interface IValueProvider<T = unknown> {
    useValue: T;
    provide: IContainerToken;
}

export type IContainerProvider<T = unknown> =
    | IConstructor<T>
    | IClassProvider<T>
    | IFactoryProvider<T>
    | IValueProvider<T>;
