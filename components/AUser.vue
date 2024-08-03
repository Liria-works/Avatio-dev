<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        user: string;
        image?: string;
        size?: string;
    }>(),
    {
        user: "",
        image: "https://avatars.githubusercontent.com/u/47878070?v=4",
        size: "md",
    }
);
</script>

<template>
    <div
        v-if="size === 'md'"
        class="flex flex-row items-center justify-between pt-1 w-full"
    >
        <div class="flex flex-row gap-3 items-center">
            <UAvatar :src="props.image" alt="Avatar" />
            <span class="text-black dark:text-white pb-0.5 text-left">
                {{ props.user }}
            </span>
        </div>
        <AButton icon="lucide:link" :iconSize="18" tooltip="リンク" />
    </div>

    <div v-else-if="size === 'sm'" class="flex flex-row gap-2 items-center">
        <UAvatar size="xs" :src="props.image" alt="Avatar" />
        <span
            class="text-neutral-600 dark:text-neutral-300 pb-0.5 text-left text-sm line-clamp-1"
        >
            {{ props.user }}
        </span>
    </div>
</template>
