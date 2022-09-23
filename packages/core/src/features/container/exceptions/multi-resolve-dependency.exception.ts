import { IConstructor } from "src/interfaces";

export class MultiResolveDependencyException extends ReferenceError {
    constructor(public readonly ctor: IConstructor, public readonly errors: unknown[]) {
        super(
            `ContainerService: Encountered errors while resolving ${
                ctor.name
            }. Errors: [${errors.join(", ")}]`
        );
    }
}
