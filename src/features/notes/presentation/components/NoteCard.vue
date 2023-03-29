<template>
    <article class="note">
        <h2>{{ note.title }}</h2>
        <div v-html="note.content" />
    </article>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Note } from "../../domain/entities";

defineProps({
    note: {
        type: Object as PropType<Note>,
        required: true
    }
})
</script>

<style lang="scss">
@use "src/libs/theme/layout/media-query";
@use "src/libs/theme/system/color";
@use "src/libs/theme/system/shape";

.note {
    padding: 12px 16px;
    border: 1px solid color.get-varname(surface-variant);
    border-radius: shape.get-fallback(corner-small);
}
</style>
