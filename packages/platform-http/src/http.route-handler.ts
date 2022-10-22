/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    defineEventHandler,
    getMethod,
    getQuery,
    getRouterParams,
    H3Event,
    MIMES,
    readBody
} from "h3";
import { HttpMethodEnum, HttpStatusEnum, RouteParamtypesEnum } from "./enums";
import { IRouteMetadata } from "./interfaces";

export type IPromiseHandler = (...params: any[]) => Promise<unknown>;

export class HttpRouteHandler {
    public getHandler(handler: IPromiseHandler, routeMetadata: IRouteMetadata[]) {
        const resolveParams = this.resolveHandlerParams(handler, routeMetadata);

        return defineEventHandler(async h3Event => {
            const httpMethod = getMethod(h3Event) as HttpMethodEnum;
            h3Event.res.statusCode = this.getStatusByMethod(httpMethod);
            h3Event.res.setHeader("Content-Type", MIMES.json);
            // response.flushHeaders();

            if (h3Event.res.writableEnded) return;

            const params = await resolveParams(h3Event);
            const result = await handler(...params);

            h3Event.res.end(result);
        });
    }

    protected resolveHandlerParams(handler: IPromiseHandler, routeMetadata: IRouteMetadata[]) {
        return async (h3Event: H3Event) => {
            const params = new Array(handler.length).fill(null);
            const resolve = this.getValueByParamtype(h3Event);

            for (const [paramtype, payload] of routeMetadata) {
                const value = await resolve(paramtype);
                params[payload.index] = value;
            }

            return params;
        };
    }

    protected getValueByParamtype(h3Event: H3Event) {
        return async (paramtype: RouteParamtypesEnum) => {
            switch (paramtype) {
                case RouteParamtypesEnum.REQUEST:
                    return h3Event.req;
                case RouteParamtypesEnum.RESPONSE:
                    return h3Event.res;
                case RouteParamtypesEnum.BODY:
                    return await readBody(h3Event);
                case RouteParamtypesEnum.PARAM:
                    return getRouterParams(h3Event);
                case RouteParamtypesEnum.QUERY:
                    return getQuery(h3Event);
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
