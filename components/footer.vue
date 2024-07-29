<script setup lang="ts">
import Button_Custom from "~/components/button.vue";
</script>

<template>
    <UDivider
        :ui="{ border: { base: 'border-neutral-300 dark:border-neutral-600' } }"
    >
        <img
            src="file://E:\github\logo\liria\logo_liria_icon_001_vector.svg"
            :width="40"
            :height="40"
        />
    </UDivider>
    <div class="flex flex-col w-full gap-6 pb-10">
        <div
            class="items-center justify-center gap-4 flex text-neutral-700 dark:text-white"
        >
            <Button_Custom
                text="お知らせ"
                icon="lucide:megaphone"
                :iconSize="22"
            />
            <Button_Custom text="Liria" icon="lucide:tent" :iconSize="22" />
            <Button_Custom icon="simple-icons:x" :iconSize="20" />
            <Button_Custom icon="simple-icons:github" :iconSize="22" />
            <Button_Custom icon="simple-icons:discord" class="hidden" />
        </div>
        <div
            class="items-center justify-center gap-4 flex text-neutral-700 dark:text-white"
        >
            <UButton variant="link">Avatioについて</UButton>
            <UButton variant="link">ガイド・FAQ</UButton>
            <UButton variant="link">利用規約</UButton>
            <UButton variant="link">プライバシーポリシー</UButton>
        </div>
    </div>
</template>
