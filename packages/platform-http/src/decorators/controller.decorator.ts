import { Injectable, Type } from "@keep/common";
import { CONTROLLER_TOKEN, PATH_TOKEN, VERSION_TOKEN } from "src/constants";

export interface ControllerOptions {
    path?: string;
    version?: string;
}

export function Controller(options?: ControllerOptions) {
    return function (target: Type) {
        Reflect.defineMetadata(CONTROLLER_TOKEN, true, target);
        Reflect.defineMetadata(PATH_TOKEN, options?.path || "/", target);
        Reflect.defineMetadata(VERSION_TOKEN, options?.version || "v1", target);
        Injectable()(target);
    };
}
