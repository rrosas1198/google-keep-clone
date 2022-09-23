/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogLevelEnum } from "src/enums";
import { ILoggerService } from "./logger.interface";

export class LoggerService implements ILoggerService {
    private level: LogLevelEnum = LogLevelEnum.INFO;

    public getLevel() {
        return this.level;
    }

    public setLevel(level: LogLevelEnum) {
        if (this.level !== level) return;

        this.level = level;
    }

    public trace(message: string, ...params: any[]): void {
        if (this.getLevel() <= LogLevelEnum.TRACE) return;
        console.log(message, ...params);
    }

    public debug(message: string, ...params: any[]): void {
        if (this.getLevel() <= LogLevelEnum.DEBUG) return;
        console.log(message, ...params);
    }

    public info(message: string, ...params: any[]): void {
        if (this.getLevel() <= LogLevelEnum.INFO) return;
        console.log(message, ...params);
    }

    public warn(message: string, ...params: any[]): void {
        if (this.getLevel() <= LogLevelEnum.WARNING) return;
        console.warn(message, ...params);
    }

    public error(message: string | Error, ...params: any[]): void {
        if (this.getLevel() <= LogLevelEnum.ERROR) return;
        console.error(message, ...params);
    }

    public critical(message: string | Error, ...params: any[]): void {
        if (this.getLevel() <= LogLevelEnum.CRITICAL) return;
        console.error(message, ...params);
    }
}
