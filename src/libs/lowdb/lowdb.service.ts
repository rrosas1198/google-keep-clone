import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

export class LowDbService<T = unknown> extends Low<T> {
    constructor(filename: string) {
        super(new JSONFile(filename));
    }
}
