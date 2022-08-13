import { ISigninUseCaseParams } from "../../domain/use-cases";

export class SigninModel {
    public email = ref("");
    public password = ref("");

    public toSigninParams(): ISigninUseCaseParams {
        return {
            email: unref(this.email),
            password: unref(this.password)
        };
    }
}
