import { getCurrentInstance as _getCurrentInstance } from "vue";

/**
 * Ensure current instance exist and gets instance
 * @param {string} name - Context name
 * @see https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/util/getCurrentInstance.ts#L6
 */
export function useInternalInstance(name: string) {
    const instance = _getCurrentInstance();
    if (!instance) {
        throw new Error(`${name} context must be called from inside a setup function`);
    }
    return instance;
}
