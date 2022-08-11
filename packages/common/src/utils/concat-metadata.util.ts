/* eslint-disable @typescript-eslint/no-explicit-any */
export function concatMetadata<T extends Array<unknown>>(
    key: string,
    metadata: T,
    target: Function
) {
    const prevValue = Reflect.getMetadata<any[]>(key, target) || [];
    const newValue = [...prevValue, ...metadata];
    Reflect.defineMetadata(key, newValue, target);
}
