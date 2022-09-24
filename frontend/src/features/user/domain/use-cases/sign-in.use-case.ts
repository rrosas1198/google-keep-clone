import { IUseCase } from "@keep/core";
import { IUserRepository } from "../repositories";

export interface ISignInUseCaseParams {
    email: string;
    password: string;
}

export class SignInUseCase implements IUseCase<ISignInUseCaseParams, string> {
    constructor(@IUserRepository private readonly userRepository: IUserRepository) {}

    public execute(params: ISignInUseCaseParams): Promise<string> {
        return this.userRepository.signIn(params.email, params.password);
    }
}
