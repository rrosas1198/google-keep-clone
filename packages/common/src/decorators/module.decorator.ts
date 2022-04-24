/* eslint-disable @typescript-eslint/no-explicit-any */
import { ModuleMetadata } from "src/interfaces";

export function Module(metadata: ModuleMetadata): ClassDecorator {
    return (target: Function) => {
        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, (metadata as any)[property], target);
            }
        }
    };
}
