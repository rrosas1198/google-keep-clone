import {
    BaseHttpInterceptor,
    ExceptionHttpInterceptor,
    LoggerHttpInterceptor
} from "src/common/interceptors";
import { Container } from "src/libs/container";
import { HttpService } from "src/libs/http";

export default defineNuxtPlugin(() => {
    const globalContainer = Container.asGlobalInstance();
    const httpService = globalContainer.resolve(HttpService);

    httpService.addInterceptor(BaseHttpInterceptor);
    httpService.addInterceptor(ExceptionHttpInterceptor);
    httpService.addInterceptor(LoggerHttpInterceptor);
});
