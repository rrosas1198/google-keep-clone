/* eslint-disable @typescript-eslint/no-explicit-any */
export class HttpException extends Error {
    public timestamp: number;
    public statusCode: number;

    constructor(statusCode: number, message?: string) {
        super(message);

        this.name = "HttpException";
        this.timestamp = Date.now();
        this.statusCode = statusCode;

        Error.call(this);

        if (typeof Error.prepareStackTrace === "function") {
            Error.prepareStackTrace(this, this.constructor as any);
        }

        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    public static fromStatus(statusCode: number, message?: any) {
        return new HttpException(statusCode, message);
    }
}
