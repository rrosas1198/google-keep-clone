import type { Note } from "src/features/notes/domain/entities";
import type { LowDbService } from "src/libs/lowdb";
import type { ILowDbDocument } from "src/server/interfaces";

export class NoteLowDbDatastore {
    readonly #_lowDbService: LowDbService<ILowDbDocument>;

    constructor(lowDbService: LowDbService<ILowDbDocument>) {
        this.#_lowDbService = lowDbService;

        this.#_lowDbService.data ||= {} as ILowDbDocument;
        this.#_lowDbService.data.notes ||= [];
    }

    async getList(): Promise<Note[]> {
        await this.#_lowDbService.read();
        return this.#_lowDbService.data?.notes || [];
    }
}
