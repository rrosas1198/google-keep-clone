import { BehaviorSubject } from "rxjs";
import { ViewModelStateEnum } from "src/enums";
import { toDisposable } from "src/utils";
import { onBeforeMount, onBeforeUnmount, onMounted, onScopeDispose, onUnmounted } from "vue";
import { Disposable } from "./disposable.abstract";

export class ViewModel extends Disposable {
    private readonly _state = new BehaviorSubject(ViewModelStateEnum.NONE);

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
        this._state.complete();
        this._state.unsubscribe();
    }

    public onDestroy() {
        //
    }

    public addStateHandler(state: ViewModelStateEnum, handler: () => void) {
        this.onChangeState(value => {
            if (value !== state) return;
            handler();
        });
    }

    public setState(state: ViewModelStateEnum) {
        this._state.next(state);
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

    private onChangeState(handler: (value: ViewModelStateEnum) => void) {
        this.shouldDispose(this._state.subscribe(handler));
    }

    private onVisibilityChange() {
        if (window.document.hidden) {
            this.onPause();
        } else {
            this.onResume();
        }
    }
}
