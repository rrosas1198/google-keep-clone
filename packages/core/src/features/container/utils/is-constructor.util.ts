import type { IConstructor } from "src/interfaces";

export function isConstructor(value: unknown): value is IConstructor {
    return typeof value === "function";
}

export function isClassFunction(value: unknown) {
    return /^class\s/.test(Function.prototype.toString.call(value));
}
