/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IClassProvider, IContainerProvider } from "../interfaces";

export function isClassProvider<T>(
    provider: IContainerProvider<T>
): provider is IClassProvider<any> {
    return !!(provider as IClassProvider<T>).useClass;
}
