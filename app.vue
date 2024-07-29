<script setup lang="ts">
import Header_avatio from "~/components/header.vue";
import Footer_avatio from "~/components/footer.vue";
</script>

<template>
    <UContainer
        class="flex flex-col gap-10 pt-10"
        :ui="{ padding: 'px-8 sm:px-10 lg:px-16' }"
    >
        <Header_avatio />
    </UContainer>
    <NuxtPage />
    <UContainer
        class="flex flex-col gap-10 pt-10"
        :ui="{ padding: 'px-8 sm:px-10 lg:px-16' }"
    >
        <Footer_avatio />
    </UContainer>
</template>

<style>
body {
    background-color: #f0f0f0;
}

.dark body {
    background-color: #262626;
}
</style>
