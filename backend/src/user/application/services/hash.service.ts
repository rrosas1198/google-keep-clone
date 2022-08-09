import { Injectable } from "@keep/common";
import { compareSync } from "bcryptjs";

@Injectable()
export class HashService {
    public compare(value: string, hash: string) {
        return compareSync(value, hash);
    }
}
