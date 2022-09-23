import { ViewModel } from "@keep/platform-nuxt";
import { CoreViewStateEnum } from "../enums";

export class CoreViewModel extends ViewModel<CoreViewStateEnum> {
    constructor() {
        super();

        this.addStateHandler(CoreViewStateEnum.LOADING_START, () => {
            console.log("CoreViewModel -> loading start");
        });

        this.addStateHandler(CoreViewStateEnum.LOADING_END, () => {
            console.log("CoreViewModel -> loading end");
        });
    }
}
