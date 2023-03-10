import { ScopeEnum } from "./enums";
import type { IContainer, IContainerFactory, IInjectionToken } from "./interfaces";
import type { IBinding } from "./interfaces/binding.interface";

export class Container implements IContainer {
    static #_instance: IContainer;

    readonly #_bindings = new Map<IInjectionToken, IBinding>();
    readonly #_instances = new Map<IInjectionToken, unknown>();

    static asGlobalInstance() {
        if (!Container.#_instance) {
            Container.#_instance = new Container();
        }
        return Container.#_instance;
    }

    static asNewInstance() {
        return new Container();
    }

    private constructor() {
        //
    }

    resolve<T>(token: IInjectionToken<T>): T {
        if (!this.#_bindings.has(token)) {
            const name = typeof token === "function" ? token.name : String(token);
            throw new Error(`Container: Dependency with token ${name} is not registered`);
        }

        const binding = this.#_bindings.get(token)!;

        if (binding.scope === ScopeEnum.TRANSIENT) {
            return binding.factory() as T;
        }

        if (!this.#_instances.has(token)) {
            this.#_instances.set(token, binding.factory());
        }

        return this.#_instances.get(token) as T;
    }

    registerFactory<T>(token: IInjectionToken<T>, factory: IContainerFactory<T>): IContainer {
        this.#_bindings.set(token, { token, factory, scope: ScopeEnum.TRANSIENT });
        return this;
    }

    registerLazySingleton<T>(token: IInjectionToken<T>, factory: IContainerFactory<T>): IContainer {
        this.#_bindings.set(token, { token, factory, scope: ScopeEnum.SINGLETON });
        return this;
    }
}
