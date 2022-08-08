<template>
    <Variant name="Default" description="Default icon button">
        <VIconButton id="icon-button-default" aria-label="Icon button">Default</VIconButton>
    </Variant>
</template>

<script lang="ts">
import type { PageMeta } from "@vitebook/client";

export const __pageMeta: PageMeta = {
    title: "IconButton"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { VIconButton } from "./icon-button.component";
</script>
