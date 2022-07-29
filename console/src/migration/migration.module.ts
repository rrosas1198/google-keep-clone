import { Module } from "@keep/common";
import { MigrationService } from "./migration.service";

@Module({
    providers: [MigrationService]
})
export class MigrationModule {}
