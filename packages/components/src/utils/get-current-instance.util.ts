import { getCurrentInstance as _getCurrentInstance } from "vue";

// See https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/util/getCurrentInstance.ts#L6
export function getCurrentInstance(name: string) {
    const instance = _getCurrentInstance();
    if (!instance) {
        throw new Error(`${name} ${"must be called from inside a setup function"}`);
    }
    return instance;
}
