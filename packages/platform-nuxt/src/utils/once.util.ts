/* eslint-disable @typescript-eslint/no-explicit-any */
export function once<T extends (...params: Parameters<any>[]) => unknown>(callback: T) {
    let isCalled = false;
    let result: unknown;

    return (...params: Parameters<T>) => {
        if (isCalled) {
            return result;
        }

        isCalled = true;
        result = callback(...params);

        return result;
    };
}
