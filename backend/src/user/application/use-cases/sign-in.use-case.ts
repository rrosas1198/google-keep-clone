import { HttpException, HttpStatusEnum } from "@keep/platform-http";
import { IUserRepository } from "src/user/domain/repositories";
import { IHashService, ITokenService } from "src/user/domain/services";
import { ISignInUseCase } from "src/user/domain/use-cases";
import { CredentialsVo } from "src/user/domain/value-objects";

export class SignInUseCaseImpl implements ISignInUseCase {
    constructor(
        @IHashService private readonly hashService: IHashService,
        @ITokenService private readonly tokenService: ITokenService,
        @IUserRepository private readonly userRepository: IUserRepository
    ) {}

    public async execute(params: CredentialsVo): Promise<string> {
        const response = await this.userRepository.findByEmail(params.value.email);

        if (!response) {
            throw HttpException.fromStatus(HttpStatusEnum.UNAUTHORIZED);
        }

        if (!this.hashService.compare(params.value.password, response.password)) {
            throw HttpException.fromStatus(HttpStatusEnum.UNAUTHORIZED);
        }

        return this.tokenService.create(response.id);
    }
}
