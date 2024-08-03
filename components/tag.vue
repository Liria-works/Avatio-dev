<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        text: string;
        icon?: string;
        color?: any;
        tooltip?: string;
    }>(),
    {
        icon: "lucide:tag",
        color: "primary",
        tooltip: "",
    }
);

import { tv } from "tailwind-variants";

const tag = tv({
    slots: {
        base: "px-2.5 py-1 rounded rounded-lg justify-center items-center flex text-sm font-normal whitespace-nowrap gap-1",
        icon: "size-4 min-w-max min-h-max text-neutral-500",
    },
    variants: {
        color: {
            primary: {
                base: "bg-white dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-black dark:text-white",
                icon: "text-neutral-500 dark:text-neutral-300",
            },
            secondary: {
                base: "text-white dark:text-black bg-neutral-600 hover:bg-neutral-700 dark:bg-neutral-300 dark:hover:bg-neutral-200",
                icon: "text-white dark:text-neutral-700",
            },
            pink: {
                base: "text-white bg-pink-500 hover:bg-pink-400",
                icon: "text-white",
            },
        },
    },
});

const { base, icon } = tag();
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
        <button :class="base({ color: props.color })">
            <Icon
                v-if="props.icon"
                :name="props.icon"
                :class="icon({ color: props.color })"
            />
            {{ text }}
        </button>
    </UTooltip>
</template>
