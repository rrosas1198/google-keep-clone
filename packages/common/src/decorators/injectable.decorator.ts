/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScopeEnum } from "src/enums";
import { scoped as Scoped } from "tsyringe";

export function Injectable<T>(scope: ScopeEnum = ScopeEnum.SINGLETON) {
    return Scoped<T>(scope as any);
}
