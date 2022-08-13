import { Injectable, IUseCase } from "@keep/common";
import { HttpException, HttpStatusEnum } from "@keep/platform-http";
import { map, MonoTypeOperatorFunction, Observable, tap } from "rxjs";
import { throwIfNotFound } from "src/common/operators";
import { UserEntity } from "src/user/domain/entities";
import { CredentialsVo } from "src/user/domain/value-objects";
import { UserRepositoryImpl } from "../repositories";
import { HashService, TokenService } from "../services";

@Injectable()
export class SigninUseCase implements IUseCase<CredentialsVo, string> {
    constructor(
        private readonly hashService: HashService,
        private readonly tokenService: TokenService,
        private readonly userRepository: UserRepositoryImpl
    ) {}

    public execute(params: CredentialsVo): Observable<string> {
        return this.userRepository
            .findByEmail(params.value.email)
            .pipe(throwIfNotFound(HttpStatusEnum.UNAUTHORIZED))
            .pipe(this.throwIfIncorrectPassword(params.value.password))
            .pipe(map(user => this.tokenService.create(user.id)));
    }

    private throwIfIncorrectPassword(value: string): MonoTypeOperatorFunction<UserEntity> {
        return tap<UserEntity>(user => {
            const isCorrect = this.hashService.compare(value, user.password);
            if (isCorrect) return;
            throw HttpException.fromStatus(HttpStatusEnum.UNAUTHORIZED);
        });
    }
}
