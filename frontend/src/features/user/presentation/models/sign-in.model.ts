import { ISignInUseCaseParams } from "../../domain/use-cases";

export class SignInModel {
    public email = ref("");
    public password = ref("");

    public getSignInParams(): ISignInUseCaseParams {
        return {
            email: unref(this.email),
            password: unref(this.password)
        };
    }
}
