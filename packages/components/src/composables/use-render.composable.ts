/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCurrentInstance } from "src/utils";
import type { VNode } from "vue";

// See https://github.com/vuetifyjs/vuetify/blob/next/packages/vuetify/src/util/useRender.ts#L7
export function useRender(render: () => VNode): void {
    const _instance = getCurrentInstance("render") as any;
    _instance.render = render;
}
