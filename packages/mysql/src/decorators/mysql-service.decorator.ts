import { Inject } from "@keep/common";

export const IMysqlServiceToken = Symbol.for("IMysqlServiceToken");
export const IMysqlService = Inject(IMysqlServiceToken);
