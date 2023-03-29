<template>
    <component ref="root" class="masonry" :is="tag">
        <div v-for="(index, idx) in indexes" :key="idx" class="masonry__column" :data-index="idx">
            <template v-for="ix in index">
                <slot :item="items[ix]">
                    {{ items[ix] }}
                </slot>
            </template>
        </div>
    </component>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { clamp } from "../utils";

const props = defineProps({
    columnWidth: {
        type: Number,
        default: 400
    },
    items: {
        type: Array as PropType<any[]>,
        default: () => []
    },
    tag: {
        type: String,
        default: "div"
    }
});

const root = ref<HTMLElement>() as Ref<HTMLElement>;
const indexes = ref<number[][]>([]);

let resizeObserver!: ResizeObserver;

const { columnWidth, items } = toRefs(props);

const doLayout = async () => {
    indexes.value = _createColumns(_columnCount());
    await _fillColumn(0);
};

const _fillColumn = async (index: number) => {
    if (index >= items.value.length) return;

    await nextTick();

    const elements = [...root.value.children] as HTMLDivElement[];
    const target = elements.reduce((acc, curr) => {
        const currHeight = curr.getBoundingClientRect().height;
        const accHeight = acc.getBoundingClientRect().height;
        return currHeight < accHeight ? curr : acc;
    });

    indexes.value[+target.dataset.index!]!.push(index);

    await _fillColumn(index + 1);
};

const _columnCount = () => {
    const totalWidth = root.value.getBoundingClientRect().width;
    const columnGap = Number.parseFloat(_getRootPropertyValue("--masonry-gap")) || 0;
    const columnCount = Math.floor((totalWidth + columnGap) / (columnWidth.value + columnGap));
    return clamp(columnCount, 1, Number.MAX_SAFE_INTEGER);
};

const _createColumns = (count: number) => {
    return [...new Array(count)].map(() => [] as number[]);
};

const _getRootPropertyValue = (propertyName: string) => {
    return window.getComputedStyle(root.value).getPropertyValue(propertyName);
};

const _observeResize = () => {
    resizeObserver = new ResizeObserver(() => doLayout());
    resizeObserver.observe(root.value);
}

const _unobserveResize = () => {
    resizeObserver.disconnect();
    resizeObserver = undefined!;
};

watch([items, columnWidth], () => doLayout());

onMounted(() => {
    doLayout();
    _observeResize();
});

onBeforeUnmount(() => {
    _unobserveResize();
})
</script>

<style lang="scss">
.masonry {
    display: flex;
    gap: var(--masonry-gap, 0);
}

.masonry__column {
    min-width: 0;
    height: max-content;
    display: flex;
    gap: var(--masonry-gap, 0);
    flex-grow: 1;
    flex-basis: 0px;
    flex-direction: column;
}
</style>
