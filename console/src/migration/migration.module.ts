import { Module } from "@keep/common";
import { MigrationRunner } from "./migration.runner";

@Module({
    providers: [MigrationRunner]
})
export class MigrationModule {}
