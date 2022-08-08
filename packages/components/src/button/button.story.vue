<template>
    <Variant name="Default" description="Default button">
        <VButton id="button-default">Default</VButton>
    </Variant>
</template>

<script lang="ts">
import type { PageMeta } from "@vitebook/client";

export const __pageMeta: PageMeta = {
    title: "Button"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { VButton } from "./button.component";
</script>
