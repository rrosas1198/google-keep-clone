import { ContainerDecorator, IUseCase } from "@keep/core";
import { CredentialsVo } from "src/user/domain/value-objects";

export const ISigninUseCase = ContainerDecorator("ISigninUseCase");

export type ISigninUseCase = IUseCase<CredentialsVo, string>;
