/* eslint-disable @typescript-eslint/no-explicit-any */
import { container as Container, isClassProvider, isFactoryProvider } from "tsyringe";
import { ScopeEnum } from "./enums";
import {
    IConstructor,
    IContainerToken,
    IDynamicModule,
    IModuleMetadata,
    Provider
} from "./interfaces";
import { isConstructor, isDynamicModule } from "./utils";

export class ApplicationContext {
    constructor(protected readonly container = Container) {}

    public resolve<T>(token: IContainerToken<T>) {
        return this.container.resolve<T>(token);
    }

    public register<T>(provider: Provider<T>) {
        const token: IContainerToken = (provider as any).provide || provider;
        const value: IConstructor<T> = this.getProviderValue(provider) as any;
        const scope = this.getProviderScope<T>(provider);

        this.container.register(token, value, { lifecycle: scope });
    }

    public registerModule(metatype: IConstructor | IDynamicModule) {
        const providers = this.getProviders(metatype);
        providers.forEach(provider => this.register(provider));
    }

    protected getProviders(metatype: IConstructor | IDynamicModule): Provider[] {
        return this.getDeepMetadata<Provider>(metatype, "providers");
    }

    protected getProviderValue<T = any>(provider: Provider<T>) {
        if (isConstructor(provider)) {
            return provider;
        }
        if (isClassProvider(provider)) {
            return { useClass: provider.useClass };
        }
        if (isFactoryProvider(provider)) {
            return { useFactory: provider.useFactory };
        }
        return { useValue: provider.useValue };
    }

    protected getProviderScope<T = any>(provider: Provider<T>) {
        const hasScope = isConstructor(provider) || isClassProvider(provider);
        return hasScope ? (provider as any)?.scope || ScopeEnum.SINGLETON : null;
    }

    protected getDeepMetadata<T>(
        metatype: IConstructor | IDynamicModule,
        metadataKey: keyof IModuleMetadata
    ): T[] {
        const imports = this.getMetadata<IConstructor | IDynamicModule>(metatype, "imports");
        const metadata = this.getMetadata<T>(metatype, metadataKey);

        const staticMetadata = imports
            .filter((meta: any) => !isDynamicModule(meta))
            .flatMap((meta: any) => this.getDeepMetadata(meta, metadataKey));

        const dynamicMetadata = imports
            .filter((meta: any) => isDynamicModule(meta))
            .flatMap((meta: any) => meta[metadataKey] || []);

        return [...new Set([...metadata, ...staticMetadata, ...dynamicMetadata])];
    }

    protected getMetadata<T>(
        metatype: IConstructor | IDynamicModule,
        metadataKey: keyof IModuleMetadata
    ) {
        const metadata = isDynamicModule(metatype)
            ? metatype[metadataKey]
            : Reflect.getMetadata(metadataKey, metatype);
        return (metadata || []) as T[];
    }
}
