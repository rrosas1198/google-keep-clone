import { Reflector } from "@keep/core";
import { ROUTE_METADATA_TOKEN } from "src/constants";
import { IRouteMetadata } from "src/interfaces";

export function getRouteMetadata(target: Object, property: string | symbol) {
    const metadata = Reflector.getMetadata(target.constructor, ROUTE_METADATA_TOKEN, property);
    return (metadata || []) as Array<IRouteMetadata>;
}
