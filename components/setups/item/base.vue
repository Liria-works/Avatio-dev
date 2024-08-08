<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        size?: any;
    }>(),
    {
        size: "md",
    }
);

import { tv } from "tailwind-variants";

const variant = tv({
    slots: {
        base: "w-full flex items-center",
        thumbnail: "flex items-center justify-center",
        note: "w-full p-3 empty:hidden",
    },
    variants: {
        size: {
            lg: {
                base: "",
                thumbnail: "ml-4 my-4 size-32 min-w-32",
                note: "p-0 px-3 pb-3",
            },
            md: { base: "", thumbnail: "size-20 min-w-20" },
            sm: { base: "", thumbnail: "size-16 min-w-16" },
        },
    },
});

const { base, thumbnail, note } = variant();
</script>

<template>
    <div
        class="w-full h-fit flex flex-col items-start bg-white dark:bg-neutral-700 rounded-xl overflow-clip"
    >
        <div :class="base({ size: props.size })">
            <div :class="thumbnail({ size: props.size })">
                <slot name="thumbnail" />
            </div>
            <div
                class="w-full h-full flex flex-nowrap items-center px-4 overflow-hidden"
            >
                <slot name="main" />
            </div>
            <div class="empty:hidden h-full flex items-center px-2">
                <slot name="tag" />
            </div>
            <div class="empty:hidden h-full flex items-center pr-4">
                <slot name="sub" />
            </div>
        </div>
        <div :class="note({ size: props.size })">
            <slot name="note" />
        </div>
    </div>
</template>
