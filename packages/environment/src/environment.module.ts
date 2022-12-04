import type { IDynamicModule } from "@keep/core";
import { parse } from "dotenv";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { IEnvironmentService } from "./environment.interface";
import { EnvironmentService } from "./environment.service";

export class EnvironmentModule {
    public static forRoot(paths: string[]): IDynamicModule {
        const variables = this.loadEnvVariables(paths);
        const keys = Object.keys(variables).filter(key => !(key in process.env));
        keys.forEach(key => (process.env[key] = variables[key]));

        return {
            module: EnvironmentModule,
            providers: [{ provide: IEnvironmentService, useClass: EnvironmentService }]
        };
    }

    private static loadEnvVariables(paths: string[] = []) {
        const variables = {} as ReturnType<typeof parse>;

        const absolutePaths = paths
            .map(path => resolve(process.cwd(), path))
            .filter(path => existsSync(path));

        for (const filepath of absolutePaths) {
            const parsed = parse(readFileSync(filepath));
            Object.assign(variables, parsed);
        }

        return variables;
    }
}
