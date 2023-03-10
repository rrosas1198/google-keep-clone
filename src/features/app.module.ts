import type { IModule } from "src/libs/container";
import { Container } from "src/libs/container";
import { HttpService } from "src/libs/http";
import { once } from "../utils";
import { NoteModule } from "./notes/note.module";

const _modules: IModule[] = [NoteModule];

export const registerModules = once(() => {
    const globalContainer = Container.asGlobalInstance();

    // Global singletons
    globalContainer.registerLazySingleton(HttpService, () => new HttpService());

    // Feature modules
    _modules.forEach(mod => mod.registerDependencies());
});
