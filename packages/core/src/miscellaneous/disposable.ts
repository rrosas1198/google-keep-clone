import { MultiDisposeException } from "src/exceptions";
import { IDisposable } from "src/interfaces";

export class Disposable implements IDisposable {
    private _toDispose = new Set<IDisposable>();
    private _isDisposed = false;

    public get isDisposed() {
        return this._isDisposed;
    }

    public shouldDispose<T extends IDisposable>(disposable: T): T {
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
            try {
                disposable.dispose();
            } catch (error) {
                errors.push(error);
            }
        }

        if (errors.length === 1) {
            throw errors[0];
        } else if (errors.length > 1) {
            throw new MultiDisposeException(errors);
        }
    }
}
