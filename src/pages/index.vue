<template>
    <HomeHeader />

    <main class="container-fluid">
        <article>Card 1</article>
        <article>Card 2</article>
        <article>Card 3</article>
        <article>Card 4</article>
        <article>Card 5</article>
        <article>Card 6</article>
        <article>Card 7</article>
    </main>
</template>

<script setup lang="ts">
import { ListNotesUseCase } from "src/features/notes/domain/use-cases";
import { NoteModule } from "src/features/notes/note.module";
import HomeHeader from "src/features/notes/presentation/partials/HomeHeader.vue";

const listNotesUseCase = NoteModule.resolve(ListNotesUseCase);

useHead({
    title: "Guarda tus ideas estés donde estés"
});

// useFetch(async () => {
//     const response = await listNotesUseCase.execute();

//     console.log(response);

//     return {};
// });
</script>

<style lang="scss">
//
</style>
