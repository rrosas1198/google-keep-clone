/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDisposable } from "src/interfaces";

export function isDisposable(value: any): value is IDisposable {
    return value && "dispose" in value && typeof value.dispose === "function";
}
