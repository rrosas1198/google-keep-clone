import { ContainerDecorator } from "@keep/core";

export const ITokenService = ContainerDecorator("ITokenService");

export interface ITokenService {
    create(userId: number): string;
}
