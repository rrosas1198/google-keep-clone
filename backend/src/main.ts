import { HttpApplication } from "@keep/platform-http";
import { AppModule } from "./app.module";

async function main() {
    const app = new HttpApplication(AppModule);
    await app.startup();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
