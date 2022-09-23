import { ApplicationContext } from "@keep/core";
import { AppModule } from "./app.module";
import { MigrationRunner } from "./migration/migration.runner";

async function main() {
    const context = new ApplicationContext();
    context.registerModule(AppModule);

    // Migration
    const migrationRunner = context.resolve(MigrationRunner);
    await migrationRunner.execute();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
