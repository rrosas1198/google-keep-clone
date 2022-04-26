import { HttpMethodEnum } from "src/enums";

export interface MethodMetadata {
    path: string;
    method: HttpMethodEnum;
    methodName: string;
    version?: string;
}
