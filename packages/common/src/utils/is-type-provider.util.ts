import { Provider, Type } from "../interfaces";

export function isTypeProvider(provider: Provider): provider is Type {
    return typeof provider === "function";
}
