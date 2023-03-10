import type { Note } from "../entities";

export abstract class NoteRepository {
    abstract getList(): Promise<Note[]>;
}
