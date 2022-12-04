import type { IConstructor } from "./constructor.interface";
import type { IModuleMetadata } from "./module-metadata.interface";

export interface IDynamicModule extends IModuleMetadata {
    module: IConstructor;
}
