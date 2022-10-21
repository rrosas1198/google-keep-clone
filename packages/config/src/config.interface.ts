import { ContainerDecorator } from "@keep/core";

export const IConfigService = ContainerDecorator<IConfigService>("IConfigService");

export interface IConfigService {
    get(path: string, defaultValue?: string): string;
}
