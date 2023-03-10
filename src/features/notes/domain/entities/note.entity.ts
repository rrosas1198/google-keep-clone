import type { Photo } from "./photo.entity";

export class Note {
    id!: string;
    title!: string;
    content!: string;
    background!: string;
    isPinned: boolean = false;
    createdAt!: Date;
    deletedAt?: Date;
    photos: Photo[] = [];

    constructor(entity: Partial<Note>) {
        Object.assign(this, entity);
    }
}
