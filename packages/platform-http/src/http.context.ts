/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApplicationContext, DynamicModule, Type } from "@keep/common";
import { joinURL, withLeadingSlash } from "ufo";
import { METHOD_TOKEN, PATH_TOKEN, VERSION_TOKEN } from "./constants";
import { HttpMethodEnum } from "./enums";
import { HttpRouteHandler } from "./http.route-handler";
import { ControllerMetadata, ControllerMethodMetadata, MethodMetadata } from "./interfaces";
import { getRouteMetadata } from "./utils";

export class HttpContext extends ApplicationContext {
    private _routes = new Set<ControllerMethodMetadata>();
    private httpRouteHandler = new HttpRouteHandler();

    public get routes() {
        return this._routes;
    }

    public override registerModule(metatype: Type | DynamicModule) {
        super.registerModule(metatype);

        const controllers = this.getControllers(metatype);
        controllers.forEach(controller => this.registerController(controller));
    }

    protected registerController(metatype: Type) {
        const metadata = this.getControllerMetadata(metatype);
        const routes = this.getControllerRoutes(metatype, metadata);

        routes.forEach(route => this._routes.add(route));
    }

    protected getControllers(metatype: Type | DynamicModule): Type[] {
        return this.getDeepMetadata<Type>(metatype, "controllers");
    }

    protected getControllerRoutes(metatype: Type, baseMetadata: ControllerMetadata) {
        const methods = Object.getOwnPropertyNames(metatype.prototype);
        const metadata = methods.map(method => this.getMethodMetadata(metatype, method));
        return this.mapControllerRoute(baseMetadata, metadata);
    }

    protected mapControllerRoute(
        baseMetadata: ControllerMetadata,
        methodMetadata: MethodMetadata[]
    ) {
        const methods = methodMetadata.filter(meta => !!meta.path);
        return methods.map(meta => this.mapControllerMethod(baseMetadata, meta));
    }

    protected mapControllerMethod(baseMetadata: ControllerMetadata, meta: MethodMetadata) {
        const version = meta.version || baseMetadata.version;
        const joinedPath = joinURL("api", version, baseMetadata.path, meta.path);

        const handler = baseMetadata.instance[meta.methodName].bind(baseMetadata.instance);
        const parameters = getRouteMetadata(baseMetadata.metatype.prototype, meta.methodName);
        const routeHandler = this.httpRouteHandler.getHandler(handler, parameters);

        return <ControllerMethodMetadata>{
            path: withLeadingSlash(joinedPath),
            method: meta.method,
            handler: routeHandler
        };
    }

    protected getControllerMetadata(metatype: Type) {
        const path = Reflect.getMetadata(PATH_TOKEN, metatype) as string;
        const version = Reflect.getMetadata(VERSION_TOKEN, metatype) as string;
        const instance = this.container.resolve(metatype);

        return <ControllerMetadata>{ metatype, instance, path, version };
    }

    protected getMethodMetadata(metatype: Type, methodName: string) {
        const path = Reflect.getMetadata(PATH_TOKEN, metatype, methodName) as string;
        const method = Reflect.getMetadata(METHOD_TOKEN, metatype, methodName) as HttpMethodEnum;
        const version = Reflect.getMetadata(VERSION_TOKEN, metatype, methodName) as string;

        return <MethodMetadata>{ path, version, method, methodName };
    }
}
