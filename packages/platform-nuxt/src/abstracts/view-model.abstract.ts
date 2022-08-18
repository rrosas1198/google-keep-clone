import { Disposable, EventManager, toDisposable } from "@keep/common";
import { onBeforeMount, onBeforeUnmount, onMounted, onScopeDispose, onUnmounted } from "vue";

export class ViewModel<T> extends Disposable {
    private readonly _eventManager = new EventManager<T>();

    constructor() {
        super();

        onBeforeMount(() => this.onCreate());
        onMounted(() => this.onStart());
        onBeforeUnmount(() => this.onStop());
        onUnmounted(() => this.onDestroy());
        onScopeDispose(() => this.dispose());
    }

    public onCreate() {
        this.addDisposableListener(window, "online", this.onOnline.bind(this));
        this.addDisposableListener(window, "offline", this.onOffline.bind(this));
        this.addDisposableListener(
            window.document,
            "visibilitychange",
            this.onVisibilityChange.bind(this)
        );
    }

    public onStart() {
        //
    }

    public onResume() {
        //
    }

    public onOnline() {
        //
    }

    public onOffline() {
        //
    }

    public onPause() {
        //
    }

    public onStop() {
        //
    }

    public onDestroy() {
        //
    }

    public addStateHandler(state: T, handler: () => void) {
        this._eventManager.subscribe(state, handler);
    }

    public setState(state: T) {
        this._eventManager.notify(state);
    }

    public override dispose() {
        super.dispose();
        this._eventManager.dispose();
    }

    protected addDisposableListener(
        target: Window | Document | HTMLElement,
        event: string,
        handler: () => void,
        options?: boolean | AddEventListenerOptions
    ) {
        target.addEventListener(event, handler, options);
        this.shouldDispose(toDisposable(() => target.removeEventListener(event, handler, options)));
    }

    private onVisibilityChange() {
        if (window.document.hidden) {
            this.onPause();
        } else {
            this.onResume();
        }
    }
}
