/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EventHandler } from "h3";
import type { IncomingMessage, ServerResponse } from "http";
import type { HttpMethodEnum } from "src/enums";

export type IControllerMethodHandler = (
    request: IncomingMessage,
    response: ServerResponse
) => Promise<void>;

export interface IControllerMethodMetadata {
    path: string;
    method: HttpMethodEnum;
    handler: EventHandler;
}
