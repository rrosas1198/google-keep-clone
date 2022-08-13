import { RouteParamtypesEnum } from "src/enums";

export type IRouteMetadata = [RouteParamtypesEnum, { index: number; data: unknown }];
