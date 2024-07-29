<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
    error: Object as () => NuxtError,
});

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
    <UContainer
        class="flex flex-col items-center gap-10 pt-10"
        :ui="{ padding: 'px-8 sm:px-10 lg:px-16' }"
    >
        <h1
            class="flex text-9xl font-extrabold font-['Montserrat'] text-neutral-500 dark:text-neutral-400"
        >
            {{ error.statusCode }}
        </h1>
        <div class="text-xl font-bold text-neutral-500 dark:text-neutral-400">
            ページが見つかりませんでした。
        </div>
        <NuxtLink to="/">ホーム</NuxtLink>
    </UContainer>
    <UContainer
        class="flex flex-col gap-10 pt-10"
        :ui="{ padding: 'px-8 sm:px-10 lg:px-16' }"
    >
        <Footer_avatio />
    </UContainer>
</template>
