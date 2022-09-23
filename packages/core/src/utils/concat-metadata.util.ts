import { Reflector } from "src/polyfills";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function concatMetadata<T extends unknown[]>(key: string, metadata: T, target: Function) {
    const prevValue = Reflector.getMetadata<any[]>(target, key) || [];
    const newValue = [...prevValue, ...metadata];
    Reflector.setMetadata(target, key, newValue);
}
