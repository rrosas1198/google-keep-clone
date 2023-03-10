import { parse } from "dotenv";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ENVIRONMENT_NAME = process.env.NODE_ENV || "production";
const ENVIRONMENT_PATHS = ["env/default.env", `env/${ENVIRONMENT_NAME}.env`];

export class EnvironmentService {
    static #_instance: EnvironmentService;

    static asGlobalInstance() {
        if (!EnvironmentService.#_instance) {
            EnvironmentService.#_instance = new EnvironmentService();
        }
        return EnvironmentService.#_instance;
    }

    private constructor() {
        const variables = this.#_loadVariables(ENVIRONMENT_PATHS);
        const keys = Object.keys(variables).filter(key => !(key in process.env));

        keys.forEach(key => (process.env[key] = variables[key]));
    }

    get<T = string | number>(path: string, defaultValue?: string) {
        return (process.env[path] || defaultValue) as T | undefined;
    }

    getOrFail<T = string | number>(path: string) {
        const value = process.env[path];

        if (!value) {
            throw new Error(`Environment variable ${path} not found`);
        }

        return value as T;
    }

    #_loadVariables(paths: string[]) {
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
