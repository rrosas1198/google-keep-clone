import { Subscription } from "rxjs";
import { isSubscription } from "rxjs/internal/Subscription";
import { MultiDisposeError } from "src/exceptions";
import { IDisposable } from "src/interfaces";

export class Disposable implements IDisposable {
    private _toDispose = new Set<IDisposable | Subscription>();
    private _isDisposed = false;

    public get isDisposed() {
        return this._isDisposed;
    }

    public shouldDispose(disposable: IDisposable | Subscription): IDisposable | Subscription {
        if ((disposable as unknown as Disposable) === this) {
            throw new Error("Disposable: Cannot register on itself");
        }

        if (!this._isDisposed) {
            this._toDispose.add(disposable);
        }

        return disposable;
    }

    public dispose() {
        if (this._isDisposed) return;

        this._isDisposed = true;
        this.clear();
    }

    private clear() {
        try {
            this.tryDispose();
        } finally {
            this._toDispose.clear();
        }
    }

    private tryDispose() {
        const errors: unknown[] = [];
        const disposables = this._toDispose.values();

        for (const disposable of disposables) {
            const disposeFn = isSubscription(disposable)
                ? disposable.unsubscribe
                : disposable.dispose;

            try {
                disposeFn();
            } catch (error) {
                errors.push(error);
            }
        }

        if (errors.length === 1) {
            throw errors[0];
        } else if (errors.length > 1) {
            throw new MultiDisposeError(errors);
        }
    }
}
