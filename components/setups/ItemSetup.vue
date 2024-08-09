<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();

export interface Props {
    id: number;
    size?: string;
}

const props = withDefaults(defineProps<Props>(), {
    size: "md",
});

const setupData = ref<any>({});
const avatar = ref();
const thumbnail = ref();
const loading = ref(true);

onMounted(async () => {
    const data: any = await $fetch(
        `/api/GetDataSetup?id=${encodeURIComponent(props.id)}`
    );
    if (data.status != 200) {
        return;
    }
    setupData.value = data.body;

    const data_avatar = await useFetchBooth(data.body.avatar.id);
    avatar.value = data_avatar.item;
    thumbnail.value = data_avatar.thumbnail;
    loading.value = false;
});
</script>

<template>
    <SetupsItemBase size="sm" class="hover:bg-neutral-200">
        <template #thumbnail>
            <img class="size-full" :src="thumbnail" />
        </template>
        <template #main>
            <div
                class="flex flex-col gap-px overflow-clip max-w-full font-medium"
            >
                <NuxtLink
                    to="/"
                    target="_blank"
                    class="text-black dark:text-white text-md line-clamp-1"
                >
                    {{ setupData.name }}
                </NuxtLink>

                <NuxtLink
                    to="/"
                    target="_blank"
                    class="text-neutral-700 dark:text-neutral-300 text-sm line-clamp-1"
                >
                    {{ avatar }}
                </NuxtLink>
            </div>
        </template>
        <template #sub>
            <AUser
                v-if="props.size === 'md'"
                :user="setupData.author"
                size="sm"
            />
        </template>
    </SetupsItemBase>
</template>
