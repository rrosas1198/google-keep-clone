import { of } from "rxjs";
import { IUserDatastore } from "src/features/user/domain/datastore";

export class UserRestDatastoreImpl implements IUserDatastore {
    public signin(_email: string, _password: string) {
        return of("7d2abf2d0fa7c3a0c13236910f30bc43");
    }
}
