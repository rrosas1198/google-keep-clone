/* eslint-disable @typescript-eslint/no-explicit-any */
declare interface Dictionary<T> {
    [key: string]: T;
}

declare type GenericRecord = Dictionary<any>;
