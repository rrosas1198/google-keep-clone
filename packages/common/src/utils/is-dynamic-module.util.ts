/* eslint-disable @typescript-eslint/no-explicit-any */
import { DynamicModule } from "src/interfaces";

export function isDynamicModule(module: any): module is DynamicModule {
    return module && module.module;
}
