import { IConstructor } from "src/interfaces";

export type IContainerDecorator = (target: Object, key: string | symbol, index: number) => void;
export type IContainerToken<T = unknown> = IContainerDecorator | IConstructor<T>;
