import { RouteParamtypesEnum } from "src/enums";

export type RouteMetadata = [RouteParamtypesEnum, { index: number; data: unknown }];
