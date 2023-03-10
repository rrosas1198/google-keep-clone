import type { FetchOptions } from "ofetch";
import type { HttpMethodEnum } from "../enums";

export interface IHttpOptions extends Omit<FetchOptions<"json">, "method"> {
    method?: HttpMethodEnum;
    timeout?: number;
}
