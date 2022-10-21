/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IConstructor<T = any> {
    new (...params: any[]): T;
}
