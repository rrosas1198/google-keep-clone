<template>
    <main>
        <form @submit.prevent="viewModel.onSubmit">
            <VTextField
                id="search-input"
                label="Buscar"
                placeholder="Buscar"
                v-model="viewModel.model.email"
            />
            <VTextField
                id="search-input"
                label="Buscar"
                placeholder="Buscar"
                v-model="viewModel.model.password"
            />
            <VButton>Iniciar sesión</VButton>
        </form>
    </main>
</template>

<script setup>
import { VButton, VTextField } from "@keep/components";
import { AppContext } from "@keep/platform-nuxt";
import { SignInViewModel } from "src/features/user/presentation/view-models";

const viewModel = AppContext.resolve(SignInViewModel);
</script>
