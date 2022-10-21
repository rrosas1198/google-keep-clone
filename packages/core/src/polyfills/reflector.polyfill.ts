/* eslint-disable @typescript-eslint/no-explicit-any */
export const Reflector = new (class Reflector {
    public hasMetadata(target: Function, key: symbol | string) {
        return Reflect.has(target, key);
    }

    public getMetadata<T = unknown>(
        target: Function,
        key: symbol | string,
        property?: string | symbol
    ) {
        const _target = !!property ? Reflect.get(target.prototype, property) : target;
        return Reflect.get(_target, key) as T;
    }

    public setMetadata<T = unknown>(
        target: Function,
        key: symbol | string,
        value: T,
        property?: string | symbol
    ) {
        const _target = !!property ? Reflect.get(target.prototype, property) : target;
        Reflect.defineProperty(_target, key, { value, writable: true });
    }
})();
