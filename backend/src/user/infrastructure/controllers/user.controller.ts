import { Body, Controller, Post } from "@keep/platform-http";
import { ValidationException } from "src/common/exceptions";
import { SignInUseCaseImpl } from "src/user/application/use-cases";
import { ISignInUseCase } from "src/user/domain/use-cases";
import { CredentialsVo } from "../../domain/value-objects";
import { ICredentialsDto } from "../dtos";

@Controller({ path: "/user" })
export class UserController {
    constructor(@ISignInUseCase private readonly signInUseCase: SignInUseCaseImpl) {}

    @Post("/sign-in")
    public async signIn(@Body() credentialsDto: ICredentialsDto) {
        const [errors, credentials] = CredentialsVo.fromProps(credentialsDto);

        if (errors.length > 0) {
            throw ValidationException.fromErrors(errors);
        }

        return this.signInUseCase.execute(credentials as CredentialsVo);
    }

    @Post("/sign-up")
    public signup() {
        throw new Error("Method not implemented");
    }
}
