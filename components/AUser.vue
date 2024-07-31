<template>
    <div class="flex flex-row items-center justify-between pt-1 w-full">
        <div class="flex flex-row gap-3 items-center">
            <UAvatar :src="props.image" alt="Avatar" />
            <span class="text-black dark:text-white pb-0.5 text-left">
                {{ props.user }}
            </span>
        </div>
        <AButton icon="lucide:link" :iconSize="18" tooltip="リンク" />
    </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        user: string;
        image?: string;
    }>(),
    {
        user: "",
        image: "https://avatars.githubusercontent.com/u/47878070?v=4",
    }
);
</script>

<style></style>
