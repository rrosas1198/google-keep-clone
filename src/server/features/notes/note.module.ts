import { NoteRepository } from "src/features/notes/domain/repositories";
import { ListNotesUseCase } from "src/features/notes/domain/use-cases";
import { Container, defineModule } from "src/libs/container";
import { LowDbService } from "src/libs/lowdb";
import { NoteLowDbDatastore } from "./infrastructure/databases/lowdb/datastores";
import { NoteLowDbRepository } from "./infrastructure/databases/lowdb/repositories";

export const NoteModule = defineModule(container => {
    const globalContainer = Container.asGlobalInstance();

    container.registerLazySingleton(NoteRepository, () => {
        const lowDbDatastore = new NoteLowDbDatastore(globalContainer.resolve(LowDbService));
        return new NoteLowDbRepository(lowDbDatastore);
    });

    container.registerLazySingleton(ListNotesUseCase, () => {
        return new ListNotesUseCase(container.resolve(NoteRepository));
    });
});
