import { ContainerDecorator } from "@keep/core";
import { Observable } from "rxjs";

export const IUserRepository = ContainerDecorator("IUserRepository");

export interface IUserRepository {
    signin(email: string, password: string): Observable<string>;
}
