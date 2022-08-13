import { AppContext } from "@keep/platform-nuxt";
import { AppModule } from "src/features/app.module";

let isRegistered = false;

export default defineNuxtPlugin(() => {
    if (isRegistered) return;

    AppContext.registerModule(AppModule);
    isRegistered = true;
});
