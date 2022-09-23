import { of } from "rxjs";

export class UserRestDatastore {
    public signin(email: string, password: string) {
        const values = Array.from(email.concat(password));
        return of(values.map(() => Math.random().toString().substring(2)).join(""));
    }
}
