import { map, OperatorFunction } from "rxjs";
import { UserEntity } from "src/user/domain/entities";

export function mapFindOne(): OperatorFunction<GenericRecord, UserEntity> {
    return map<GenericRecord, UserEntity>(data => ({
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
