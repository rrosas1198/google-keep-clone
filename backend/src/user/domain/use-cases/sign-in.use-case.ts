import type { IUseCase } from "@keep/core";
import { ContainerDecorator } from "@keep/core";
import type { CredentialsVo } from "src/user/domain/value-objects";

export const ISignInUseCase = ContainerDecorator<ISignInUseCase>("ISignInUseCase");

export type ISignInUseCase = IUseCase<CredentialsVo, string>;
