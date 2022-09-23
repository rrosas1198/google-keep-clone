import { IContainerProvider } from "src/features";
import { IConstructor } from "./constructor.interface";
import { IDynamicModule } from "./dynamic-module.interface";

export interface IModuleMetadata {
    imports?: Array<IConstructor | IDynamicModule>;
    providers?: IContainerProvider[];
    controllers?: IConstructor[]; // HttpPlatform
}
