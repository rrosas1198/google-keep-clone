<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
useHead({
    htmlAttrs: { lang: "es" },
    title: "Google Keep",
    link: [
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com/"
        },
        {
            rel: "dns-prefetch",
            href: "https://fonts.googleapis.com/"
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        }
    ]
});

useSeoMeta({
    titleTemplate: "%s - Google Keep"
});

useSchemaOrg([
    defineOrganization({
        name: "Google Keep",
        url: "https://keep.google.com/",
        logo: "https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
    })
]);
</script>
