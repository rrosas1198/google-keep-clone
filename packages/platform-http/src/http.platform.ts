/* eslint-disable @typescript-eslint/no-explicit-any */
import { Platform } from "@keep/common";
import { App, CompatibilityEvent, createApp, H3Error, MIMES } from "h3";
import { listen } from "listhen";
import { HttpException } from "./http.exception";
import { HttpOptions } from "./interfaces";
import { isException, parseStack } from "./utils";

export class HttpPlatform implements Platform<HttpOptions> {
    private readonly server!: App;
    private readonly rootDir = process.cwd();

    constructor() {
        this.server = createApp({ onError: this.handleError.bind(this) as any });
    }

    public async bootstrap(options?: Partial<HttpOptions>) {
        await listen(this.server, options);
    }

    private handleError(error: H3Error, event: CompatibilityEvent) {
        if (event.res.writableEnded) {
            return;
        }

        const exception = this.createException(error);

        const responseBody = {
            statusCode: exception.statusCode,
            message: exception.message,
            stack: parseStack(this.rootDir, exception.stack || ""),
            data: error.data
        };

        if (event.res.writableEnded) {
            return;
        }

        event.res.statusCode = exception.statusCode;
        event.res.statusMessage = exception.message;
        event.res.setHeader("Content-Type", MIMES.json);
        event.res.end(JSON.stringify(responseBody, null, 2));
    }

    private createException(error: H3Error) {
        const message = error.message ?? error.statusMessage;
        return isException(error) ? error : HttpException.fromStatus(error.statusCode, message);
    }
}
