import type { IConstructor } from "src/interfaces";

export interface IContainerDecorator<T = unknown> {
    (...params: unknown[]): void;
    type: T;
}

export type IContainerToken<T = unknown> = IContainerDecorator<T> | IConstructor<T>;
