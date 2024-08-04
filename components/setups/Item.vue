<script setup lang="ts">
import { tv } from "tailwind-variants";

const props = withDefaults(
    defineProps<{
        editing?: boolean;
        setup?: boolean;
        size?: any;
        outdated?: boolean;
        primary?: string;
        secondary?: string;
        shop_id?: string;
        price?: number;
        thumbnail?: string;
        link?: string;
        nsfw?: boolean;
        user?: string;
    }>(),
    {
        editing: false,
        setup: false,
        size: "md",
        outdated: false,
        item: "",
        shop: "",
        nsfw: false,
        user: "",
    }
);

const formatPrice = (price?: number) => {
    return price !== undefined ? `¥ ${price.toLocaleString("ja-JP")}` : "";
};

const item = tv({
    slots: {
        base: "w-full items-center flex overflow-hidden",
        frame: "w-full flex flex-row bg-white dark:bg-neutral-700 rounded-xl justify-between items-center pr-4 overflow-hidden",
        image: "size-20",
        text: "w-full flex flex-col items-start overflow-hidden",
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
    <button
        v-if="setup"
        class="w-full flex flex-row rounded-xl justify-between items-center pr-4 overflow-hidden bg-white dark:bg-neutral-700"
    >
        <img class="size-16" :src="props.thumbnail" />
        <div class="w-full flex flex-col items-start truncate px-3">
            <a class="text-black dark:text-white text-md font-medium">
                {{ props.primary }}
            </a>
            <span
                class="text-neutral-700 dark:text-neutral-300 text-sm font-medium"
            >
                {{ props.secondary }}
            </span>
        </div>
        <AUser :user="props.user" size="sm" />
    </button>

    <div v-if="!setup" :class="frame({ size: props.size })">
        <img
            v-show="props.thumbnail"
            :class="image({ size: props.size })"
            :src="props.thumbnail"
        />
        <div v-show="props.thumbnail" :class="text({ size: props.size })">
            <NuxtLink
                :to="props.link"
                target="_blank"
                class="text-black dark:text-white text-md font-medium truncate w-full"
            >
                {{ props.primary }}
            </NuxtLink>

            <NuxtLink
                :to="'https://' + props.shop_id + '.booth.pm'"
                target="_blank"
                class="text-neutral-700 dark:text-neutral-300 text-sm font-medium truncate"
            >
                {{ props.secondary }}
            </NuxtLink>
        </div>

        <div class="flex items-center gap-1 px-2">
            <Tag
                v-if="props.nsfw"
                color="pink"
                icon=""
                text="NSFW"
                class="text-xs"
            />
        </div>
        <div v-if="props.editing" class="flex gap-2 items-center">
            <AButton icon="lucide:pen-line" :iconSize="16" />
            <AButton icon="lucide:trash" :iconSize="16" />
        </div>

        <NuxtLink v-if="!outdated" :to="props.link" target="_blank">
            <button
                v-show="props.thumbnail"
                v-if="!props.editing"
                class="flex gap-3 items-center hover:bg-neutral-100 dark:hover:bg-neutral-600 py-2 px-4 rounded-lg"
            >
                <div
                    class="text-neutral-800 dark:text-neutral-200 text-md whitespace-nowrap"
                >
                    {{ formatPrice(props.price) }}
                </div>
                <Icon
                    name="lucide:external-link"
                    :width="18"
                    :height="18"
                    class="text-neutral-600 dark:text-neutral-300 min-w-max min-h-max"
                />
            </button>
        </NuxtLink>
    </div>
</template>
