/* eslint-disable @typescript-eslint/no-explicit-any */
import { container as Container, isClassProvider, isFactoryProvider } from "tsyringe";
import { ScopeEnum } from "./enums";
import { DynamicModule, InjectionToken, ModuleMetadataKey, Provider, Type } from "./interfaces";
import { isDynamicModule, isTypeProvider } from "./utils";

export class ApplicationContext {
    constructor(protected readonly container = Container) {}

    public resolve<T>(token: InjectionToken<T>) {
        return this.container.resolve<T>(token);
    }

    public register<T>(provider: Provider<T>) {
        const token: InjectionToken = (provider as any).provide || provider;
        const value: Type<T> = this.getProviderValue(provider) as any;
        const scope = (provider as any)?.scope || ScopeEnum.SINGLETON;

        this.container.register(token, value, { lifecycle: scope });
    }

    public registerModule(metatype: Type | DynamicModule) {
        const providers = this.getProviders(metatype);
        providers.forEach(provider => this.register(provider));
    }

    protected getProviders(metatype: Type | DynamicModule): Provider[] {
        return this.getDeepMetadata<Provider>(metatype, "providers");
    }

    protected getProviderValue<T = any>(provider: Provider<T>) {
        if (isTypeProvider(provider)) {
            return provider;
        }
        if (isClassProvider(provider)) {
            return provider.useClass;
        }
        if (isFactoryProvider(provider)) {
            return provider.useFactory;
        }
        return provider.useValue;
    }

    protected getDeepMetadata<T>(
        metatype: Type | DynamicModule,
        metadataKey: ModuleMetadataKey
    ): T[] {
        const imports = this.getMetadata<Type | DynamicModule>(metatype, "imports");
        const metadata = this.getMetadata<T>(metatype, metadataKey);

        const staticMetadata = imports
            .filter((meta: any) => !isDynamicModule(meta))
            .flatMap((meta: any) => this.getDeepMetadata(meta, metadataKey));

        const dynamicMetadata = imports
            .filter((meta: any) => isDynamicModule(meta))
            .flatMap((meta: any) => meta[metadataKey] || []);

        return [...new Set([...metadata, ...staticMetadata, ...dynamicMetadata])];
    }

    protected getMetadata<T>(metatype: Type | DynamicModule, metadataKey: ModuleMetadataKey) {
        const metadata = isDynamicModule(metatype)
            ? metatype[metadataKey]
            : Reflect.getMetadata(metadataKey, metatype);
        return (metadata || []) as T[];
    }
}
