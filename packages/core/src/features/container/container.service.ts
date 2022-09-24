import { ScopeEnum } from "src/enums";
import { IConstructor } from "src/interfaces";
import { isClassFunction, isConstructor } from "src/utils";
import {
    CannotBeInstantiatedException,
    MultiResolveDependencyException,
    UnregisteredDependencyException
} from "./exceptions";
import { IContainerProvider, IContainerService, IContainerToken } from "./interfaces";
import { getDependencies, isClassProvider, isFactoryProvider } from "./utils";

interface IContainerBinding {
    factory: unknown;
    instance?: unknown;
    scope?: ScopeEnum;
}

class ContainerServiceStatic implements IContainerService {
    private readonly _bindings = new Map<IContainerToken, IContainerBinding>();

    public has(token: IContainerToken) {
        return this._bindings.has(token);
    }

    public add<T>(provider: IContainerProvider<T>): void {
        const token = isConstructor(provider) ? provider : provider.provide;
        const binding = this._doBinding<T>(provider);

        if (!this._bindings.has(token)) {
            this._bindings.set(token, binding);
        }
    }

    public bulkAdd(providers: IContainerProvider[]) {
        providers.forEach(provider => this.add(provider));
    }

    public create<T extends IConstructor, V extends InstanceType<T>>(
        ctor: T,
        ...params: unknown[] | ConstructorParameters<T>
    ): V {
        const dependencies = getDependencies(ctor).sort((prev, curr) => prev.index - curr.index);

        const boundParams = [] as unknown[];
        const unknownParams = [] as Error[];

        for (const dependency of dependencies) {
            try {
                const resolved = this.resolve(dependency.param);
                boundParams.push(resolved);
            } catch (error) {
                unknownParams.push(error as Error);
            }
        }

        if (unknownParams.length === 1) {
            throw new CannotBeInstantiatedException(ctor, { cause: unknownParams[1] });
        } else if (unknownParams.length > 1) {
            throw new MultiResolveDependencyException(ctor, unknownParams);
        }

        try {
            return this._doInstance(ctor, [...params, ...boundParams]);
        } catch (error) {
            throw new CannotBeInstantiatedException(ctor, { cause: error });
        }
    }

    public resolve<T = unknown>(token: IContainerToken): T {
        if (!this._bindings.has(token)) {
            throw new UnregisteredDependencyException(token);
        }

        const binding = this._bindings.get(token) as IContainerBinding;
        if (!!binding.instance) return binding.instance as T;

        const instance = isConstructor(binding.factory)
            ? this.create(binding.factory)
            : binding.factory;

        if (!isConstructor(binding.factory) || binding.scope === ScopeEnum.SINGLETON) {
            this._bindings.set(token, { ...binding, instance });
        }

        return instance as T;
    }

    private _doInstance<T extends Function>(factory: T, params: unknown[] = []) {
        if (isConstructor(factory) && !isClassFunction(factory)) {
            const container = this.resolve<IContainerService>(IContainerService);
            return Reflect.apply(factory, factory, [container]);
        }
        return Reflect.construct(factory, params);
    }

    private _doBinding<T>(provider: IContainerProvider<T>) {
        return <IContainerBinding>{
            factory: this._doFactory<T>(provider),
            scope: this._doScope(provider)
        };
    }

    private _doFactory<T>(provider: IContainerProvider<T>) {
        if (isConstructor(provider)) {
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

    private _doScope(provider: IContainerProvider) {
        const hasScope = isClassProvider(provider) || isFactoryProvider(provider);
        return hasScope ? provider.scope || ScopeEnum.SINGLETON : ScopeEnum.SINGLETON;
    }
}

export const ContainerService: IContainerService = new ContainerServiceStatic();

ContainerService.add({ provide: IContainerService, useValue: ContainerService });
