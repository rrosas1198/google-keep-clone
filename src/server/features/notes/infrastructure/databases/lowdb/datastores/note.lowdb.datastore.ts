import type { Note } from "src/features/notes/domain/entities";
import type { LowDbService } from "src/libs/lowdb";
import type { LowDbDocument } from "src/server/interfaces";

export class NoteLowDbDatastore {
    readonly #_lowDbService: LowDbService<LowDbDocument>;

    constructor(lowDbService: LowDbService<LowDbDocument>) {
        this.#_lowDbService = lowDbService;

        this.#_lowDbService.data ||= {} as LowDbDocument;
        this.#_lowDbService.data.notes ||= [];
    }

    getList(): Promise<Note[]> {
        return Promise.resolve(this.#_lowDbService.data?.notes || []);
    }
}
