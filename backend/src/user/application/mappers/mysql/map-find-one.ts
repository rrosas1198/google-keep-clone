import { map, OperatorFunction } from "rxjs";
import { IUserEntity } from "src/user/domain/entities";

export function mapFindOne(): OperatorFunction<GenericRecord, IUserEntity> {
    return map<GenericRecord, IUserEntity>(data => ({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        token: data.token,
        createdAt: new Date(data.createdAt),
        deletedAt: new Date(data.createdAt)
    }));
}
