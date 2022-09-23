import { ContainerDecorator } from "@keep/core";

export const IHashService = ContainerDecorator("IHashService");

export interface IHashService {
    compare(value: string, hash: string): boolean;
}
