import { Observable } from "rxjs";
import { UserEntity } from "../entities";

export interface UserRepository {
    findByEmail(email: string): Observable<UserEntity>;
}
