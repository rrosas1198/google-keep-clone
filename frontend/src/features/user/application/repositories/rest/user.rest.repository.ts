import { ContainerService } from "@keep/core";
import type { IUserRepository } from "src/features/user/domain/repositories";
import { UserRestDatastore } from "../../datastores/rest";

export class UserRestRepositoryImpl implements IUserRepository {
    private readonly userRestDatastore = ContainerService.create(UserRestDatastore);

    public signIn(email: string, password: string): Promise<string> {
        return this.userRestDatastore.signIn(email, password);
    }
}
