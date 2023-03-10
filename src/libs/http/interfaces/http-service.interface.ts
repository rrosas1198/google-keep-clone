import type { FetchResponse } from "ofetch";
import type { IHttpInterceptor } from "./http-interceptor.interface";
import type { IHttpOptions } from "./http-options.interface";
import type { IHttpRequest } from "./http-request.interface";

export interface IHttpService {
    addInterceptor(interceptor: IHttpInterceptor): void;

    setHeader(name: string, value: string): void;
    appendHeader(name: string, value: string): void;
    removeHeader(name: string): void;

    get<T>(url: IHttpRequest, options?: IHttpOptions): Promise<FetchResponse<T>>;
    post<T>(url: IHttpRequest, options?: IHttpOptions): Promise<FetchResponse<T>>;
    put<T>(url: IHttpRequest, options?: IHttpOptions): Promise<FetchResponse<T>>;
    patch<T>(url: IHttpRequest, options?: IHttpOptions): Promise<FetchResponse<T>>;
    head<T>(url: IHttpRequest, options?: IHttpOptions): Promise<FetchResponse<T>>;
    delete<T>(url: IHttpRequest, options?: IHttpOptions): Promise<FetchResponse<T>>;

    $get<T = unknown>(url: IHttpRequest, options?: IHttpOptions): Promise<T>;
    $post<T = unknown>(url: IHttpRequest, options?: IHttpOptions): Promise<T>;
    $put<T = unknown>(url: IHttpRequest, options?: IHttpOptions): Promise<T>;
    $patch<T = unknown>(url: IHttpRequest, options?: IHttpOptions): Promise<T>;
    $head(url: IHttpRequest, options?: IHttpOptions): Promise<Headers>;
    $delete<T = unknown>(url: IHttpRequest, options?: IHttpOptions): Promise<T>;
}
