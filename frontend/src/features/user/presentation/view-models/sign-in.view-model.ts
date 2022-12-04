import { ViewModel } from "@keep/platform-nuxt";
import type { SignInUseCase } from "../../domain/use-cases";
import { SignInModel } from "../models";

export class SignInViewModel extends ViewModel<never> {
    public readonly model = new SignInModel();

    constructor(private readonly signInUseCase: SignInUseCase) {
        super();
    }

    public async onSubmit() {
        await this.signInUseCase.execute(this.model.getSignInParams());
    }
}
