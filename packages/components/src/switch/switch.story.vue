<template>
    <Variant name="Default" description="Default switch">
        <VSwitch id="switch-default" />
    </Variant>
</template>

<script lang="ts">
import type { PageMeta } from "@vitebook/client";

export const __pageMeta: PageMeta = {
    title: "Switch"
};
</script>

<script setup lang="ts">
import { Variant } from "@vitebook/vue";
import { VSwitch } from "./switch.component";
</script>
