export interface ILoggerService {
    trace(message: string, ...params: unknown[]): void;
    debug(message: string, ...params: unknown[]): void;
    info(message: string, ...params: unknown[]): void;
    warn(message: string, ...params: unknown[]): void;
    error(message: string | Error, ...params: unknown[]): void;
    critical(message: string | Error, ...params: unknown[]): void;
}
