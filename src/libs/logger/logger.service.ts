import type { Consola, LogLevel as ConsolaLogLevel } from "consola";
import consola from "consola";
import { LogLevelEnum } from "./enums";

export class LoggerService {
    #_consola: Consola;
    #_logLevel: LogLevelEnum = LogLevelEnum.VERBOSE;

    constructor(scope?: string, level: LogLevelEnum = LogLevelEnum.VERBOSE) {
        this.#_consola = scope ? consola.withScope(scope) : consola;
        this.setLevel(level);
    }

    get logLevel() {
        return this.#_logLevel;
    }

    setLevel(level: LogLevelEnum) {
        if (this.#_logLevel === level) return;
        this.#_logLevel = level;
        this.#_setConsolaLevel(this.#_logLevel);
    }

    trace(message: string, ...params: unknown[]): void {
        if (this.#_logLevel >= LogLevelEnum.TRACE) return;
        this.#_consola.trace(message, ...params);
    }

    debug(message: string, ...params: unknown[]): void {
        console.log(this.#_logLevel, LogLevelEnum.DEBUG);
        if (this.#_logLevel >= LogLevelEnum.DEBUG) return;
        this.#_consola.debug(message, ...params);
    }

    info(message: string, ...params: unknown[]): void {
        if (this.#_logLevel >= LogLevelEnum.INFO) return;
        this.#_consola.info(message, ...params);
    }

    warn(message: string, ...params: unknown[]): void {
        if (this.#_logLevel >= LogLevelEnum.WARN) return;
        this.#_consola.warn(message, ...params);
    }

    error(message: string | Error, ...params: unknown[]): void {
        if (this.#_logLevel >= LogLevelEnum.ERROR) return;
        this.#_consola.error(message, ...params);
    }

    fatal(message: string | Error, ...params: unknown[]): void {
        if (this.#_logLevel >= LogLevelEnum.FATAL) return;
        this.#_consola.fatal(message, ...params);
    }

    #_setConsolaLevel(level: LogLevelEnum) {
        this.#_consola.level = level as unknown as ConsolaLogLevel;
    }
}
