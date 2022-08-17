import { Injectable, IUseCase } from "@keep/common";
import { Observable } from "rxjs";
import { IUserRepository } from "../repositories";

export interface ISigninUseCaseParams {
    email: string;
    password: string;
}

@Injectable()
export class SigninUseCase implements IUseCase<ISigninUseCaseParams, string> {
    constructor(@IUserRepository private readonly userRepository: IUserRepository) {}

    public execute(params: ISigninUseCaseParams): Observable<string> {
        return this.userRepository.signin(params.email, params.password);
    }
}
