import { Controller, Post } from "@keep/platform-http";
import { SigninUseCase } from "../application/use-cases";
import { SigninDto } from "./dtos";

@Controller({ path: "/user" })
export class UserController {
    constructor(private readonly signinUseCase: SigninUseCase) {}

    @Post("/signin")
    public signin(signinDto: SigninDto) {
        return this.signinUseCase.execute({ email: signinDto.email, password: signinDto.password });
    }

    @Post("/signup")
    public signup() {
        throw new Error("Method not implemented");
    }
}
