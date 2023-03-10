import { Container, defineModule } from "src/libs/container";
import { HttpService } from "src/libs/http";
import { NoteRepository } from "./domain/repositories";
import { ListNotesUseCase } from "./domain/use-cases";
import { NoteRestDatastore } from "./infrastructure/databases/rest/datastores";
import { NoteRestRepository } from "./infrastructure/databases/rest/repositories";

export const NoteModule = defineModule(container => {
    const globalContainer = Container.asGlobalInstance();

    container.registerLazySingleton(NoteRepository, () => {
        const brandRestDatastore = new NoteRestDatastore(globalContainer.resolve(HttpService));
        return new NoteRestRepository(brandRestDatastore);
    });

    container.registerLazySingleton(ListNotesUseCase, () => {
        return new ListNotesUseCase(container.resolve(NoteRepository));
    });
});
