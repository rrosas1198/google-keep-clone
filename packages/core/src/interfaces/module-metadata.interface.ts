import type { IContainerProvider } from "src/features";
import type { IConstructor } from "./constructor.interface";
import type { IDynamicModule } from "./dynamic-module.interface";

export interface IModuleMetadata {
    imports?: Array<IConstructor | IDynamicModule>;
    providers?: IContainerProvider[];
    controllers?: IConstructor[]; // HttpPlatform
}
