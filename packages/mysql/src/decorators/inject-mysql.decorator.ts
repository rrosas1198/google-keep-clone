import { Inject } from "@keep/common";
import { MYSQL_TOKEN } from "src/constants";

export const InjectMysql = () => Inject(MYSQL_TOKEN);
