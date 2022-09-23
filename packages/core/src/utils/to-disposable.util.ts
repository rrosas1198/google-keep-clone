import { IDisposableLike } from "src/interfaces";
import { once } from "./once.util";

export function toDisposable(fn: () => void): IDisposableLike {
    return {
        dispose: once(() => fn())
    };
}
