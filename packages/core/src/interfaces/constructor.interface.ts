/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IConstructor<T = any> extends Function {
    new (...params: any[]): T;
}