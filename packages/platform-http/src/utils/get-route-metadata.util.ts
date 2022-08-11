import { ROUTE_METADATA_TOKEN } from "src/constants";
import { RouteMetadata } from "src/interfaces";

export function getRouteMetadata(target: Object, key: string | symbol) {
    const metadata = Reflect.getMetadata(ROUTE_METADATA_TOKEN, target.constructor, key);
    return (metadata || []) as Array<RouteMetadata>;
}
