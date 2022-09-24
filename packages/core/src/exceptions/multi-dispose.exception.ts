export class MultiDisposeException extends Error {
    constructor(public readonly errors: unknown[]) {
        super(`Disposable: Encountered errors while disposing. Errors: [${errors.join(", ")}]`);
    }
}