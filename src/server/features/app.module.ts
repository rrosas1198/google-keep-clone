import type { IModule } from "src/libs/container";
import { Container } from "src/libs/container";
import { LowDbService } from "src/libs/lowdb";
import { once } from "src/utils";
import type { ILowDbDocument } from "../interfaces";
import { resolveCwd } from "../utils";
import { NoteModule } from "./notes/note.module";

const _modules: IModule[] = [NoteModule];

export const registerModules = once(() => {
    const globalContainer = Container.asGlobalInstance();

    // Global singletons
    globalContainer.registerLazySingleton(LowDbService<ILowDbDocument>, () => {
        const filepath = resolveCwd("static/database.json");
        return new LowDbService<ILowDbDocument>(filepath);
    });

    // Feature modules
    _modules.forEach(mod => mod.registerDependencies());
});
