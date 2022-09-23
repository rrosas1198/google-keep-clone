import { IConfigService } from "./config.interface";

export class ConfigService implements IConfigService {
    public get(path: string, defaultValue?: string) {
        return (process.env[path] || defaultValue) as string;
    }
}
