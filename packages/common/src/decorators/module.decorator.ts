/* eslint-disable @typescript-eslint/no-explicit-any */
import { IModuleMetadata } from "src/interfaces";

export function Module(metadata: IModuleMetadata): ClassDecorator {
    return (target: Function) => {
        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflect.defineMetadata(property, (metadata as any)[property], target);
            }
        }
    };
}
