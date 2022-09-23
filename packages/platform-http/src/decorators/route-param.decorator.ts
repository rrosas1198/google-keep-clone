import { Reflector } from "@keep/core";
import { ROUTE_METADATA_TOKEN } from "src/constants";
import { RouteParamtypesEnum } from "src/enums";
import { getRouteMetadata } from "src/utils";

export function Query(property?: string): ParameterDecorator {
    return createParamDecorator(RouteParamtypesEnum.QUERY)(property);
}

export function Param(property?: string): ParameterDecorator {
    return createParamDecorator(RouteParamtypesEnum.PARAM)(property);
}

export function Body(property?: string): ParameterDecorator {
    return createParamDecorator(RouteParamtypesEnum.BODY)(property);
}

function createParamDecorator(
    paramtype: RouteParamtypesEnum
): (data?: unknown) => ParameterDecorator {
    return (data?: unknown) => (target, key, index) => {
        const metadata = getRouteMetadata(target, key);
        const newMetadata = [...metadata, [paramtype, { index, data }]];
        Reflector.setMetadata(target.constructor, ROUTE_METADATA_TOKEN, newMetadata, key);
    };
}
