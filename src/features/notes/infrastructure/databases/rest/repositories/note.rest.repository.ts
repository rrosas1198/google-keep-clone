import type { Note } from "src/features/notes/domain/entities";
import { NoteRepository } from "src/features/notes/domain/repositories";
import type { NoteRestDatastore } from "../datastores";
import { NotesMapper } from "../mappers";

export class NoteRestRepository extends NoteRepository {
    readonly #_noteRestDatastore: NoteRestDatastore;

    constructor(noteRestDatastore: NoteRestDatastore) {
        super();
        this.#_noteRestDatastore = noteRestDatastore;
    }

    async getList(): Promise<Note[]> {
        const response = await this.#_noteRestDatastore.getList();
        return NotesMapper.mapNotesList(response);
    }
}
