import type { ListNotesUseCase } from "src/features/notes/domain/use-cases";

export class NoteController {
    #_listNotesUseCase: ListNotesUseCase;

    constructor(listNotesUseCase: ListNotesUseCase) {
        this.#_listNotesUseCase = listNotesUseCase;
    }

    listNotes() {
        return this.#_listNotesUseCase.execute();
    }
}
