<template>
    <Variant name="Default" description="Default checkbox">
        <VCheckbox id="checkbox-default">Default</VCheckbox>
    </Variant>
</template>

<script lang="ts">
import type { PageMeta } from "@vitebook/client";

export const __pageMeta: PageMeta = {
    title: "Checkbox"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { VCheckbox } from "./checkbox.component";
</script>
