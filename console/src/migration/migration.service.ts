import { Injectable } from "@keep/common";
import { Runner } from "src/interfaces";

@Injectable()
export class MigrationService implements Runner {
    public execute() {
        return Promise.resolve();
    }
}
