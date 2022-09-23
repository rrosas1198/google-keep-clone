import { IPlatform } from "@keep/core";

export class NuxtPlatform implements IPlatform<void> {
    public bootstrap(): Promise<void> {
        return Promise.resolve();
    }
}
