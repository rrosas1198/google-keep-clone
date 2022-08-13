import { IConstructor, Provider } from "../interfaces";

export function isConstructor(provider: Provider): provider is IConstructor {
    return typeof provider === "function";
}
