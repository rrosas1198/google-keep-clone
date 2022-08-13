/* eslint-disable @typescript-eslint/no-explicit-any */
import { IncomingMessage, ServerResponse } from "h3";
import { HttpMethodEnum } from "src/enums";

export type IControllerMethodHandler = (
    request: IncomingMessage,
    response: ServerResponse
) => Promise<void>;

export interface IControllerMethodMetadata {
    path: string;
    method: HttpMethodEnum;
    handler: IControllerMethodHandler;
}
