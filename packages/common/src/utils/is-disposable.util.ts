/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDisposableLike } from "src/interfaces";

export function isDisposable(value: any): value is IDisposableLike {
    return value && "dispose" in value && typeof value.dispose === "function";
}
