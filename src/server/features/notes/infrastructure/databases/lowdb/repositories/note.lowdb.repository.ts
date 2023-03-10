import type { Note } from "src/features/notes/domain/entities";
import { NoteRepository } from "src/features/notes/domain/repositories";
import type { NoteLowDbDatastore } from "../datastores";

export class NoteLowDbRepository extends NoteRepository {
    readonly #_noteLowDbDatastore: NoteLowDbDatastore;

    constructor(noteLowDbDatastore: NoteLowDbDatastore) {
        super();
        this.#_noteLowDbDatastore = noteLowDbDatastore;
    }

    getList(): Promise<Note[]> {
        return this.#_noteLowDbDatastore.getList();
    }
}
