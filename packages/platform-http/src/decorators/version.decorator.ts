import { Reflector } from "@keep/core";
import { VERSION_TOKEN } from "src/constants";

export function Version(version: string): MethodDecorator {
    return (target: object, key: string | symbol) => {
        Reflector.setMetadata(target.constructor, VERSION_TOKEN, version, key);
    };
}
