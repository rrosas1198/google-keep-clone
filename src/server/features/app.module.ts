import type { IModule } from "src/libs/container";
import { Container } from "src/libs/container";
import { LowDbService } from "src/libs/lowdb";
import { once } from "src/utils";
import type { LowDbDocument } from "../interfaces";
import { resolveCwd } from "../utils";
import { NoteModule } from "./notes/note.module";

const _modules: IModule[] = [NoteModule];

export const registerModules = once(() => {
    const globalContainer = Container.asGlobalInstance();

    // Global singletons
    globalContainer.registerLazySingleton(LowDbService<LowDbDocument>, () => {
        const filepath = resolveCwd("static/database.json");
        return new LowDbService<LowDbDocument>(filepath);
    });

    // Feature modules
    _modules.forEach(mod => mod.registerDependencies());
});
