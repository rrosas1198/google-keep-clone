import { registerModules as registerClientModules } from "src/features/app.module";

export default defineNuxtPlugin(() => {
    registerClientModules();
});
