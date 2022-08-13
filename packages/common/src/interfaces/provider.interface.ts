/* eslint-disable @typescript-eslint/no-explicit-any */
import { DependencyContainer } from "tsyringe";
import { DelayedConstructor } from "tsyringe/dist/typings/lazy-helpers";
import { ScopeEnum } from "../enums";
import { IConstructor } from "./constructor.interface";
import { IContainerToken } from "./container-token.interface";

export interface IClassProvider<T = any> {
    useClass: IConstructor<T> | DelayedConstructor<T>;
    provide: IContainerToken;
    scope?: ScopeEnum;
}

export interface IFactoryProvider<T = any> {
    useFactory: (container: DependencyContainer) => T;
    provide: IContainerToken;
    scope?: ScopeEnum;
}

export interface IValueProvider<T = any> {
    useValue: T;
    provide: IContainerToken;
}

export type Provider<T = any> =
    | IConstructor<T>
    | IClassProvider<T>
    | IFactoryProvider<T>
    | IValueProvider<T>;
