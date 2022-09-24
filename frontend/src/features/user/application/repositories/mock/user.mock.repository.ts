import { IUserRepository } from "src/features/user/domain/repositories";

export class UserMockRepositoryImpl implements IUserRepository {
    public signIn(email: string, password: string): Promise<string> {
        const values = Array.from(email.concat(password));
        return Promise.resolve(values.map(() => Math.random().toString().substring(2)).join(""));
    }
}
