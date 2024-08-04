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
        base: "w-full flex items-center overflow-hidden bg-white dark:bg-neutral-700 rounded-xl",
        thumbnail: "flex items-center justify-center",
    },
    variants: {
        size: {
            lg: { base: "h-40", thumbnail: "ml-4 size-32 min-w-32" },
            md: { base: "h-20", thumbnail: "size-20 min-w-20" },
            sm: { base: "h-16", thumbnail: "size-16 min-w-16" },
        },
    },
});

const { base, thumbnail } = variant();
</script>

<template>
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
</template>
