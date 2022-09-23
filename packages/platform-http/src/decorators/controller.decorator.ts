import { IConstructor, Reflector } from "@keep/core";
import { CONTROLLER_TOKEN, PATH_TOKEN, VERSION_TOKEN } from "src/constants";

export interface ControllerOptions {
    path?: string;
    version?: string;
}

export function Controller(options?: ControllerOptions) {
    return function (target: IConstructor) {
        Reflector.setMetadata(target, CONTROLLER_TOKEN, true);
        Reflector.setMetadata(target, PATH_TOKEN, options?.path || "/");
        Reflector.setMetadata(target, VERSION_TOKEN, options?.version || "v1");
    };
}
