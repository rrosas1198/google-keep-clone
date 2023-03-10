import type { IHttpInterceptor } from "src/libs/http";
import { ConsoleLogger } from "../miscellaneous";

const consoleLogger = new ConsoleLogger("HttpService");

export const LoggerHttpInterceptor: IHttpInterceptor = {
    onRequest: context => {
        if (context.error) {
            consoleLogger.error("Request", context.request, context);
            return;
        }

        consoleLogger.info("Request", context.options.method, context.request, context);
    },
    onResponse: context => {
        if (context.error) {
            consoleLogger.error("Response", context.options.method, context.request, context);
            return;
        }

        consoleLogger.info("Response", context.options.method, context.request, context);
    }
};
