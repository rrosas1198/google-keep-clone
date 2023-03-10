import type { Note } from "src/features/notes/domain/entities";

export interface LowDbDocument {
    notes: Note[];
}
