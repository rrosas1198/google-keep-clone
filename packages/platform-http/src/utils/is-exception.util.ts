import { HttpException } from "src/http.exception";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function isException(input: any): input is HttpException {
    return input instanceof HttpException;
}
