import { Observable, of } from "rxjs";
import { IUserRepository } from "src/features/user/domain/repositories";

export class UserMockRepositoryImpl implements IUserRepository {
    public signin(email: string, password: string): Observable<string> {
        const values = Array.from(email.concat(password));
        return of(values.map(() => Math.random().toString().substring(2)).join(""));
    }
}
