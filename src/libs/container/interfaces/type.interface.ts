/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IType<T = any> extends Function {
    new (...params: any[]): T;
}
