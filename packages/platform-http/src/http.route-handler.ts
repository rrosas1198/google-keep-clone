/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    getMethod,
    getQuery,
    getRouterParams,
    IncomingMessage,
    MIMES,
    readBody,
    ServerResponse
} from "h3";
import { HttpMethodEnum, HttpStatusEnum, RouteParamtypesEnum } from "./enums";
import { IRouteMetadata } from "./interfaces";

export type IPromiseHandler = (...params: any[]) => Promise<unknown>;

export class HttpRouteHandler {
    public getHandler(handler: IPromiseHandler, routeMetadata: IRouteMetadata[]) {
        const resolveParams = this.resolveHandlerParams(handler, routeMetadata);

        return async (request: IncomingMessage, response: ServerResponse) => {
            const httpMethod = getMethod(request) as HttpMethodEnum;
            response.statusCode = this.getStatusByMethod(httpMethod);
            response.setHeader("Content-Type", MIMES.json);
            // response.flushHeaders();

            if (response.writableEnded) return;

            const params = await resolveParams(request, response);
            const result = await handler(...params);

            response.end(result);
        };
    }

    protected resolveHandlerParams(handler: IPromiseHandler, routeMetadata: IRouteMetadata[]) {
        return async (request: IncomingMessage, response: ServerResponse) => {
            const params = new Array(handler.length).fill(null);
            const resolve = this.getValueByParamtype(request, response);

            for (const [paramtype, payload] of routeMetadata) {
                const value = await resolve(paramtype);
                params[payload.index] = value;
            }

            return params;
        };
    }

    protected getValueByParamtype(request: IncomingMessage, response: ServerResponse) {
        return async (paramtype: RouteParamtypesEnum) => {
            switch (paramtype) {
                case RouteParamtypesEnum.REQUEST:
                    return request;
                case RouteParamtypesEnum.RESPONSE:
                    return response;
                case RouteParamtypesEnum.BODY:
                    return await readBody(request);
                case RouteParamtypesEnum.PARAM:
                    return getRouterParams(request);
                case RouteParamtypesEnum.QUERY:
                    return getQuery(request);
                default:
                    return null;
            }
        };
    }

    protected getStatusByMethod(httpMethod: HttpMethodEnum) {
        switch (httpMethod) {
            case HttpMethodEnum.POST:
                return HttpStatusEnum.CREATED;
            default:
                return HttpStatusEnum.OK;
        }
    }
}
