/* eslint-disable @typescript-eslint/no-explicit-any */
import { IConstructor } from "src/interfaces";
import { Reflector } from "src/polyfills";
import { IContainerDecorator } from "../interfaces";

const registry = new Map<string, IContainerDecorator>();

const INJECTABLE_TOKEN = "__injectable__";
const DEPENDENCIES_TOKEN = "__dependencies__";

export function getDependencies(ctor: IConstructor) {
    const dependencies = Reflector.getMetadata(ctor, DEPENDENCIES_TOKEN) || [];
    return dependencies as { param: IContainerDecorator; index: number }[];
}

export function ContainerDecorator<T>(token: string): IContainerDecorator<T> {
    if (registry.has(token)) {
        return registry.get(token) as IContainerDecorator<T>;
    }

    const identifier = (target: Function, _key: string | symbol, index: number) => {
        const oldDependencies = (target as any)[DEPENDENCIES_TOKEN] || [];
        const newDependencies = [...oldDependencies, { param: identifier, index }];

        Reflector.setMetadata(target, INJECTABLE_TOKEN, target);
        Reflector.setMetadata(target, DEPENDENCIES_TOKEN, newDependencies);
    };

    identifier.toString = () => token;

    registry.set(token, identifier as IContainerDecorator);

    return identifier as IContainerDecorator<T>;
}
