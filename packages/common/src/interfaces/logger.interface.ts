/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ILogger {
    trace(message: string, ...params: any[]): void;
    debug(message: string, ...params: any[]): void;
    info(message: string, ...params: any[]): void;
    warn(message: string, ...params: any[]): void;
    error(message: string | Error, ...params: any[]): void;
    critical(message: string | Error, ...params: any[]): void;
}
