/* eslint-disable @typescript-eslint/no-explicit-any */
export const Reflector = new (class Reflector {
    public hasMetadata(target: Function, key: symbol | string) {
        return !!(target as any)?.[key];
    }

    public getMetadata<T = unknown>(
        target: Function,
        key: symbol | string,
        property?: string | symbol
    ) {
        const _target = !!property ? target.prototype?.[property] : target;
        return _target?.[key] as T;
    }

    public setMetadata<T = unknown>(
        target: Function,
        key: symbol | string,
        value: T,
        property?: string | symbol
    ) {
        const _target = !!property ? target.prototype?.[property] : target;
        Object.defineProperty(_target, key, { value, writable: true });
    }
})();
