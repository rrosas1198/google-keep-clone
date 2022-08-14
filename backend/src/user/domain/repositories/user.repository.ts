import { Inject } from "@keep/common";
import { Observable } from "rxjs";
import { IUserEntity } from "../entities";

export const IUserRepositoryToken = Symbol.for("IUserRepositoryToken");
export const IUserRepository = Inject(IUserRepositoryToken);

export interface IUserRepository {
    findByEmail(email: string): Observable<IUserEntity>;
}
