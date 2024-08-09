<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        id: number;
        size?: string;
        avatar?: boolean;
    }>(),
    {
        size: "md",
        avatar: false,
    }
);

const detail = ref<any>({});
const loading = ref(true);

const unsupported = ref(false);

onMounted(async () => {
    const data: any = await useFetchBooth(props.id);
    detail.value = data;
    loading.value = false;
});
</script>

<template>
    <SetupsItemBase :size="props.size">
        <template #thumbnail>
            <img class="size-full" :src="detail.thumbnail" />
        </template>
        <template #main>
            <div
                class="flex flex-col gap-px overflow-clip max-w-full font-medium"
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
                    class="text-neutral-700 dark:text-neutral-300 text-sm line-clamp-1"
                >
                    {{ detail.shop }}
                </NuxtLink>
            </div>
        </template>
        <template #sub>
            <div class="flex gap-2 items-center">
                <UCheckbox
                    v-if="!props.avatar"
                    v-model="unsupported"
                    label="アバター非対応"
                    :ui="{
                        label: 'text-nowrap font-normal text-sm select-none',
                    }"
                    class="mr-4"
                />
                <AButton
                    icon="lucide:pen"
                    :iconSize="16"
                    tooltip="ノートを追加"
                />
                <AButton
                    @click="$emit('remove')"
                    icon="lucide:trash"
                    :iconSize="16"
                    tooltip="アイテム削除"
                />
            </div>
        </template>
    </SetupsItemBase>
</template>
