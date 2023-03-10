import { Container } from "../container";
import type { IInjectionToken, IModule, IModuleDefinition } from "../interfaces";

export const defineModule = (definition: IModuleDefinition) => {
    const container = Container.asNewInstance();

    return <IModule>{
        resolve: <T>(token: IInjectionToken<T>): T => container.resolve<T>(token),
        registerDependencies: () => definition(container)
    };
};
