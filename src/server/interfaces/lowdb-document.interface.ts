import type { Note } from "src/features/notes/domain/entities";

export interface ILowDbDocument {
    notes: Note[];
}
