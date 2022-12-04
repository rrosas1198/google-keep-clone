import { ContainerDecorator } from "@keep/core";

export const IEnvironmentService = ContainerDecorator<IEnvironmentService>("IEnvironmentService");

export interface IEnvironmentService {
    get(path: string, defaultValue?: string): string;
}
