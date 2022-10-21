import { ContainerDecorator, IUseCase } from "@keep/core";
import { CredentialsVo } from "src/user/domain/value-objects";

export const ISignInUseCase = ContainerDecorator<ISignInUseCase>("ISignInUseCase");

export type ISignInUseCase = IUseCase<CredentialsVo, string>;
