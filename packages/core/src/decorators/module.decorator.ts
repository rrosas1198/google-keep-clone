/* eslint-disable @typescript-eslint/no-explicit-any */
import { IModuleMetadata } from "src/interfaces";
import { Reflector } from "src/polyfills";

export function Module(metadata: IModuleMetadata): ClassDecorator {
    return (target: Function) => {
        for (const property in metadata) {
            if (metadata.hasOwnProperty(property)) {
                Reflector.setMetadata(target, property, (metadata as any)[property]);
            }
        }
    };
}
