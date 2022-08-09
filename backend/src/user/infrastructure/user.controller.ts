import { Controller, Post } from "@keep/platform-http";
import { map, of } from "rxjs";
import { catchValueObject } from "src/common/operators";
import { SigninUseCase } from "../application/use-cases";
import { CredentialsVo } from "../domain/value-objects";
import { CredentialsDto } from "./dtos";

@Controller({ path: "/user" })
export class UserController {
    constructor(private readonly signinUseCase: SigninUseCase) {}

    @Post("/signin")
    public signin(credentialsDto: CredentialsDto) {
        return of(CredentialsVo.fromProps(credentialsDto))
            .pipe(catchValueObject())
            .pipe(map(credentialsVo => this.signinUseCase.execute(credentialsVo)));
    }

    @Post("/signup")
    public signup() {
        throw new Error("Method not implemented");
    }
}
