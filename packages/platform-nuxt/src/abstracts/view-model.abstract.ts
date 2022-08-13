import { onBeforeUnmount } from "vue";
import { Disposable } from "./disposable.abstract";

export class ViewModel extends Disposable {
    constructor() {
        super();

        onBeforeUnmount(() => this.dispose());
    }
}
