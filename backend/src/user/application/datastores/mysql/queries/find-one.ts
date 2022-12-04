import type { IUserEntity } from "src/user/domain/entities";

export function findOneQuery(params?: Partial<IUserEntity>) {
    const conditions = getConditions(params);

    return `
        SELECT
            u.userId as id,
            u.userFirstName as firstName,
            u.userLastName as lastName,
            u.userEmail as email,
            u.userPassword as password,
            u.userToken as token,
            u.userCreatedAt as createdAt,
            u.userCreatedAt as createdAt
        FROM user u
        ${conditions};
    `;
}

function getConditions(params?: Partial<IUserEntity>) {
    const conditions = [];

    if (params?.email) {
        conditions.push(`u.userEmail = '${params.email}'`);
    }

    return conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
}
