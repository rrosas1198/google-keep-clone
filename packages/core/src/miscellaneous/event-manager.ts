import { IDisposable, IEventListener } from "src/interfaces";
import { toDisposable } from "src/utils";

export class EventManager<T> implements IDisposable {
    private _listeners = new Map<T, Set<IEventListener>>();
    private _toDispose: IDisposable;

    constructor() {
        this._toDispose = toDisposable(() => this._listeners.clear());
    }

    public subscribe(eventType: T, listener: IEventListener) {
        const listeners = this._listeners.get(eventType) || new Set();
        listeners.add(listener);
        this._listeners.set(eventType, listeners);
    }

    public unsubscribe(eventType: T, listener: IEventListener) {
        if (!this._listeners.has(eventType)) return;

        const listeners = this._listeners.get(eventType) as Set<IEventListener>;
        listeners.delete(listener);
        this._listeners.set(eventType, listeners);
    }

    public notify<V = unknown>(eventType: T, payload?: V) {
        if (!this._listeners.has(eventType)) return;

        const listeners = this._listeners.get(eventType) as Set<IEventListener>;
        listeners.forEach(listener => listener(payload));
    }

    public dispose() {
        this._toDispose.dispose();
    }
}
