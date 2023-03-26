import type { IHttpInterceptor } from "src/libs/http";
import { LoggerService } from "src/libs/logger";

const loggerService = new LoggerService("HttpService");

export const LoggerHttpInterceptor: IHttpInterceptor = {
    onRequest: context => {
        if (context.error) {
            loggerService.error("Request", context.request, context);
        } else {
            loggerService.info("Request", context.options.method, context.request, context);
        }
    },
    onResponse: context => {
        if (context.error) {
            loggerService.error("Response", context.options.method, context.request, context);
        } else {
            loggerService.info("Response", context.options.method, context.request, context);
        }
    }
};
