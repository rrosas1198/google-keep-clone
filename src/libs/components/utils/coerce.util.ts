/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Ensure type of value
 * @param value - Value to evaluate
 */
export function coerce<T = any>(value: any): T {
    if (typeof value !== "string") {
        return value;
    }

    const _value = _toNative(value);

    if (_value !== -1) {
        return _value as unknown as T;
    }

    try {
        return JSON.parse(value) as T;
    } catch (_e) {
        return value as unknown as T;
    }
}

function _toNative(value: any) {
    const _value = value.toLowerCase();

    switch (_value) {
        case "true":
            return true;
        case "false":
            return false;
        case "null":
            return null;
        case "nan":
            return NaN;
        case "infinity":
            return Infinity;
        case "undefined":
            return undefined;
        case !Number.isNaN(Date.parse(value)):
            return new Date(value);
        default:
            return -1;
    }
}
