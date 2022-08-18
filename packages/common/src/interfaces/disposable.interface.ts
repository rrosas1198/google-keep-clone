import { Subscription } from "rxjs";

export type IDisposable = IDisposableLike | Subscription;

export interface IDisposableLike {
    dispose(): void;
}
