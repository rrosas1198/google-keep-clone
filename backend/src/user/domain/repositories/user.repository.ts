import { ContainerDecorator } from "@keep/core";
import { IUserEntity } from "../entities";

export const IUserRepository = ContainerDecorator<IUserRepository>("IUserRepositoryToken");

export interface IUserRepository {
    findByEmail(email: string): Promise<IUserEntity>;
}
