/* eslint-disable @typescript-eslint/no-explicit-any */
import { METHOD_TOKEN, PATH_TOKEN } from "src/constants";
import { HttpMethodEnum } from "src/enums";

export interface RequestMappingMetadata {
    path?: string;
    method?: HttpMethodEnum;
}

export function RequestMapping(metadata: RequestMappingMetadata): MethodDecorator {
    const pathMetadata = metadata[PATH_TOKEN] || "/";
    const requestMethod = metadata[METHOD_TOKEN] || HttpMethodEnum.GET;

    return (target: object, key: string | symbol) => {
        Reflect.defineMetadata(PATH_TOKEN, pathMetadata, target.constructor, key);
        Reflect.defineMetadata(METHOD_TOKEN, requestMethod, target.constructor, key);
    };
}

export function createMappingDecorator(method: HttpMethodEnum) {
    return (path?: string): MethodDecorator => {
        return RequestMapping({
            [PATH_TOKEN]: path,
            [METHOD_TOKEN]: method
        });
    };
}

export const Post = createMappingDecorator(HttpMethodEnum.POST);
export const Get = createMappingDecorator(HttpMethodEnum.GET);
export const Delete = createMappingDecorator(HttpMethodEnum.DELETE);
export const Put = createMappingDecorator(HttpMethodEnum.PUT);
export const Patch = createMappingDecorator(HttpMethodEnum.PATCH);
export const Options = createMappingDecorator(HttpMethodEnum.OPTIONS);
export const Head = createMappingDecorator(HttpMethodEnum.HEAD);
export const All = createMappingDecorator(HttpMethodEnum.ALL);
