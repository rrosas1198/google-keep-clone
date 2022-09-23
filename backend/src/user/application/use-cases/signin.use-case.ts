import { HttpException, HttpStatusEnum } from "@keep/platform-http";
import { map, MonoTypeOperatorFunction, Observable, tap } from "rxjs";
import { throwIfNotFound } from "src/common/operators";
import { IUserEntity } from "src/user/domain/entities";
import { IUserRepository } from "src/user/domain/repositories";
import { IHashService, ITokenService } from "src/user/domain/services";
import { ISigninUseCase } from "src/user/domain/use-cases";
import { CredentialsVo } from "src/user/domain/value-objects";

export class SigninUseCaseImpl implements ISigninUseCase {
    constructor(
        @IHashService private readonly hashService: IHashService,
        @ITokenService private readonly tokenService: ITokenService,
        @IUserRepository private readonly userRepository: IUserRepository
    ) {}

    public execute(params: CredentialsVo): Observable<string> {
        return this.userRepository
            .findByEmail(params.value.email)
            .pipe(throwIfNotFound(HttpStatusEnum.UNAUTHORIZED))
            .pipe(this.throwIfIncorrectPassword(params.value.password))
            .pipe(map(user => this.tokenService.create(user.id)));
    }

    private throwIfIncorrectPassword(value: string): MonoTypeOperatorFunction<IUserEntity> {
        return tap<IUserEntity>(user => {
            const isCorrect = this.hashService.compare(value, user.password);
            if (isCorrect) return;
            throw HttpException.fromStatus(HttpStatusEnum.UNAUTHORIZED);
        });
    }
}
