import { Injectable, ScopeEnum } from "@keep/common";
import { ViewModel } from "@keep/platform-nuxt";
import { SigninUseCase } from "../../domain/use-cases";
import { SigninModel } from "../models";

@Injectable(ScopeEnum.TRANSIENT)
export class SigninViewModel extends ViewModel<never> {
    public readonly model = new SigninModel();

    constructor(private readonly signinUseCase: SigninUseCase) {
        super();
    }

    public onSubmit() {
        const subscription = this.signinUseCase.execute(this.model.getSigninParams()).subscribe();
        this.shouldDispose(subscription);
    }
}
