import type { IValueOfMap } from "src/interfaces";

export enum HttpStatusEnum {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    EARLY_HINTS = 103,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    AMBIGUOUS = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    I_AM_A_TEAPOT = 418,
    MISDIRECTED = 421,
    UNPROCESSABLE_ENTITY = 422,
    FAILED_DEPENDENCY = 424,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505
}

export namespace HttpStatusEnum {
    const properties = new Map([
        [HttpStatusEnum.CONTINUE, { name: "Continue" }],
        [HttpStatusEnum.SWITCHING_PROTOCOLS, { name: "Switching Protocols" }],
        [HttpStatusEnum.PROCESSING, { name: "Processing" }],
        [HttpStatusEnum.EARLY_HINTS, { name: "Early Hints" }],
        [HttpStatusEnum.OK, { name: "Ok" }],
        [HttpStatusEnum.CREATED, { name: "Created" }],
        [HttpStatusEnum.ACCEPTED, { name: "Accepted" }],
        [HttpStatusEnum.NON_AUTHORITATIVE_INFORMATION, { name: "Non Authoritative Information" }],
        [HttpStatusEnum.NO_CONTENT, { name: "No Content" }],
        [HttpStatusEnum.RESET_CONTENT, { name: "Reset Content" }],
        [HttpStatusEnum.PARTIAL_CONTENT, { name: "Partial Content" }],
        [HttpStatusEnum.AMBIGUOUS, { name: "Ambiguous" }],
        [HttpStatusEnum.MOVED_PERMANENTLY, { name: "Moved Permanently" }],
        [HttpStatusEnum.FOUND, { name: "Found" }],
        [HttpStatusEnum.SEE_OTHER, { name: "See Other" }],
        [HttpStatusEnum.NOT_MODIFIED, { name: "Not Modified" }],
        [HttpStatusEnum.TEMPORARY_REDIRECT, { name: "Temporary Redirect" }],
        [HttpStatusEnum.PERMANENT_REDIRECT, { name: "Permanent Redirect" }],
        [HttpStatusEnum.BAD_REQUEST, { name: "Bad Request" }],
        [HttpStatusEnum.UNAUTHORIZED, { name: "Unauthorized" }],
        [HttpStatusEnum.PAYMENT_REQUIRED, { name: "Payment Required" }],
        [HttpStatusEnum.FORBIDDEN, { name: "Forbidden" }],
        [HttpStatusEnum.NOT_FOUND, { name: "Not Found" }],
        [HttpStatusEnum.METHOD_NOT_ALLOWED, { name: "Method Not Allowed" }],
        [HttpStatusEnum.NOT_ACCEPTABLE, { name: "Not Acceptable" }],
        [HttpStatusEnum.PROXY_AUTHENTICATION_REQUIRED, { name: "Proxy Authentication Required" }],
        [HttpStatusEnum.REQUEST_TIMEOUT, { name: "Request Timeout" }],
        [HttpStatusEnum.CONFLICT, { name: "Conflict" }],
        [HttpStatusEnum.GONE, { name: "Gone" }],
        [HttpStatusEnum.LENGTH_REQUIRED, { name: "Length Required" }],
        [HttpStatusEnum.PRECONDITION_FAILED, { name: "Precondition Failed" }],
        [HttpStatusEnum.PAYLOAD_TOO_LARGE, { name: "Payload Too Large" }],
        [HttpStatusEnum.URI_TOO_LONG, { name: "Uri Too Long" }],
        [HttpStatusEnum.UNSUPPORTED_MEDIA_TYPE, { name: "Unsupported Media Type" }],
        [
            HttpStatusEnum.REQUESTED_RANGE_NOT_SATISFIABLE,
            { name: "Requested Range Not Satisfiable" }
        ],
        [HttpStatusEnum.EXPECTATION_FAILED, { name: "Expectation Failed" }],
        [HttpStatusEnum.I_AM_A_TEAPOT, { name: "I Am A Teapot" }],
        [HttpStatusEnum.MISDIRECTED, { name: "Misdirected" }],
        [HttpStatusEnum.UNPROCESSABLE_ENTITY, { name: "Unprocessable Entity" }],
        [HttpStatusEnum.FAILED_DEPENDENCY, { name: "Failed Dependency" }],
        [HttpStatusEnum.TOO_MANY_REQUESTS, { name: "Too Many Requests" }],
        [HttpStatusEnum.INTERNAL_SERVER_ERROR, { name: "Internal Server Error" }],
        [HttpStatusEnum.NOT_IMPLEMENTED, { name: "Not Implemented" }],
        [HttpStatusEnum.BAD_GATEWAY, { name: "Bad Gateway" }],
        [HttpStatusEnum.SERVICE_UNAVAILABLE, { name: "Service Unavailable" }],
        [HttpStatusEnum.GATEWAY_TIMEOUT, { name: "Gateway Timeout" }],
        [HttpStatusEnum.HTTP_VERSION_NOT_SUPPORTED, { name: "Http Version Not Supported" }]
    ]);

    export function getProperty<T extends IValueOfMap<typeof properties>, V extends keyof T>(
        value: number,
        property: V
    ): T[V] | undefined {
        if (!properties.has(value)) return undefined;
        return (properties.get(value) as T)?.[property];
    }
}
