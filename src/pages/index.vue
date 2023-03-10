<template>
    <header class="home__header"></header>

    <section class="home__featured">
        <VButton id="tryNotes" color="primary" variant="filled">Probar Google Keep</VButton>
    </section>

    <section class="home__capture-ideas"></section>

    <section class="home__all-places"></section>

    <section class="home__share-ideas"></section>

    <section class="home__find-notes"></section>

    <section class="home__devices"></section>

    <section class="home__store-notes"></section>

    <footer class="home__footer"></footer>
</template>

<script setup>
import { VButton } from "src/libs/components";
</script>

<style lang="scss">
@use "src/libs/theme/polyfill";

.home__featured {
    @include polyfill.aspect-ratio(9, 16);
}
</style>
