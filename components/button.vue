<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon?: string;
        iconSize?: number;
        text?: string;
    }>(),
    {
        icon: "",
        iconSize: 24,
        text: "",
    }
);
</script>

<template>
    <button v-if="props.text"
        class="flex gap-2 items-center justify-center rounded-full px-3 py-2 hover:bg-neutral-200 dark:hover:bg-neutral-700">
        <Icon :name="props.icon" :width="props.iconSize" :height="props.iconSize" class="min-w-max min-h-max" />
        <span class="pr-1">{{ props.text }}</span>
    </button>

    <button v-else
        class="flex items-center justify-center rounded-full p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700">
        <Icon :name="props.icon" :width="props.iconSize" :height="props.iconSize" class="min-w-max min-h-max" />
    </button>
</template>
