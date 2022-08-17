import { Inject } from "@keep/common";
import { Observable } from "rxjs";

export const IUserRepositoryToken = Symbol.for("IUserRepositoryToken");
export const IUserRepository = Inject(IUserRepositoryToken);

export interface IUserRepository {
    signin(email: string, password: string): Observable<string>;
}
