/* eslint-disable @typescript-eslint/no-explicit-any */
import { container as Container, isClassProvider, isFactoryProvider } from "tsyringe";
import { MODULE_METADATA } from "./constants/module.constants";
import { ScopeEnum } from "./enums";
import { DynamicModule, InjectionToken, Provider, Type } from "./interfaces";
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

    public registerModule(metatype: Type) {
        const providers = this.getProviders(metatype);
        providers.forEach(provider => this.register(provider));
    }

    protected getProviders(metatype: Type): Provider[] {
        const imports = this.getMetadata<Type | DynamicModule>(metatype, MODULE_METADATA.IMPORTS);
        const providers = this.getMetadata<Provider>(metatype, MODULE_METADATA.PROVIDERS);

        const staticProviders = imports
            .filter(module => !isDynamicModule(module))
            .flatMap((module: any) => this.getProviders(module));

        const dynamicProviders = imports
            .filter(module => isDynamicModule(module))
            .flatMap((module: any) => module.providers || []);

        return [...new Set([...providers, ...staticProviders, ...dynamicProviders])];
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

    protected getMetadata<T>(metatype: Type, metadataKey: string) {
        const metadata = Reflect.getMetadata<T[]>(metadataKey, metatype);
        return (metadata || []) as T[];
    }
}
