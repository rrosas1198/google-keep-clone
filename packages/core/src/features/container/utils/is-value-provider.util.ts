import type { IContainerProvider, IValueProvider } from "../interfaces";

export function isValueProvider<T>(provider: IContainerProvider<T>): provider is IValueProvider<T> {
    return (provider as IValueProvider<T>).useValue !== undefined;
}
