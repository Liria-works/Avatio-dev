<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        id: number;
        size?: string;
        note?: string;
    }>(),
    {
        size: "md",
    }
);

const detail = ref<any>({});
const loading = ref(true);

// const formatPrice = (price?: number) => {
//     return price !== undefined ? `¥ ${price.toLocaleString("ja-JP")}` : "";
// };

onMounted(async () => {
    const data: any = await useFetchBooth(props.id);
    detail.value = data;
    loading.value = false;
});

import { tv } from "tailwind-variants";
const texts = tv({
    base: "flex flex-col gap-px overflow-clip max-w-full font-medium",
    variants: {
        size: {
            lg: "gap-4",
            md: "gap-1.5",
            sm: "gap-px",
        },
    },
});
</script>

<template>
    <SetupsItemBase :size="props.size" class="h-32">
        <template #thumbnail>
            <img class="size-full rounded-lg" :src="detail.thumbnail" />
        </template>
        <template #main>
            <div :class="texts({ size: props.size })">
                <NuxtLink
                    :to="detail.link"
                    target="_blank"
                    class="text-black dark:text-white text-md line-clamp-1"
                >
                    {{ detail.item }}
                </NuxtLink>

                <NuxtLink
                    :to="`https://${detail.shop_id}.booth.pm/`"
                    target="_blank"
                    class="flex items-center gap-1.5 w-fit"
                >
                    <img
                        :src="detail.shop_thumbnail"
                        class="size-5 rounded-md"
                    />
                    <span
                        class="text-neutral-700 dark:text-neutral-300 text-sm line-clamp-1"
                    >
                        {{ detail.shop }}
                    </span>
                    <Icon
                        v-if="detail.shop_verified"
                        name="lucide:check"
                        size="16"
                        class="flex-shrink-0 text-neutral-700 dark:text-neutral-300 size-3"
                    />
                </NuxtLink>
            </div>
        </template>
        <template #sub>
            <NuxtLink to="/" target="_blank">
                <button
                    class="flex gap-3 items-center hover:bg-neutral-100 dark:hover:bg-neutral-600 py-2 px-4 rounded-lg"
                >
                    <div
                        class="text-neutral-800 dark:text-neutral-200 text-md whitespace-nowrap"
                    >
                        {{ detail.price }}
                    </div>
                    <Icon
                        name="lucide:external-link"
                        :width="18"
                        :height="18"
                        class="text-neutral-600 dark:text-neutral-300 min-w-max min-h-max"
                    />
                </button>
            </NuxtLink>
        </template>
        <template #note>
            <div
                v-if="props.note"
                class="w-full px-3 py-2 gap-2 flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-600"
            >
                <Icon
                    name="lucide:pen-line"
                    size="14"
                    class="self-start flex-shrink-0 mt-0.5 text-neutral-400 dark:text-neutral-400"
                />
                <span class="text-xs pb-px">{{ props.note }}</span>
            </div>
        </template>
    </SetupsItemBase>
</template>
