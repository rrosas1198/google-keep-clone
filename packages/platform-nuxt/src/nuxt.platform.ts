import { IPlatform } from "@keep/common";

export class NuxtPlatform implements IPlatform<void> {
    public bootstrap(): Promise<void> {
        return Promise.resolve();
    }
}
