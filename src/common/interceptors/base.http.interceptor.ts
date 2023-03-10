import type { IHttpInterceptor } from "src/libs/http";

export const BaseHttpInterceptor: IHttpInterceptor = {
    onRequest: context => {
        if (process.client) return;
        context.options.baseURL = _computeBaseUrl();
    }
};

function _computeBaseUrl() {
    const host = process.env.NUXT_HOST || process.env.NITRO_HOST || process.env.HOST || "localhost";
    const port = process.env.NUXT_PORT || process.env.NITRO_PORT || process.env.PORT || 3000;
    const protocol =
        process.env.NITRO_SSL_CERT && process.env.NITRO_SSL_KEY ? "https://" : "http://";
    return `${protocol}${host}:${port}`;
}
