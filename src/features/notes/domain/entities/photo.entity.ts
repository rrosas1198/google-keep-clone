export class Photo {
    id!: string;
    url!: string;

    constructor(entity: Partial<Photo>) {
        Object.assign(this, entity);
    }
}
