<template>
    <Variant name="Default" description="Default text field">
        <VTextField id="text-field-default" />
    </Variant>
</template>

<script lang="ts">
import type { PageMeta } from "@vitebook/client";

export const __pageMeta: PageMeta = {
    title: "TextField"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { VTextField } from "./text-field.component";
</script>
