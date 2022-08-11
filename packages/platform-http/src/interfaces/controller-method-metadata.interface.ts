/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpMethodEnum } from "src/enums";

export type ControllerMethodHandler = (...params: any[]) => Promise<unknown>;

export interface ControllerMethodMetadata {
    path: string;
    method: HttpMethodEnum;
    handler: ControllerMethodHandler;
}
