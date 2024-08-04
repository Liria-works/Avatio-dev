<script setup lang="ts"></script>

<template>
    <UContainer
        class="flex flex-col gap-10"
        :ui="{ padding: 'px-8 pt-10 sm:px-10 lg:px-16' }"
    >
        <AHeader />
        <NuxtPage />
        <AFooter />
    </UContainer>
    <UNotifications />
</template>

<style>
body {
    background-color: #f0f0f0;
}

.dark body {
    background-color: #262626;
}
</style>
