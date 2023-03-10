import { Low } from "lowdb/lib";
import { JSONFile } from "lowdb/lib/node";

export class LowDbService<T = unknown> extends Low<T> {
    constructor(filename: string) {
        super(new JSONFile(filename));
    }
}
