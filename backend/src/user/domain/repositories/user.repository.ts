import { ContainerDecorator } from "@keep/core";
import { Observable } from "rxjs";
import { IUserEntity } from "../entities";

export const IUserRepository = ContainerDecorator("IUserRepositoryToken");

export interface IUserRepository {
    findByEmail(email: string): Observable<IUserEntity>;
}
