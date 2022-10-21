import { ContainerDecorator } from "@keep/core";

export const IUserRepository = ContainerDecorator<IUserRepository>("IUserRepository");

export interface IUserRepository {
    signIn(email: string, password: string): Promise<string>;
}
