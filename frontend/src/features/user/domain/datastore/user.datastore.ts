import { Inject } from "@keep/common";
import { Observable } from "rxjs";

export const IUserDatastoreToken = Symbol.for("IUserDatastoreToken");
export const IUserDatastore = Inject(IUserDatastoreToken);

export interface IUserDatastore {
    signin(email: string, password: string): Observable<string>;
}
