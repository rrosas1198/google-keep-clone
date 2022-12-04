/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IConstructor, IDynamicModule } from "@keep/core";
import { ApplicationContext, Reflector } from "@keep/core";
import { joinURL, withLeadingSlash } from "ufo";
import { METHOD_TOKEN, PATH_TOKEN, VERSION_TOKEN } from "./constants";
import type { HttpMethodEnum } from "./enums";
import { HttpRouteHandler } from "./http.route-handler";
import type { IControllerMetadata, IControllerMethodMetadata, IMethodMetadata } from "./interfaces";
import { getRouteMetadata } from "./utils";

export class HttpContext extends ApplicationContext {
    private _routes = new Set<IControllerMethodMetadata>();
    private _httpRouteHandler = new HttpRouteHandler();

    public get routes() {
        return this._routes;
    }

    public override registerModule(metatype: IConstructor | IDynamicModule) {
        super.registerModule(metatype);

        const controllers = this.getControllers(metatype);
        controllers.forEach(controller => this.registerController(controller));
    }

    protected registerController(metatype: IConstructor) {
        const metadata = this.getControllerMetadata(metatype);
        const routes = this.getControllerRoutes(metatype, metadata);

        routes.forEach(route => this._routes.add(route));
    }

    protected getControllers(metatype: IConstructor | IDynamicModule): IConstructor[] {
        return this._getDeepMetadata<IConstructor>(metatype, "controllers");
    }

    protected getControllerRoutes(metatype: IConstructor, baseMetadata: IControllerMetadata) {
        const methods = Object.getOwnPropertyNames(metatype.prototype);
        const metadata = methods
            .filter(method => method !== "constructor")
            .map(method => this.getMethodMetadata(metatype, method));
        return this.mapControllerRoute(baseMetadata, metadata);
    }

    protected mapControllerRoute(
        baseMetadata: IControllerMetadata,
        methodMetadata: IMethodMetadata[]
    ) {
        const methods = methodMetadata.filter(meta => !!meta.path);
        return methods.map(meta => this.mapControllerMethod(baseMetadata, meta));
    }

    protected mapControllerMethod(baseMetadata: IControllerMetadata, meta: IMethodMetadata) {
        const version = meta.version || baseMetadata.version;
        const joinedPath = joinURL("api", version, baseMetadata.path, meta.path);

        const handler = baseMetadata.instance[meta.methodName].bind(baseMetadata.instance);
        const parameters = getRouteMetadata(baseMetadata.metatype.prototype, meta.methodName);
        const routeHandler = this._httpRouteHandler.getHandler(handler, parameters);

        return <IControllerMethodMetadata>{
            path: withLeadingSlash(joinedPath),
            method: meta.method,
            handler: routeHandler
        };
    }

    protected getControllerMetadata(metatype: IConstructor) {
        const path = Reflector.getMetadata(metatype, PATH_TOKEN) as string;
        const version = Reflector.getMetadata(metatype, VERSION_TOKEN) as string;
        const instance = this.container.create(metatype);

        return <IControllerMetadata>{ metatype, instance, path, version };
    }

    protected getMethodMetadata(metatype: IConstructor, methodName: string) {
        const path = Reflector.getMetadata(metatype, PATH_TOKEN, methodName) as string;
        const method = Reflector.getMetadata(metatype, METHOD_TOKEN, methodName) as HttpMethodEnum;
        const version = Reflector.getMetadata(metatype, VERSION_TOKEN, methodName) as string;

        return <IMethodMetadata>{ path, version, method, methodName };
    }
}
