import { IConstructor } from "./constructor.interface";
import { IModuleMetadata } from "./module-metadata.interface";

export interface IDynamicModule extends IModuleMetadata {
    module: IConstructor;
}
