import { Injectable } from "@keep/common";
import { of } from "rxjs";

@Injectable()
export class UserRestDatastore {
    public signin(email: string, password: string) {
        const values = Array.from(email.concat(password));
        return of(values.map(() => Math.random().toString().substring(2)).join(""));
    }
}
