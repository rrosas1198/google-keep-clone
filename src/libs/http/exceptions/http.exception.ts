/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusEnum } from "../enums";

export class HttpException extends Error {
    readonly code: number;
    readonly details: unknown;
    readonly statusCode: HttpStatusEnum;
    readonly statusName: string;

    constructor(statusCode: HttpStatusEnum, code?: number, message?: string, details?: unknown) {
        super(message);

        this.name = "HttpException";
        this.code = code ?? Number.NaN;
        this.details = details;
        this.statusCode = statusCode;
        this.statusName = HttpStatusEnum.getProperty(statusCode, "name")!;

        Error.call(this);
        Error.captureStackTrace(this, this.constructor);
    }

    static fromError(input: Error) {
        const isHttpException = input instanceof HttpException;

        const statusCode = isHttpException
            ? input.statusCode
            : (input as any).code || HttpStatusEnum.INTERNAL_SERVER_ERROR;

        return new HttpException(statusCode, undefined, input.message);
    }
}
