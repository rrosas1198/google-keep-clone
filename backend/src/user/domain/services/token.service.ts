import { ContainerDecorator } from "@keep/core";

export const ITokenService = ContainerDecorator<ITokenService>("ITokenService");

export interface ITokenService {
    create(userId: number): string;
}
