import { Reflector } from "@keep/core";
import { HTTP_CODE_TOKEN } from "src/constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function HttpCode(statusCode: number): MethodDecorator {
    return (_target: object, _key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        Reflector.setMetadata(descriptor.value, HTTP_CODE_TOKEN, statusCode);
        return descriptor;
    };
}
