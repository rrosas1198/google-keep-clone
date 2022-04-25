/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from "@keep/common";

@Injectable()
export class ConfigService {
    public get<T = any>(path: string, defaultValue?: T) {
        return (process.env[path] || defaultValue) as T;
    }
}
