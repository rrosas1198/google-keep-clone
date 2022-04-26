/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScopeEnum } from "src/enums";
import { Type } from "src/interfaces";
import { container, injectable as _injectable } from "tsyringe";

export function Injectable(lifecycle: ScopeEnum = ScopeEnum.SINGLETON) {
    return function (target: Type) {
        _injectable()(target);
        container.register(target, target, { lifecycle } as any);
    };
}
