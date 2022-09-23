import { Module } from "@keep/core";
import { MigrationRunner } from "./migration.runner";

@Module({
    providers: [MigrationRunner]
})
export class MigrationModule {}
