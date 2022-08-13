/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPlatform } from "@keep/common";
import {
    App,
    CompatibilityEvent,
    CompatibilityEventHandler,
    createApp,
    createRouter,
    H3Error,
    MIMES,
    Router
} from "h3";
import { listen } from "listhen";
import { HttpMethodEnum, HttpStatusEnum } from "./enums";
import { HttpException } from "./http.exception";
import { IHttpOptions } from "./interfaces";
import { isException, parseStack } from "./utils";

export class HttpPlatform implements IPlatform<IHttpOptions> {
    private readonly server!: App;
    private readonly router!: Router;
    private readonly rootDir = process.cwd();

    constructor() {
        this.server = createApp({ onError: this.handleError.bind(this) as any });
        this.router = createRouter();
    }

    public async bootstrap(options?: Partial<IHttpOptions>) {
        this.server.use(this.router);
        await listen(this.server, options);
    }

    public addRoute(
        path: string,
        handler: CompatibilityEventHandler,
        methods: HttpMethodEnum[] = []
    ) {
        const _methods = methods.map(method => method.toLocaleLowerCase() as any);
        this.router.add(path, handler, _methods);
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
        const message = error.message || error.statusMessage;
        const statusCode = error.statusCode || HttpStatusEnum.INTERNAL_SERVER_ERROR;
        return isException(error) ? error : HttpException.fromStatus(statusCode, message);
    }
}
