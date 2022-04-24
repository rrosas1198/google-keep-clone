import { Provider } from "./provider.interface";
import { Type } from "./type.interface";

export interface ModuleMetadata {
    imports?: Type[];
    providers?: Provider[];
}
