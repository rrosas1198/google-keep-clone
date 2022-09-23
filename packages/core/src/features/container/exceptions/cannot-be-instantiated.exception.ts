import { IConstructor } from "src/interfaces";

export class CannotBeInstantiatedException extends Error {
    constructor(public readonly ctor: IConstructor, readonly options?: Record<string, unknown>) {
        const cause = options?.cause instanceof Error ? options.cause.message : options?.cause;
        const message = `ContainerService: Cannot be instantiated ${ctor.name}.`;
        super(!!cause ? message.concat(` Cause: ${cause}`) : message);
    }
}
