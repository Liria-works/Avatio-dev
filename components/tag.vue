<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        text: string;
        icon?: string;
        color?: any;
    }>(),
    {
        icon: "lucide:tag",
        color: "primary",
    }
);

import { tv } from "tailwind-variants";

const tag = tv({
    slots: {
        base: "px-2.5 py-1 rounded justify-center items-center flex text-sm whitespace-nowrap gap-1",
        icon: "size-4 min-w-max min-h-max text-neutral-500",
    },
    variants: {
        color: {
            primary: {
                base: "bg-white hover:bg-neutral-200 text-black",
                icon: "text-neutral-500",
            },
            secondary: {
                base: "text-white bg-neutral-600 hover:bg-neutral-700",
                icon: "text-white",
            },
            pink: {
                base: "text-white bg-pink-400 hover:bg-pink-500",
                icon: "text-white",
            },
        },
    },
});

const { base, icon } = tag();
</script>

<template>
    <button :class="base({ color: props.color })">
        <Icon :name="props.icon" :class="icon({ color: props.color })" />
        {{ text }}
    </button>
</template>
