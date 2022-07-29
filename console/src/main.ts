import { ApplicationContext } from "@keep/common";
import { MigrationService } from "./migration/migration.service";

async function main() {
    const context = new ApplicationContext();

    // Migration
    const migrationService = context.resolve(MigrationService);
    await migrationService.execute();
}

main().catch(error => {
    console.error(error);
    process.exit(1);
});
