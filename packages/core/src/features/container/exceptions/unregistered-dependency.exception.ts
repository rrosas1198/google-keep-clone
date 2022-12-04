import type { IContainerToken } from "../interfaces";

export class UnregisteredDependencyException extends ReferenceError {
    constructor(public readonly token: IContainerToken) {
        super(`ContainerService: Dependency with token ${token.toString()} is not registered.`);
    }
}
