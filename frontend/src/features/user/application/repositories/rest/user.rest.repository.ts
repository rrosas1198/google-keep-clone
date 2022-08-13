import { Observable } from "rxjs";
import { IUserDatastore } from "src/features/user/domain/datastore";
import { IUserRepository } from "src/features/user/domain/repositories";

export class UserRestRepositoryImpl implements IUserRepository {
    constructor(@IUserDatastore private readonly userDatastore: IUserDatastore) {}

    public signup(email: string, password: string): Observable<string> {
        return this.userDatastore.signin(email, password);
    }
}
