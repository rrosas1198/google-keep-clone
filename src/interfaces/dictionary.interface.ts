/* eslint-disable @typescript-eslint/no-explicit-any */
export type IGenericRecord = IDictionary<any>;

export interface IDictionary<T> {
    [key: string]: T;
}
