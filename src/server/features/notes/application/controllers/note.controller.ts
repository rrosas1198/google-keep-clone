import type { ListNotesUseCase } from "src/features/notes/domain/use-cases";

export class NoteController {
    #_listNotesUseCase: ListNotesUseCase;

    constructor(listNotesUseCase: ListNotesUseCase) {
        this.#_listNotesUseCase = listNotesUseCase;
    }

    async listNotes() {
        const [response, error] = await this.#_listNotesUseCase.execute();

        if (error) {
            throw error;
        }

        return response;
    }
}
