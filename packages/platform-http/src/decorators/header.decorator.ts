import { concatMetadata } from "@keep/common";
import { HEADERS_TOKEN } from "src/constants";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Header(name: string, value: string): MethodDecorator {
    return (_target: object, _key: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
        concatMetadata(HEADERS_TOKEN, [{ name, value }], descriptor.value);
        return descriptor;
    };
}
