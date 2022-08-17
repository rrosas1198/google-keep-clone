import { Injectable } from "@keep/common";
import { Observable } from "rxjs";
import { IUserRepository } from "src/features/user/domain/repositories";
import { UserRestDatastore } from "../../datastores/rest";

@Injectable()
export class UserRestRepositoryImpl implements IUserRepository {
    constructor(private readonly userRestDatastore: UserRestDatastore) {}

    public signin(email: string, password: string): Observable<string> {
        return this.userRestDatastore.signin(email, password);
    }
}
