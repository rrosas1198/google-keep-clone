<template>
    <Variant name="Default" description="Default icon button toggle">
        <VIconButtonToggle id="icon-button-toggle-default" aria-label="Icon button toggle"
            >Default</VIconButtonToggle
        >
    </Variant>
</template>

<script lang="ts">
import type { PageMeta } from "@vitebook/client";

export const __pageMeta: PageMeta = {
    title: "IconButtonToggle"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { VIconButtonToggle } from "./icon-button-toggle.component";
</script>
