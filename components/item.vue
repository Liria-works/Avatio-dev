<script setup lang="ts">
import { tv } from "tailwind-variants";

const props = withDefaults(
    defineProps<{
        editing?: boolean;
        text: string;
        shop: string;
        image: string;
        price: number;
        size: any;
    }>(),
    {
        editing: false,
        size: "md",
    }
);

const formatPrice = (price: number | undefined) => {
    if (price === undefined) {
        return "";
    }
    return `¥ ${price.toLocaleString("ja-JP")}`;
};

const item = tv({
    slots: {
        base: "w-full items-center flex overflow-hidden",
        frame: "w-full flex flex-row bg-white rounded-xl justify-between items-center pr-4 overflow-hidden",
        image: "size-20",
        text: "w-full flex flex-col items-start truncate",
    },
    variants: {
        size: {
            lg: {
                frame: "h-40 py-2 pl-4",
                image: "size-32",
                text: "gap-3 px-6 py-4",
            },
            md: { frame: "h-20", image: "size-20", text: "gap-1 pl-4 pr-4" },
        },
    },
});

const { frame, image, text } = item();
</script>

<template>
    <div :class="frame({ size: props.size })">
        <img :class="image({ size: props.size })" :src="props.image" />
        <div :class="text({ size: props.size })">
            <a class="text-black text-md font-medium" href="">
                {{ props.text }}
            </a>
            <a class="text-neutral-700 text-sm font-medium" href="">
                {{ props.shop }}
            </a>
        </div>

        <div v-if="props.editing" class="flex gap-2 items-center">
            <div class="text-neutral-800 text-md whitespace-nowrap">
                {{ formatPrice(props.price) }}
            </div>
            <UPopover
                :popper="{ placement: 'top' }"
                :ui="{
                    background: 'bg-white dark:bg-white',
                    ring: 'ring-0',
                    rounded: 'rounded-lg',
                }"
            >
                <template #panel>
                    <div class="px-3 py-2 flex flex-col gap-2">
                        <UButton>編集</UButton>
                        <UButton>削除</UButton>
                    </div>
                </template>
                <button
                    class="flex items-center justify-center size-10 rounded-lg hover:bg-neutral-100"
                >
                    <Icon
                        name="lucide:ellipsis-vertical"
                        :width="18"
                        :height="18"
                        class="text-neutral-600 min-w-max min-h-max"
                    />
                </button>
            </UPopover>
        </div>

        <button
            v-if="!props.editing"
            class="flex gap-3 items-center hover:bg-neutral-100 py-2 px-4 rounded-lg"
        >
            <div class="text-neutral-800 text-md whitespace-nowrap">
                {{ formatPrice(props.price) }}
            </div>
            <Icon
                name="lucide:external-link"
                :width="18"
                :height="18"
                class="text-neutral-600 min-w-max min-h-max"
            />
        </button>
    </div>
</template>
