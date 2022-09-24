/* eslint-disable @typescript-eslint/no-explicit-any */
import { IDynamicModule } from "src/interfaces";

export function isDynamicModule(module: any): module is IDynamicModule {
    return module && module.module;
}