import { IUserEntity } from "src/user/domain/entities";

export function mapFindOne(rawUser: GenericRecord): IUserEntity {
    return {
        id: rawUser.id,
        firstName: rawUser.firstName,
        lastName: rawUser.lastName,
        email: rawUser.email,
        password: rawUser.password,
        token: rawUser.token,
        createdAt: new Date(rawUser.createdAt),
        deletedAt: new Date(rawUser.createdAt)
    };
}
