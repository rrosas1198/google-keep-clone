import { registerModules as registerClientModules } from "src/features/app.module";
import { registerModules as registerServerModules } from "src/server/features/app.module";

export default defineNuxtPlugin(() => {
    registerClientModules();
    registerServerModules();
});
