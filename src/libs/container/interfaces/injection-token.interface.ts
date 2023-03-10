import type { IAbstract } from "./abstract.interface";
import type { IType } from "./type.interface";

export type IInjectionToken<T = unknown> = IType<T> | IAbstract<T> | symbol | string;
