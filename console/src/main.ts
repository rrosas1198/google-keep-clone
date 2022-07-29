import { ApplicationContext } from "@keep/common";
import { MigrationRunner } from "./migration/migration.runner";

async function main() {
    const context = new ApplicationContext();

    // Migration
    const migrationRunner = context.resolve(MigrationRunner);
    await migrationRunner.execute();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
