/* eslint-disable @typescript-eslint/no-explicit-any */
import { DependencyContainer, InjectionToken } from "tsyringe";
import { DelayedConstructor } from "tsyringe/dist/typings/lazy-helpers";
import { ScopeEnum } from "../enums";
import { Type } from "./type.interface";

export interface ClassProvider<T = any> {
    useClass: Type<T> | DelayedConstructor<T>;
    provide: InjectionToken;
    scope?: ScopeEnum;
}

export interface FactoryProvider<T = any> {
    useFactory: (container: DependencyContainer) => T;
    provide: InjectionToken;
    scope?: ScopeEnum;
}

export interface ValueProvider<T = any> {
    useValue: T;
    provide: InjectionToken;
}

export type Provider<T = any> = Type<T> | ClassProvider<T> | FactoryProvider<T> | ValueProvider<T>;
