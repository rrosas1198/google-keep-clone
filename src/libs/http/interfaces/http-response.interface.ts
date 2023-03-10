/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FetchResponse } from "ofetch";
import type { IGenericRecord } from "src/interfaces";

export interface IHttResponse extends Omit<FetchResponse<"json">, "_data"> {
    _data: IGenericRecord;
}
