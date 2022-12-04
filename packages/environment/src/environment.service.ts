import type { IEnvironmentService } from "./environment.interface";

export class EnvironmentService implements IEnvironmentService {
    public get(path: string, defaultValue?: string) {
        return (process.env[path] || defaultValue) as string;
    }
}
