<script setup lang="ts">
import { tv } from "tailwind-variants";

const props = withDefaults(
    defineProps<{
        id: number;
        editing?: boolean;
        size: any;
        nsfw?: boolean;
    }>(),
    {
        id: 0,
        editing: false,
        size: "md",
        nsfw: false,
    }
);

const itemData = ref({});

onMounted(async () => {
    if (props.id !== null && props.id !== undefined) {
        try {
            const response = await $fetch(
                `/api/test?id=${encodeURIComponent(props.id)}`
            );
            itemData.value = response.body;
            console.log(itemData.value);
        } catch (error) {
            console.error("Failed to fetch item data:", error);
        }
    } else {
        console.error("Invalid props.id:", props.id);
    }
});

const formatPrice = (price: number | undefined) => {
    if (price === undefined) {
        return "";
    }
    return `¥ ${price.toLocaleString("ja-JP")}`;
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
    <div :class="frame({ size: props.size })">
        <img :class="image({ size: props.size })" :src="itemData.thumbnail" />
        <div :class="text({ size: props.size })">
            <a
                class="text-black dark:text-white text-md font-medium truncate"
                :href="'https://booth.pm/ja/items/' + itemData.id"
                target="_blank"
                rel="noopener noreferrer"
            >
                {{ itemData.item }}
            </a>

            <a
                class="text-neutral-700 dark:text-neutral-300 text-sm font-medium truncate"
                href=""
            >
                {{ itemData.shop }}
            </a>
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
            <AButton
                icon="lucide:pen-line"
                :iconSize="16"
                class="hover:dark:bg-neutral-600"
            />
            <AButton
                icon="lucide:trash"
                :iconSize="16"
                class="hover:dark:bg-neutral-600"
            />
        </div>

        <button
            v-if="!props.editing"
            class="flex gap-3 items-center hover:bg-neutral-100 dark:hover:bg-neutral-600 py-2 px-4 rounded-lg"
        >
            <div
                class="text-neutral-800 dark:text-neutral-200 text-md whitespace-nowrap"
            >
                {{ formatPrice(itemData.price) }}
            </div>
            <Icon
                name="lucide:external-link"
                :width="18"
                :height="18"
                class="text-neutral-600 dark:text-neutral-300 min-w-max min-h-max"
            />
        </button>
    </div>
</template>
