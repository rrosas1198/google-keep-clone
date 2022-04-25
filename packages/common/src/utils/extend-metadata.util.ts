/* eslint-disable @typescript-eslint/no-explicit-any */
export function extendArrayMetadata<T extends Array<unknown>>(
    key: string,
    metadata: T,
    target: Function
) {
    const previousValue = Reflect.getMetadata<any[]>(key, target) || [];
    const value = [...previousValue, ...metadata];
    Reflect.defineMetadata(key, value, target);
}
