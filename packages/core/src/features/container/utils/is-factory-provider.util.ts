/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IContainerProvider, IFactoryProvider } from "../interfaces";

export function isFactoryProvider<T>(
    provider: IContainerProvider<T>
): provider is IFactoryProvider<any> {
    return !!(provider as IFactoryProvider<T>).useFactory;
}
