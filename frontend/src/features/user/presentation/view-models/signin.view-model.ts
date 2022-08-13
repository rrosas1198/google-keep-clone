import { ViewModel } from "@keep/platform-nuxt";
import { SigninUseCase } from "../../domain/use-cases";
import { SigninModel } from "../models";

export class SigninViewModel extends ViewModel {
    public readonly model = new SigninModel();

    constructor(private readonly signinUseCase: SigninUseCase) {
        super();
    }

    public onSubmit() {
        const subscription = this.signinUseCase.execute(this.model.toSigninParams()).subscribe();
        this.addDisposable(subscription);
    }
}
