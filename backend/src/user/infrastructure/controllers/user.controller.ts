import { Body, Controller, Post } from "@keep/platform-http";
import { mergeMap, of } from "rxjs";
import { catchValueObject } from "src/common/operators";
import { SigninUseCaseImpl } from "src/user/application/use-cases";
import { ISigninUseCase } from "src/user/domain/use-cases";
import { CredentialsVo } from "../../domain/value-objects";
import { ICredentialsDto } from "../dtos";

@Controller({ path: "/user" })
export class UserController {
    constructor(@ISigninUseCase private readonly signinUseCase: SigninUseCaseImpl) {}

    @Post("/signin")
    public signin(@Body() credentialsDto: ICredentialsDto) {
        return of(CredentialsVo.fromProps(credentialsDto))
            .pipe(catchValueObject())
            .pipe(mergeMap(credentialsVo => this.signinUseCase.execute(credentialsVo)));
    }

    @Post("/signup")
    public signup() {
        throw new Error("Method not implemented");
    }
}
