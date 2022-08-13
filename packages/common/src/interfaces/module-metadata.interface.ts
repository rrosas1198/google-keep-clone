import { IConstructor } from "./constructor.interface";
import { IDynamicModule } from "./dynamic-module.interface";
import { Provider } from "./provider.interface";

export interface IModuleMetadata {
    imports?: Array<IConstructor | IDynamicModule>;
    providers?: Provider[];
    controllers?: IConstructor[]; // HttpPlatform
}
