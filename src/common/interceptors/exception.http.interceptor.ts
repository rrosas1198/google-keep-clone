import type { IHttpInterceptor } from "src/libs/http";
import { HttpException, HttpStatusEnum } from "src/libs/http";

const AllowedHttpStatuses = [HttpStatusEnum.OK, HttpStatusEnum.CREATED, HttpStatusEnum.NO_CONTENT];

export const ExceptionHttpInterceptor: IHttpInterceptor = {
    onRequest: context => {
        // If error doesn't exist in request, ignore error handler
        if (!context.error) return;
    },
    onResponse: async context => {
        if (context.error) {
            return;
        }

        // If status is allowed ignore error handler
        if (AllowedHttpStatuses.includes(context.response.status)) {
            return;
        }

        // Create http exception with response details
        context.error = new HttpException(
            context.response.status,
            context.response._data?.code,
            context.response._data?.message,
            context.response._data?.details
        );
    }
};
