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
import { Observable } from "rxjs";
import { Writable } from "stream";
import { HttpMethodEnum, HttpStatusEnum, RouteParamtypesEnum } from "./enums";
import { IRouteMetadata } from "./interfaces";

export type ObservableHandler = (...params: any[]) => Observable<unknown>;

export class HttpRouteHandler {
    public getHandler(handler: ObservableHandler, routeMetadata: IRouteMetadata[]) {
        const resolveParams = this.resolveHandlerParams(handler, routeMetadata);

        return async (request: IncomingMessage, response: ServerResponse) => {
            const httpMethod = getMethod(request) as HttpMethodEnum;
            response.statusCode = this.getStatusByMethod(httpMethod);
            response.setHeader("Content-Type", MIMES.json);
            // response.flushHeaders();

            if (response.writableEnded) return;

            const stream = new Writable();

            const parameters = await resolveParams(request, response);
            const observable = handler(...parameters).subscribe({
                next: value => stream.write(value, "utf-8"),
                complete: () => response.end(stream)
            });

            request.on("close", () => observable.unsubscribe());
        };
    }

    protected resolveHandlerParams(handler: ObservableHandler, routeMetadata: IRouteMetadata[]) {
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
        return (paramtype: RouteParamtypesEnum) => {
            switch (paramtype) {
                case RouteParamtypesEnum.REQUEST:
                    return request;
                case RouteParamtypesEnum.RESPONSE:
                    return response;
                case RouteParamtypesEnum.BODY:
                    return readBody(request);
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
