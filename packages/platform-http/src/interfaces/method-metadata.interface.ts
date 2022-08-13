import { HttpMethodEnum } from "src/enums";

export interface IMethodMetadata {
    path: string;
    method: HttpMethodEnum;
    methodName: string;
    version?: string;
}
