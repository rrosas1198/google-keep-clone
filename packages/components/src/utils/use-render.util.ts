/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentInstance, VNode } from "vue";

// See: https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/util/useRender.ts#L7
export function useRender(render: () => VNode): void {
    const vm = getCurrentInstance() as any;
    vm.render = render;
}
