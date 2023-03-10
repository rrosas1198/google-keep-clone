/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SearchParameters } from "ofetch";
import { $fetch, FetchError } from "ofetch";
import { HttpMethodEnum, HttpStatusEnum } from "./enums";
import { HttpException } from "./exceptions";
import type {
    IHttpInterceptor,
    IHttpOptions,
    IHttpRequestInterceptor,
    IHttpResponseInterceptor,
    IHttpService
} from "./interfaces";

export class HttpService implements IHttpService {
    readonly #_globalHeaders = new Headers();
    readonly #_interceptors: IHttpInterceptor[] = [];

    // TODO: Implements cache ...(1)
    get #_requestInterceptors() {
        return this.#_interceptors
            .map(interceptor => interceptor.onRequest)
            .filter(fn => typeof fn === "function") as IHttpRequestInterceptor[];
    }

    // TODO: Implements cache ...(1)
    get #_responseInterceptors() {
        return this.#_interceptors
            .map(interceptor => interceptor.onResponse)
            .filter(fn => typeof fn === "function") as IHttpResponseInterceptor[];
    }

    // TODO: When user addInterceptor clean private interceptor getters cache ...(1)
    addInterceptor(interceptor: IHttpInterceptor) {
        this.#_interceptors.push(interceptor);
    }

    setHeader(name: string, value: string) {
        this.#_globalHeaders.set(name, value);
    }

    appendHeader(name: string, value: string) {
        this.#_globalHeaders.append(name, value);
    }

    removeHeader(name: string) {
        this.#_globalHeaders.delete(name);
    }

    get<T>(url: string, options?: IHttpOptions) {
        return this.#_doRequest<T>(url, HttpMethodEnum.GET, options);
    }

    post<T>(url: string, options?: IHttpOptions) {
        return this.#_doRequest<T>(url, HttpMethodEnum.POST, options);
    }

    put<T>(url: string, options?: IHttpOptions) {
        return this.#_doRequest<T>(url, HttpMethodEnum.PUT, options);
    }

    patch<T>(url: string, options?: IHttpOptions) {
        return this.#_doRequest<T>(url, HttpMethodEnum.PATCH, options);
    }

    head<T>(url: string, options?: IHttpOptions) {
        return this.#_doRequest<T>(url, HttpMethodEnum.HEAD, options);
    }

    delete<T>(url: string, options?: IHttpOptions) {
        return this.#_doRequest<T>(url, HttpMethodEnum.DELETE, options);
    }

    $get<T = unknown>(url: string, options?: IHttpOptions) {
        return this.get<T>(url, options).then(res => res._data as T);
    }

    $post<T = unknown>(url: string, options?: IHttpOptions) {
        return this.post<T>(url, options).then(res => res._data as T);
    }

    $put<T = unknown>(url: string, options?: IHttpOptions) {
        return this.put<T>(url, options).then(res => res._data as T);
    }

    $patch<T = unknown>(url: string, options?: IHttpOptions) {
        return this.patch<T>(url, options).then(res => res._data as T);
    }

    $head(url: string, options?: IHttpOptions) {
        return this.head<Headers>(url, options).then(res => res.headers);
    }

    $delete<T = unknown>(url: string, options?: IHttpOptions) {
        return this.delete<T>(url, options).then(res => res._data as T);
    }

    #_doRequest<T>(url: string, method: HttpMethodEnum, options?: IHttpOptions) {
        const _options = this.#_doOptions(method, options);
        return $fetch.raw<T>(url, _options).catch(error => {
            if (error instanceof HttpException) throw error;
            if (error instanceof FetchError) {
                throw new HttpException(
                    error.status ?? HttpStatusEnum.INTERNAL_SERVER_ERROR,
                    error.data?.code,
                    error.data?.message
                );
            }
            throw HttpException.fromError(error);
        });
    }

    #_doOptions(method: HttpMethodEnum, options: IHttpOptions = {}) {
        const headers = this.#_mergeHeaders(options.headers);
        const params = this.#_parseParams(options.params);
        const timeout = options.timeout ?? 180000;
        const onRequest = (context: any) => this.#_requestInterceptors.forEach(fn => fn(context));
        const onResponse = (context: any) => this.#_responseInterceptors.forEach(fn => fn(context));

        return <IHttpOptions>{
            ...options,
            method,
            headers,
            params,
            timeout,
            onRequest,
            onResponse
        };
    }

    #_mergeHeaders(headers?: HeadersInit) {
        const _headers = new Headers(this.#_globalHeaders);
        const _entries = headers ? Object.entries(headers) : [];

        for (const [key, value] of _entries) {
            _headers.append(key, value);
        }

        return _headers;
    }

    #_parseParams(params?: SearchParameters): SearchParameters {
        const _entries = params ? Object.entries(params) : [];

        return _entries.reduce((acc, [key, value]) => {
            if ([null, undefined, ""].includes(value)) return acc;
            return Object.assign(acc, { [key]: value });
        }, {});
    }
}
