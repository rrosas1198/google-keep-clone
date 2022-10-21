import { IConstructor } from "src/interfaces";
import { ContainerDecorator } from "../utils";
import { IContainerProvider } from "./container-provider.interface";
import { IContainerToken } from "./container-token.interface";

export const IContainerService = ContainerDecorator<IContainerService>("IContainerService");

export interface IContainerService {
    has(token: IContainerToken): boolean;
    add<T>(provider: IContainerProvider<T>): void;
    bulkAdd(providers: IContainerProvider[]): void;
    create<T extends IConstructor, V extends InstanceType<T>>(
        ctor: T,
        ...params: unknown[] | ConstructorParameters<T>
    ): V;
    resolve<T>(token: IContainerToken<T>): T;
}
