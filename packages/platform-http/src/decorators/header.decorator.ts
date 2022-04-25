import { extendArrayMetadata } from "@keep/common";
import { HEADERS_METADATA } from "src/constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Header(name: string, value: string): MethodDecorator {
    return (_target: object, _key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        extendArrayMetadata(HEADERS_METADATA, [{ name, value }], descriptor.value);
        return descriptor;
    };
}
