<template>
    <Variant name="Default" description="Default radio">
        <VRadio id="radio-default-1" name="radio-default">Option 1</VRadio>
        <VRadio id="radio-default-2" name="radio-default">Option 2</VRadio>
        <VRadio id="radio-default-3" name="radio-default">Option 3</VRadio>
    </Variant>
</template>

<script lang="ts">
import type { PageMeta } from "@vitebook/client";

export const __pageMeta: PageMeta = {
    title: "Radio"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { VRadio } from "./radio.component";
</script>
