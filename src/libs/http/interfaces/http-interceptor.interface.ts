import type { FetchContext } from "ofetch";
import type { IHttpOptions } from "./http-options.interface";
import type { IHttpRequest } from "./http-request.interface";
import type { IHttResponse } from "./http-response.interface";

export interface IHttpInterceptor {
    onRequest?: IHttpRequestInterceptor;
    onResponse?: IHttpResponseInterceptor;
}

export interface IHttpRequestInterceptorContext extends FetchContext {
    options: IHttpOptions;
    request: IHttpRequest;
    response: IHttResponse;
}

export interface IHttpResponseInterceptorContext extends FetchContext {
    options: IHttpOptions;
    request: IHttpRequest;
    response: IHttResponse;
}

export type IHttpRequestInterceptor = (
    context: IHttpRequestInterceptorContext
) => void | Promise<void>;

export type IHttpResponseInterceptor = (
    context: IHttpResponseInterceptorContext
) => void | Promise<void>;
