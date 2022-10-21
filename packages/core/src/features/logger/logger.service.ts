import { LogLevelEnum } from "src/enums";
import type { ILoggerService } from "./logger.interface";

export class LoggerService implements ILoggerService {
    private _level: LogLevelEnum;

    constructor(level: LogLevelEnum = LogLevelEnum.INFO) {
        this._level = level;
    }

    public get level() {
        return this._level;
    }

    public setLevel(level: LogLevelEnum) {
        if (this._level === level) return;
        this._level = level;
    }

    public trace(message: string, ...params: unknown[]): void {
        if (this._level <= LogLevelEnum.TRACE) return;
        console.log(message, ...params);
    }

    public debug(message: string, ...params: unknown[]): void {
        if (this._level <= LogLevelEnum.DEBUG) return;
        console.log(message, ...params);
    }

    public info(message: string, ...params: unknown[]): void {
        if (this._level <= LogLevelEnum.INFO) return;
        console.log(message, ...params);
    }

    public warn(message: string, ...params: unknown[]): void {
        if (this._level <= LogLevelEnum.WARNING) return;
        console.warn(message, ...params);
    }

    public error(message: string | Error, ...params: unknown[]): void {
        if (this._level <= LogLevelEnum.ERROR) return;
        console.error(message, ...params);
    }

    public critical(message: string | Error, ...params: unknown[]): void {
        if (this._level <= LogLevelEnum.CRITICAL) return;
        console.error(message, ...params);
    }
}
