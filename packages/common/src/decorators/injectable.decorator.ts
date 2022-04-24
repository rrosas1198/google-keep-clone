/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScopeEnum } from "src/enums";
import { Type } from "src/interfaces";
import { container, injectable as _injectable } from "tsyringe";

export function Injectable<T>(lifecycle: ScopeEnum = ScopeEnum.SINGLETON) {
    return function (target: Type<T>) {
        _injectable<T>()(target);
        container.register(target, target, { lifecycle } as any);
    };
}
