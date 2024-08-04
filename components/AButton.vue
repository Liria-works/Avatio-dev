<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        icon?: string;
        iconSize?: number;
        text?: string;
        tooltip?: string;
    }>(),
    {
        icon: "",
        iconSize: 24,
        text: "",
        tooltip: "",
    }
);
</script>

<template>
    <UTooltip
        :prevent="props.tooltip ? false : true"
        :text="props.tooltip"
        :popper="{ placement: 'top' }"
        :ui="{
            background: 'bg-white dark:bg-gray-700',
            ring: 'ring-0',
        }"
    >
        <button
            v-if="props.text"
            class="flex gap-2 items-center justify-center rounded-full px-3 py-2 hover:bg-neutral-200 bg-blend-multiply dark:hover:bg-neutral-600 dark:bg-blend-screen"
        >
            <Icon
                :name="props.icon"
                :size="props.iconSize"
                class="min-w-max min-h-max"
            />
            <span class="pr-1 text-[15px] font-medium">{{ props.text }}</span>
        </button>

        <button
            v-else
            class="aspect-square min-h-10 min-w-10 flex items-center justify-center rounded-full p-2 hover:bg-neutral-200 bg-blend-multiply dark:hover:bg-neutral-600 dark:bg-blend-screen"
        >
            <Icon
                :name="props.icon"
                :size="props.iconSize"
                class="min-w-max min-h-max dark:mix-blend-normal dark:opacity-100"
            />
        </button>
    </UTooltip>
</template>
