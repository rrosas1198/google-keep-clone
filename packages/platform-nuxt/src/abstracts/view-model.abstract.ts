import { onBeforeMount, onBeforeUnmount, onMounted, onScopeDispose, onUnmounted } from "vue";
import { Disposable } from "./disposable.abstract";

export class ViewModel extends Disposable {
    constructor() {
        super();

        onBeforeMount(() => this.onCreate());
        onMounted(() => this.onStart());
        onBeforeUnmount(() => this.onStop());
        onUnmounted(() => this.onDestroy());
        onScopeDispose(() => this.dispose());
    }

    public onCreate() {
        window.document.addEventListener("visibilitychange", this.onVisibilityChange.bind(this));
    }

    public onStart() {
        //
    }

    public onResume() {
        //
    }

    public onPause() {
        //
    }

    public onStop() {
        window.document.removeEventListener("visibilitychange", this.onVisibilityChange.bind(this));
    }

    public onDestroy() {
        //
    }

    private onVisibilityChange() {
        if (window.document.hidden) {
            this.onPause();
        } else {
            this.onResume();
        }
    }
}
