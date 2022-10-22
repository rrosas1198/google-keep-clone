/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventHandler } from "h3";
import { IncomingMessage, ServerResponse } from "http";
import { HttpMethodEnum } from "src/enums";

export type IControllerMethodHandler = (
    request: IncomingMessage,
    response: ServerResponse
) => Promise<void>;

export interface IControllerMethodMetadata {
    path: string;
    method: HttpMethodEnum;
    handler: EventHandler;
}
