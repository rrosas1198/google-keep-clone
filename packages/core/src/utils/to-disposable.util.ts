import { IDisposable } from "src/interfaces";
import { once } from "./once.util";

export function toDisposable(fn: () => void): IDisposable {
    return {
        dispose: once(() => fn())
    };
}
