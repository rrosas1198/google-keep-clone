export interface IUserEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token: string;
    createdAt: Date;
    deletedAt: Date;
}
