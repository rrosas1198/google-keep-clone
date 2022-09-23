/* eslint-disable @typescript-eslint/no-explicit-any */
import { IContainerProvider, IFactoryProvider } from "../interfaces";

export function isFactoryProvider<T>(
    provider: IContainerProvider<T>
): provider is IFactoryProvider<any> {
    return !!(provider as IFactoryProvider<T>).useFactory;
}
