<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        id: number;
        size?: string;
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
    const data: any = await $fetch(
        `/api/GetBoothItem?id=${encodeURIComponent(props.id)}`
    );
    if (data.status != 200) {
        return;
    }
    detail.value = data.body;
    loading.value = false;
});
</script>

<template>
    <SetupsItemBase :size="props.size">
        <template #thumbnail>
            <img class="size-full rounded-lg" :src="detail.thumbnail" />
        </template>
        <template #main>
            <div
                class="flex flex-col gap-1 overflow-clip max-w-full font-medium"
            >
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
                        name="lucide:check"
                        size="16"
                        class="text-neutral-700 dark:text-neutral-300 size-3 min-w-max min-h-max"
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
    </SetupsItemBase>
</template>
