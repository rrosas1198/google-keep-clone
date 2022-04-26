import { DynamicModule } from "./dynamic-module.interface";
import { Provider } from "./provider.interface";
import { Type } from "./type.interface";

export interface ModuleMetadata {
    imports?: Array<Type | DynamicModule>;
    providers?: Provider[];
    controllers?: Type[]; // HttpPlatform
}

export type ModuleMetadataKey = keyof ModuleMetadata;
