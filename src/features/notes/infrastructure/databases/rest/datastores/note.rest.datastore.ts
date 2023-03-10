import type { IGenericRecord } from "src/interfaces";
import type { HttpService } from "src/libs/http";

export class NoteRestDatastore {
    readonly #_httpService: HttpService;

    constructor(httpService: HttpService) {
        this.#_httpService = httpService;
    }

    getList(): Promise<IGenericRecord[]> {
        return this.#_httpService.$get("/api/notes/list");
    }
}
