<template>
    <article class="note">1</article>
</template>

<script setup lang="ts">
//
</script>

<style lang="scss">
@use "src/libs/theme/layout/media-query";
@use "src/libs/theme/system/color";
@use "src/libs/theme/system/shape";

.note {
    border: 1px solid color.get-varname(surface-variant);
    border-radius: shape.get-fallback(corner-small);
}
</style>
