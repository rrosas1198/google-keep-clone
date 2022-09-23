import { IDynamicModule } from "@keep/core";
import { parse } from "dotenv";
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";
import { IConfigService } from "./config.interface";
import { ConfigService } from "./config.service";

export class ConfigModule {
    public static forRoot(paths: string[]): IDynamicModule {
        const variables = this.loadEnvVariables(paths);
        const keys = Object.keys(variables).filter(key => !(key in process.env));
        keys.forEach(key => (process.env[key] = variables[key]));

        return {
            module: ConfigModule,
            providers: [{ provide: IConfigService, useClass: ConfigService }]
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
