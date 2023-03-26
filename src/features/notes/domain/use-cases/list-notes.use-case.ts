import type { IUseCase } from "src/interfaces";
import { tryCatch } from "src/common/utils";
import type { Note } from "../entities";
import type { NoteRepository } from "../repositories";

export class ListNotesUseCase implements IUseCase<never, Note[]> {
    readonly #_noteRepository: NoteRepository;

    constructor(noteRepository: NoteRepository) {
        this.#_noteRepository = noteRepository;
    }

    async execute(): Promise<[Note[], Error]> {
        return tryCatch(this.#_noteRepository.getList());
    }
}
