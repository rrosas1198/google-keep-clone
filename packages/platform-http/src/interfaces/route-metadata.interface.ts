/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpMethodEnum } from "src/enums";

export interface RouteMetadata {
    path: string;
    method: HttpMethodEnum;
    handler: (...params: any[]) => Promise<void>;
}
