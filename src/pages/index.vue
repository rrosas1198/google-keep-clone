<template>
    <HomeHeader />

    <main class="home container">
        <CreateNote />

        <section class="home__notes">
            <article>Card 1</article>
            <article>Card 2</article>
            <article>Card 3</article>
            <article>Card 4</article>
            <article>Card 5</article>
            <article>Card 6</article>
            <article>Card 7</article>
        </section>
    </main>
</template>

<script setup lang="ts">
import { Note } from "src/features/notes/domain/entities";
import { ListNotesUseCase } from "src/features/notes/domain/use-cases";
import { NoteModule } from "src/features/notes/note.module";
import CreateNote from "src/features/notes/presentation/components/CreateNote.vue";
import HomeHeader from "src/features/notes/presentation/partials/HomeHeader.vue";

const listNotesUseCase = NoteModule.resolve(ListNotesUseCase);

const notes = ref<Note[]>([]);

useHead({
    title: "Guarda tus ideas estés donde estés"
});

useAsyncData(async () => {
    const [response, _error] = await listNotesUseCase.execute();
    notes.value = response;
});
</script>

<style lang="scss">
.home {
    padding-block-start: var(--navigation-height);

    .create-note {
        margin-block: 32px;
    }
}
</style>
