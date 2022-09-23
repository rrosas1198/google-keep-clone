/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    ContainerService,
    IContainerProvider,
    IContainerService,
    IContainerToken
} from "./features";
import { IConstructor, IDynamicModule, IModuleMetadata } from "./interfaces";
import { Reflector } from "./polyfills";
import { isDynamicModule } from "./utils";

export class ApplicationContext {
    protected readonly container: IContainerService = ContainerService;

    public resolve<T>(token: IContainerToken<T>) {
        return this.container.resolve<T>(token);
    }

    public registerModule(metatype: IConstructor | IDynamicModule) {
        const providers = this._getProviders(metatype);
        providers.forEach(provider => this.container.add(provider));
    }

    protected _getProviders(metatype: IConstructor | IDynamicModule): IContainerProvider[] {
        return this._getDeepMetadata<IContainerProvider>(metatype, "providers");
    }

    protected _getDeepMetadata<T>(
        metatype: IConstructor | IDynamicModule,
        metadataKey: keyof IModuleMetadata
    ): T[] {
        const imports = this._getMetadata<IConstructor | IDynamicModule>(metatype, "imports");
        const metadata = this._getMetadata<T>(metatype, metadataKey);

        const staticMetadata = imports
            .filter((meta: any) => !isDynamicModule(meta))
            .flatMap((meta: any) => this._getDeepMetadata(meta, metadataKey));

        const dynamicMetadata = imports
            .filter((meta: any) => isDynamicModule(meta))
            .flatMap((meta: any) => meta[metadataKey] || []);

        return [...new Set([...metadata, ...staticMetadata, ...dynamicMetadata])];
    }

    protected _getMetadata<T>(
        metatype: IConstructor | IDynamicModule,
        metadataKey: keyof IModuleMetadata
    ) {
        const metadata = isDynamicModule(metatype)
            ? metatype[metadataKey]
            : Reflector.getMetadata(metatype, metadataKey);
        return (metadata || []) as T[];
    }
}
