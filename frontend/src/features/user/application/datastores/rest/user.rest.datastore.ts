export class UserRestDatastore {
    public signIn(email: string, password: string) {
        const values = Array.from(email.concat(password));
        return Promise.resolve(values.map(() => Math.random().toString().substring(2)).join(""));
    }
}
