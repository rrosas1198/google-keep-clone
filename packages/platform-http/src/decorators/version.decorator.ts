import { VERSION_TOKEN } from "src/constants";

export function Version(version: string): MethodDecorator {
    return (target: object, key: string | symbol) => {
        Reflect.defineMetadata(VERSION_TOKEN, version, target.constructor, key);
    };
}
